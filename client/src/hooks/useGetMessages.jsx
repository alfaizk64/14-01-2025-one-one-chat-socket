import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../Store/Slice/messageSlice'

const useGetMessages = () => {
    const dispatch =   useDispatch()
    const {selectedUser} = useSelector(state => state.selectedUser)
    
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials=true
                 const response = await axios.get(`http://localhost:5050/api/v1/message/${selectedUser?._id}`)
                //  console.log(response);
                 
                    dispatch(setMessages(response?.data?.message))
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchMessages()
    },[selectedUser?._id])
}

export default useGetMessages
