import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
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

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} style={{ margin: '5px 0' }}>
        {line.split('**').map((segment, i) =>
          i % 2 === 1 ? <strong key={i}>{segment}</strong> : segment
        )}
      </p>
    ));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">ReDish</h1>
      <p className="mb-6">Enter leftover food items, add them to the list, and submit to get suggestions for Indian dishes you can make at home!</p>
  
      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a leftover food item"
          className="p-2 w-72 mr-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={addFoodItem}
          className="p-2 px-5 bg-blue-500 text-white border-none rounded-md cursor-pointer"
        >
          Add
        </button>
      </div>
  
      <div>
        <h3 className="text-xl font-semibold mb-2">Food List:</h3>
        {foodList.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <ul>
            {foodList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
  
      <button
        onClick={generateAnswer}
        className="mt-5 p-2 px-5 bg-green-500 text-white border-none rounded-md cursor-pointer"
      >
        Submit
      </button>
  
      <div className="mt-5 p-4 border border-gray-300 rounded-lg bg-gray-100 max-h-96 overflow-y-auto">
        {chat.map((message, index) => (
          <div
            key={index}
            className={`mb-2 text-${message.sender === 'user' ? 'right' : 'left'}`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              {message.sender === 'bot' ? renderFormattedText(message.text) : message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left text-gray-600">Typing...</div>
        )}
      </div>
    </div>
  );
}  

export default App;
