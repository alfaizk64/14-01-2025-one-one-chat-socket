import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({message}) => {
    const scroll = useRef()
             const authuser = useSelector(state => state.user)
                //  console.log(authuser?.authUser?.id);
                   const {selectedUser} = useSelector(state=> state.selectedUser)        
      useEffect(() => {
    scroll.current?.scrollIntoView({behavior:"smooth"})
  }, [message]);
  return (
    <>
     <div ref={scroll} className={`chat ${authuser?.authUser?.id === message?.senderId ? ' chat-end' : 'chat-start'}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt=""
                src={` ${authuser?.authUser?.id === message?.senderId ?  authuser?.authUser?.profilePhoto : selectedUser?.profilePhoto}`}
              />
            </div>
          </div>
          <div className="chat-header">
          
            <time className="text-xs text-white">12:45</time>
          </div>
          <div className={`chat-bubble ${authuser?.authUser?.id !== message?.senderId ? 'bg-gray-200 text-black' : ''}`}>{message?.message}</div>
        </div>
    </>
  );
};

export default Message;
                                                        