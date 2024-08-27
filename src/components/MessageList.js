import React from "react";

const MessageList = ({ role, content }) => {
  return (
    <div
      className={`mb-2 p-3 rounded-lg max-w-xs ${
        role === "user"
          ? "bg-[#DCF8C6] self-end text-right"
          : "bg-white self-start text-left border border-gray-300"
      }`}
    >
      {content}
    </div>
  );
};

export default MessageList;
