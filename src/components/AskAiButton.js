import React, { useState } from "react";
import axios from "axios";

const AskAiButton = () => {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const handleAskAi = async () => {
    if (!userInput.trim()) {
      setError("Please enter a valid request.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: userInput,
            },
          ],
          model: "llama3-8b-8192",
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      const suggestionsList = aiResponse.split("\n").map((suggestion) => ({
        text: suggestion,
        completed: false,
      }));

      setSuggestions(suggestionsList);
      setError("");
    } catch (error) {
      setError("Error fetching AI suggestions. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Ask AI for Suggestions
      </h2>
      <input
        className="w-full p-3 h-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        rows="4"
        placeholder="Enter your request..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      {error && <p className="text-red-500 mt-3">{error}</p>}
      <ul className="mt-6 space-y-2 w-full">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="p-3 bg-gray-500 rounded-md border border-gray-300 shadow-sm"
          >
            {suggestion.text}
          </li>
        ))}
      </ul>
      <button
        onClick={handleAskAi}
        className="mt-4 w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
      >
        Get Suggestions
      </button>
    </div>
  );
};

export default AskAiButton;
