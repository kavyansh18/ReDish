import { useState } from 'react';
import './index.css'; 

// Function to fetch the API key from Chrome storage
const getApiKeyFromStorage = async (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(['geminiApiKey'], (result: { geminiApiKey: string }) => {
      resolve(result.geminiApiKey || '');  // Access 'geminiApiKey' from result
    });
  });
};

const App = () => {
  const [apiKey, setApiKey] = useState<string>('');  // State to store the API key
  const [leftovers, setLeftovers] = useState<string>('');  // State for leftovers input
  const [recipe, setRecipe] = useState<string>('');  // State to store recipe response
  const [loading, setLoading] = useState<boolean>(false);  // State for loading status
  const [showChat, setShowChat] = useState<boolean>(false);  // State to manage chat display

  // Function to handle API key submission
  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowChat(true);  // Show chat interface once the API key is provided
    }
  };

  // Function to fetch recipe from the Google Generative AI (Gemini)
  const fetchRecipe = async () => {
    if (!leftovers.trim()) return;  // Return early if there are no leftovers entered
    setLoading(true);

    try {
      const apiKey = await getApiKeyFromStorage();  // Get API key from Chrome storage

      // Use Google Generative AI (Gemini)
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey); // Initialize with the API key
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use the Gemini model

      const prompt = `Based on these leftover ingredients: ${leftovers}, suggest a recipe.`;
      const result = await model.generateContent(prompt); // Generate content using the prompt
      const generatedRecipe = result.response.text(); // Get the text response

      setRecipe(generatedRecipe);  // Set the recipe response
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setRecipe('Failed to fetch recipe. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded-lg w-80">
        {!showChat ? (
          <div>
            <h1 className="text-xl font-bold text-center text-gray-700">Enter API Key</h1>
            <input
              type="text"
              className="w-full p-2 mt-2 border rounded-md"
              placeholder="Enter Gemini API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button
              className="w-full mt-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleApiKeySubmit}
              disabled={!apiKey.trim()}
            >
              Submit API Key
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold text-center text-gray-700">LeftoverChef</h1>
            <textarea
              className="w-full p-2 mt-2 border rounded-md"
              rows={4}
              placeholder="Enter leftover ingredients..."
              value={leftovers}
              onChange={(e) => setLeftovers(e.target.value)}
            />
            <button
              className="w-full mt-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={fetchRecipe}
              disabled={loading}
            >
              {loading ? 'Finding Recipe...' : 'Find Recipe'}
            </button>
            {recipe && (
              <div className="mt-3 p-2 border-t border-gray-300">
                <h2 className="text-lg font-semibold text-gray-800">Suggested Recipe:</h2>
                <p className="mt-1 text-gray-700">{recipe}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
