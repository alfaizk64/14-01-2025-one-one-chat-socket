import React, { useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

const Messages = () => {
     
  useGetMessages();
 useGetRealTimeMessage()
  const { messages } = useSelector((state) => state.message);
  if (!messages) return;

  return (
    <>
      <div  className="px-4 flex-1  overflow-auto ">
        {messages && messages?.map((msg) => {
          return <Message key={msg._id} message={msg} />;
        })}
      </div>
    </>
  );
};

export default Messages;
                                               