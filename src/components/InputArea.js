import React from "react";

const InputArea = ({
  userInput,
  setUserInput,
  handleAskAi,
  handleNewChat,
  error,
}) => {
  return (
    <>
      <textarea
        className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out mt-4"
        rows="4"
        placeholder="Type a message..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      {error && <p className="text-red-500 mt-3">{error}</p>}
      <div className="flex flex-col mt-4">
        <button
          onClick={handleAskAi}
          className="py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Send
        </button>
        <button
          onClick={handleNewChat}
          className="mt-2 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
        >
          Start New Chat
        </button>
      </div>
    </>
  );
};

export default InputArea;
