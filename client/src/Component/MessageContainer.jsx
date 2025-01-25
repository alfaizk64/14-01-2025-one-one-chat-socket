import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../Store/Slice/selectedUser'



const MessageContainer = () => {
  const dispatch =useDispatch()
    const {selectedUser} = useSelector(store => store?.selectedUser)
   const onlineUser =  useSelector(state => state.onlineUsers)
    //    console.log(onlineUser?.onlineUsers);
                        //   console.log(selectedUser?._id);
                          const isOnline = onlineUser?.onlineUsers?.includes(selectedUser?._id)
                        //   console.log(isOnline);
                          
    // useEffect(() => {
    //   return ()=>{
    //    dispatch(setSelectedUser(null))
    //   }
    // }, [])
    
    
    if(!selectedUser) return
  return (
    <>
    {
        selectedUser !== null ? (
            <div className=' md:w-4/6 w-full flex flex-col px-2'>
            <div className='flex items-center gap-2  bg-green-600 bg-opacity-55 rounded-md p-2 cursor-pointer mb-2 '>
                <div className={`avatar ${isOnline ? 'online' : ''} `}>
                    <div className=' rounded-full w-12'>
                        <img src={selectedUser?.profilePhoto}  alt='' />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex flex-col   '>
                        <h3>{selectedUser?.fullName}</h3>
                       {
                        isOnline  ? (<span className='text-white'>online</span>) : (<span className='text-white'>ofline</span>)
                       }
                    </div>
                </div>
            </div>
            <Messages/>
              <SendInput/>
         </div> 
        ) : (<div className=' md:w-4/6 flex flex-col px-2 bg-green-600'> 
            <h1 className='text-black'>Let's Start the Conversation</h1>
        </div>)
    }
         
    </>
  )
}

export default MessageContainer
