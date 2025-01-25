import axios from "axios";
import React, {  useState } from "react";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Store/Slice/messageSlice";


function SendInput() {
  const [message, setMessage] = useState("");
      const dispatch =useDispatch()
      const {selectedUser} = useSelector(state => state.selectedUser)
        const { messages } = useSelector((state) => state.message);
             
  const changeHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = async(e) => {
    e.preventDefault();
          try {
            axios.defaults.withCredentials= true
             const res = await axios.post(`http://localhost:5050/api/v1/message/send/${selectedUser?._id}`,{message},{
                headers: {
                    "Content-Type": "application/json",
             },
               withCredentials: true }) 
                               setMessage("")
                dispatch(setMessages([...messages,res?.data?.newMessage])) 
          } catch (error) {
            // toast.error(`${error.message}`)
            console.log( "error sending message ",error);

          }
  };
  return (
    <>
      <div>
        <form className="px-2 my-3 " onSubmit={submitHandler}>
          <div className="w-full relative ">
            <input
              onChange={changeHandler}
              className="border text-sm rounded-lg block w-full bg-green-600 bg-opacity-55 outline-none text-white p-3 border-none placeholder:text-white placeholder:text-lg"
              type="text"
              placeholder="Type a message..."
              name="message"
              value={message}
            />
            <button
              type="submit"
              className="absolute flex  inset-y-0 end-2  items-center "
            >
             {
                message && <IoMdSend fontSize={22} color="white" />
             }
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default SendInput;
