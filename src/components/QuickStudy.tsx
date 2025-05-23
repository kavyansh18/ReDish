import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import send from '../assets/send.png';
import userIcon from '../assets/user.png';
import botIcon from '../assets/book.png';

const QuickStudy = () => {
  const [input, setInput] = useState('');
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<{ sender: string; text: string | JSX.Element[] }[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const generateAnswer = async () => {
    setCounter(1);
    if (input.length === 0 && !input.trim()) {
      alert('Please provide a topic or keywords.');
      return;
    }

    const userText = input.trim();
    let prompt = '';

    if (counter === 0) {
      prompt = `You are QuickStudy, a tool that helps students create concise, bullet-point study notes. Generate clear and simple study notes for the topic or keywords: ${input}. Format the response as a list of 3-5 bullet points, each with a brief explanation. If the user provides non-academic or unclear input, warn them to enter a specific academic topic or keywords, e.g., 'photosynthesis, biology' or 'French Revolution, history'.`;
      setChat((prevChat) => [...prevChat, { sender: 'user', text: `Topic: ${input}` }]);
    } else {
      prompt = `${userText}`;
      setChat((prevChat) => [...prevChat, { sender: 'user', text: userText }]);
    }

    setInput('');
    setIsLoading(true);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        method: 'POST',
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });

      const botResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

      const formattedResponse = botResponse.split('\n').map((line: string, index: number) => {
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        return <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      });

      setChat((prevChat) => [...prevChat, { sender: 'bot', text: formattedResponse }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setChat((prevChat) => [
        ...prevChat,
        { sender: 'bot', text: 'An error occurred while generating the response. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="p-4 bg-quickstudy-bg min-h-screen">
      <h1 className="lg:text-7xl text-5xl pt-5 font-bold text-quickstudy-accent unlock-regular flex justify-center items-center mb-1">QuickStudy</h1>
      <p className="mb-3 text-quickstudy-text lg:text-2xl text-sm flex justify-center items-center">Get concise study notes for any topic!</p>
      <div className="shadow-2xl h-[42rem] lg:w-[90%] w-[100%] mx-auto bg-quickstudy-card rounded-[36px] lg:scale-100 scale-[.9]">
        <button 
          className="smky-btn3 relative hover:text-quickstudy-text py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-quickstudy-accent after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-gray-600 font-semibold cursor-pointer"
          onClick={() => {
            setCounter(0);
            setChat([]);
          }}
        >
          Start new chat
        </button>

        <div className="h-[35.6rem] overflow-y-auto p-4" ref={chatContainerRef}>
          {chat.length === 0 && (
            <h1 className="fixed lg:text-[40px] text-2xl font-semibold text-quickstudy-text left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Hi! Your study assistant is ready
            </h1>
          )}

          {chat.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <img
                  src={botIcon}
                  alt="Bot Icon"
                  className="w-8 h-8 rounded-full mr-3"
                />
              )}
              <div
                className={`max-w-[70%] px-5 py-3 rounded-[36px] ${message.sender === 'user'
                    ? 'bg-quickstudy-accent text-white self-end'
                    : 'bg-quickstudy-secondary text-gray-900'
                  }`}
              >
                {typeof message.text === 'string' ? message.text : message.text}
              </div>
              {message.sender === 'user' && (
                <img
                  src={userIcon}
                  alt="User Icon"
                  className="w-8 h-8 rounded-full ml-3"
                />
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center justify-start mb-4">
              <img
                src={botIcon}
                alt="Bot Icon"
                className="w-8 h-8 rounded-full mr-3"
              />
              <div className="max-w-[70%] px-4 py-2 rounded-lg bg-gray-200 text-gray-900">
                Generating response...
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end items-center mr-5">
          <input
            className="input h-[46px] mt-2 text-[14px] text-white/60 w-[450px] bg-quickstudy-bg text-quickstudy-text px-3 py-1 rounded-[36px] border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-quickstudy-accent transition-all duration-150 ease-in-out ml-4"
            name="text"
            type="text"
            placeholder={chat.length === 0 ? "Enter topic or keywords" : "Ask QuickStudy..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateAnswer()}
          />
          <span>
            <img
              className="lg:w-12 w-[70px] mt-2 cursor-pointer hover:bg-quickstudy-bg rounded-[36px] ml-1 p-1"
              src={send}
              alt="Send"
              onClick={generateAnswer}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickStudy;