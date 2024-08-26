import React, { useState } from "react";

const TodoInput = ({ onSubmit }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onSubmit(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task or goal..."
      />
      <button type="submit">Get AI Suggestions</button>
    </form>
  );
};

export default TodoInput;
