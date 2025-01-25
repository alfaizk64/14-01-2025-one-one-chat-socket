import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setListedUsers } from '../Store/Slice/listedUserSlice'
import toast from 'react-hot-toast'

const useGetOtherUsers = () => {
   const dispatch = useDispatch()
 useEffect(() => {
    const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials=true;
                const response = await axios.get('http://localhost:5050/api/v1/user/')
                dispatch(setListedUsers(response.data.getOtheruser))
            } catch (error) {
                toast.error(`${error?.response?.data?.message}`)
                console.error('Error fetching other users:', error)
            }
       }
        fetchOtherUsers()
 },[])
}

export default useGetOtherUsers
