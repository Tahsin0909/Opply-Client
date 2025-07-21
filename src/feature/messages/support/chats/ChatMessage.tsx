
import { TMessage } from "@/interfaces/message";
import formatDate from "@/lib/getFromateDays";
import getTimeDifference from "@/lib/getTimeDifference";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { FaCheckDouble } from "react-icons/fa";




const ChatMessage = ({ messages }: { messages: TMessage[]}) => {

 const searchParams = useSearchParams();
  const receiverId = searchParams.get("user") || ""
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
  console.log(messages, "m");

  const groupedMessages = messages.reduce((acc: Record<string, TMessage[]>, msg) => {
    const dateKey = new Date(msg.createdAt).toDateString(); // "Mon Jun 29 2025"
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(msg);
    return acc;
  }, {});


  return (
    <div
      ref={containerRef}
      className="size-full bg-gray-100 p-4 overflow-y-auto min-h-[70vh]"
    >
      {Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
        <div key={dateKey} className="mb-4 ">
          {/* Date Divider - Show once per day */}
          <div className="flex justify-center mb-2 ">
            <span className="bg-gray-200 text-gray-600 px-3 py-1 text-xs rounded-full">
              {formatDate(dayMessages[0].createdAt)}
            </span>
          </div>

          {/* Messages for this day */}
          {dayMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-2 ${msg.senderId === receiverId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative  px-4 py-2 flex flex-col gap-5 rounded-lg max-w-[70%] ${msg.senderId === receiverId
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-white text-black rounded-bl-none"
                  }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <div className="text-[10px] text-gray-300 absolute bottom-[-18px] right-2 flex items-center gap-1">
                  {getTimeDifference(msg.createdAt)}
                  {msg.senderId === receiverId && msg.isRead && (
                    <FaCheckDouble className="text-blue-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
