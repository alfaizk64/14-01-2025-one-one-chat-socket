import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../Store/Slice/messageSlice";


const useGetRealTimeMessage = () => {
    const {socket}  = useSelector(state => state?.socket)
      const { messages } = useSelector((state) => state?.message);
             
   const dispatch = useDispatch()

   useEffect(() => {
          socket?.on('newMessage', (msg) => {
             dispatch(setMessages([...messages, msg]))
          })
   },[socket,dispatch,setMessages])
}

export default useGetRealTimeMessage
