import { useState } from "react";
// import TodoForm from "../components/TodoForm";
// import TodoList from "../components/TodoList";
// import ChatButton from "../components/ChatButton";
import AskAiButton from "../components/AskAiButton";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <div>
      <AskAiButton onChangeTodos={setTodos} />
    </div>
  );
}
