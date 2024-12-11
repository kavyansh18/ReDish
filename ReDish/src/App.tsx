import { useState } from 'react';
import './index.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Fetch API key from the environment variable
const getApiKeyFromEnv = (): string => {
  return process.env.REACT_APP_GEMINI_API_KEY || ''; // Get the API key or return an empty string
};

const App = () => {
  const [leftover, setLeftover] = useState<string>(''); // State for single leftover input
  const [leftoversList, setLeftoversList] = useState<string[]>([]); // State for leftovers list
  const [recipe, setRecipe] = useState<string>(''); // State to store recipe response
  const [loading, setLoading] = useState<boolean>(false); // State for loading status

  // Function to add leftover to the list
  const addLeftover = () => {
    if (leftover.trim()) {
      setLeftoversList([...leftoversList, leftover.trim()]); // Add to list
      setLeftover(''); // Clear the input
    }
  };

  // Function to fetch recipe from the Google Generative AI (Gemini)
  const fetchRecipe = async () => {
    if (!leftoversList.length) return; // Return early if there are no leftovers
    setLoading(true);

    try {
      const apiKey = getApiKeyFromEnv(); // Get API key from the environment variable

      // Initialize Google Generative AI with the API key
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use the Gemini model

      const prompt = `Based on these leftover ingredients: ${leftoversList.join(
        ', '
      )}, suggest a recipe.`;
      const result = await model.generateContent(prompt); // Generate content using the prompt
      const generatedRecipe = result.response.text(); // Get the text response

      setRecipe(generatedRecipe); // Set the recipe response
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setRecipe('Failed to fetch recipe. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded-lg w-80">
        <h1 className="text-xl font-bold text-center text-gray-700">LeftoverChef</h1>
        
        {/* Add Leftover Input */}
        <div className="mt-3">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter leftover ingredient..."
            value={leftover}
            onChange={(e) => setLeftover(e.target.value)}
          />
          <button
            className="w-full mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={addLeftover}
            disabled={!leftover.trim()}
          >
            Add to List
          </button>
        </div>

        {/* Display Leftovers List */}
        {leftoversList.length > 0 && (
          <div className="mt-3">
            <h2 className="text-lg font-semibold text-gray-800">Ingredients:</h2>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              {leftoversList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Generate Recipe Button */}
        <button
          className="w-full mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={fetchRecipe}
          disabled={loading || leftoversList.length === 0}
        >
          {loading ? 'Finding Recipe...' : 'Generate Recipe'}
        </button>

        {/* Display Recipe */}
        {recipe && (
          <div className="mt-3 p-2 border-t border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">Suggested Recipe:</h2>
            <p className="mt-1 text-gray-700">{recipe}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
