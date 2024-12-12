import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [response, setResponse] = useState('');
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

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        method: 'POST',
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });
      setResponse(response['data']['candidates'][0]['content']['parts'][0]['text']);
    } catch (error) {
      console.error('Error generating answer:', error);
      setResponse('An error occurred while generating the response. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ReDish</h1>
      <p>
        Enter leftover food items, add them to the list, and submit to get suggestions for Indian dishes you can make at home!
      </p>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a leftover food item"
          style={{
            padding: '10px',
            width: '300px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={addFoodItem}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </div>
      <div>
        <h3>Food List:</h3>
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
        style={{
          padding: '10px 20px',
          backgroundColor: '#28A745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Submit
      </button>
      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>Suggested Dishes:</h3>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{response}</div>
        </div>
      )}
    </div>
  );
};

export default App;
