import React from "react";
import { Circle } from "lucide-react";

function Comment({ author, time, content }) {
  return (
    <div className="flex items-start mb-4">
      <div className="p-3 flex-1">
        <div className="flex mb-1">
            <div className="flex items-center mr-3">
                <Circle className="w-5 h-5 mr-2 rounded-full" />
                <div>
                    <h3 className="text-sm font-semibold">{author}</h3>
                    <p className="text-xs text-gray-300">{time}</p>
                </div>
            </div>
            <p className="text-sm">{content}</p>
        </div>

      </div>
    </div>
  );
}

export default Comment;
