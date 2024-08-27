import React from "react";

const ChatContainer = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-[#E5DDD5]">
      {/* Header */}
      <div className="bg-[#25D366] text-white p-4 flex items-center justify-between shadow-md"></div>

      {/* Chat Area */}
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default ChatContainer;
