import { useState } from 'react';
import axios from 'axios';
import './font.css';
import './index.css';
import send from './assets/send.png';
import userIcon from './assets/user.png';
import botIcon from './assets/chef.png';

const App = () => {
  const [input, setInput] = useState('');
  const [counter, setCounter] = useState(0);
  const [foodList, setFoodList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  const addFoodItem = () => {
    if (input.trim() !== '') {
      setFoodList((prevList) => [...prevList, input.trim()]);
      setInput('');
    }
  };

  const generateAnswer = async () => {
    if (foodList.length === 0) {
      alert('Please add at least one food item to the list.');
      return;
    }

    const prompt = `You are ReDish, a Chrome extension that helps users make dishes from leftover food items. You specialize in Indian cuisine. Suggest short and beautifully formatted dishes that can be easily made at home using these leftover items: ${foodList.join(', ')}.`;

    setIsLoading(true);
    setChat((prevChat) => [...prevChat, { sender: 'user', text: `Food items: ${foodList.join(', ')}` }]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        method: 'POST',
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });
      const botResponse = response['data']['candidates'][0]['content']['parts'][0]['text'];
      setChat((prevChat) => [...prevChat, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error generating answer:', error);
      setChat((prevChat) => [
        ...prevChat,
        { sender: 'bot', text: 'An error occurred while generating the response. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setChat((prevChat) => [...prevChat, { sender: 'user', text: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const response: string = await generateResponse(input); // Replace with actual API call
      setChat((prevChat) => [...prevChat, { sender: 'bot', text: response }]);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = async (text: string): Promise<string> => {
    // Mock API call
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve(`Response to: ${text}`), 1000);
    });
  };

  return (
    <div className="p-4 bg-[#1E201E] min-h-screen">
      <h1 className="text-7xl pt-5 font-bold text-[#697565] unlock-regular flex justify-center items-center">ReDish</h1>
      <p className="mb-3 text-[#ECDFCC] text-2xl flex justify-center items-center">Discover Indian recipes with your leftover ingredients!</p>
      <div className='shadow-2xl h-[45rem] w-[80%] mx-auto bg-[#262926] rounded-[36px]'>
        <button
          className="smky-btn3 relative hover:text-[#778464] ml-1 py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#abd373] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-gray-600 font-semibold"
          onClick={() => { 
            setCounter(0); 
            setChat([]); 
        }}
        >
          Start new chat
        </button>

        <div className=' h-[38rem] overflow-y-auto p-4'>
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
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-[#758570] text-white self-end'
                    : 'bg-[#e3d7c7] text-gray-900'
                }`}
              >
                {message.text}
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
            <div className='flex items-center justify-start mb-4'>
              <img
                src={botIcon}
                alt="Bot Icon"
                className="w-8 h-8 rounded-full mr-3"
              />
              <div className='max-w-[70%] px-4 py-2 rounded-lg bg-gray-200 text-gray-900'>
                Generating response...
              </div>
            </div>
          )}
        </div>

        <div className='flex justify-end items-center mr-5'>
          <input
            className="input h-[44px] mt-2 text-[14px] text-white/60 w-[450px] bg-[#1E201E] text-[#f4f4f5] px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out"
            name="text"
            type="text"
            placeholder={counter === 0 ? "Enter the leftover items" : "Ask ReDish..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <span>
            <img
              className='w-11 mt-2 cursor-pointer hover:bg-slate-900 rounded-[6px] ml-1 p-1'
              src={send}
              alt="Send"
              onClick={handleSend}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
