import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

const OtherUsers = () => {
    useGetOtherUsers()
    const {listedUsers} = useSelector(store => store.listedUsers)
                //   console.log(listedUsers);
                  
        if(!listedUsers) return;   // early return in react 
  return (
    <>
          <div className='overflow-auto px-2 flex-1'>
          {
            listedUsers.map((user, index) => (
              <OtherUser key={user._id} user={user} />
            ))
          }
            
          </div>
    </>
  )
}

export default OtherUsers