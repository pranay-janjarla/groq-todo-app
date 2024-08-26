import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  useEffect(() => {
    // Load todos from local storage
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = { text: newTodo, completed: false };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      localStorage.setItem("todos", JSON.stringify([...todos, newTodoItem]));
    }
  };

  const handleAskAi = async () => {
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: "Suggest some todo items",
            },
          ],
          model: "llama3-8b-8192",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      const suggestions = aiResponse.split("\n").map((suggestion) => ({
        text: suggestion,
        completed: false,
      }));
      setAiSuggestions(suggestions);
      setShowAiSuggestions(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAiSuggestion = (suggestion) => {
    setTodos([...todos, suggestion]);
    localStorage.setItem("todos", JSON.stringify([...todos, suggestion]));
    setShowAiSuggestions(false);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo item"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleAskAi}>Ask AI for Suggestions</button>

      {showAiSuggestions && (
        <div>
          <h2>AI Suggestions</h2>
          <ul>
            {aiSuggestions.map((suggestion, index) => (
              <li key={index}>
                <span>{suggestion.text}</span>
                <button onClick={() => handleAddAiSuggestion(suggestion)}>
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2>Todos</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => setTodos(todos.filter((t) => t !== todo))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
