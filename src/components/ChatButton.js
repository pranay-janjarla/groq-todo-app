import { useState } from "react";
import axios from "axios";

export default function ChatButton({ onAddTodo }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const userInput = prompt("What do you need to do?");

    if (userInput) {
      try {
        const response = await axios.post("/api/chat", { userInput });
        const suggestions = response.data.suggestions; // Assuming response contains suggestions

        if (suggestions && suggestions.length > 0) {
          suggestions.forEach((suggestion) => {
            onAddTodo(suggestion);
          });
        } else {
          alert("No suggestions received.");
        }
      } catch (error) {
        console.error("Error fetching AI suggestions:", error);
        alert("Failed to get suggestions.");
      }
    }

    setLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Loading..." : "Get AI Suggestions"}
    </button>
  );
}
