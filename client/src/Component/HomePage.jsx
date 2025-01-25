import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'


const HomePage = () => {
  return (
    <>
       <div className='sm:h-[450px] md:h-[550px] w-full bg-opacity-55 flex rounded-lg text-black overflow-hidden bg-gray-500 backdrop-filter bg-clip-padding backdrop-blur-md'>
              <Sidebar/>
              <MessageContainer/>
       </div>
    </>
  )
}

export default HomePage
