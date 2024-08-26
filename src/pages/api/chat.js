import React, { useState } from "react";
import AskAiButton from "../../components/AskAiButton"; // Update the import path as needed

const ChatPage = () => {
  const [aiSuggestions, setAiSuggestions] = useState([]);

  // Function to update the AI suggestions
  const handleAiSuggestions = (suggestions) => {
    setAiSuggestions(suggestions);
  };

  return (
    <div>
      <h1>Chat Page</h1>

      {/* Pass the handler to AskAiButton */}
      <AskAiButton onReceiveSuggestions={handleAiSuggestions} />

      <h2>AI Suggestions:</h2>
      {aiSuggestions.length > 0 ? (
        <ul>
          {aiSuggestions.map((suggestion, index) => (
            <li key={index}>{suggestion.text}</li>
          ))}
        </ul>
      ) : (
        <p>No suggestions yet.</p>
      )}
    </div>
  );
};

export default ChatPage;
