import React from "react";

export default function TypingAnimation() {
  return (
   <div className="flex items-center">
  <div className="p-3 bg-white border rounded-2xl shadow-sm flex gap-2 items-center">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
  </div>
</div>

  );
}
