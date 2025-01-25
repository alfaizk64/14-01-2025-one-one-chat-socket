import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListedUsers } from "../Store/Slice/listedUserSlice";
import { setAuthUser } from "../Store/Slice/userSlice";
const Sidebar = () => {
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {listedUsers} = useSelector(store => store.listedUsers)
    const logOuthandler = async () => {
       try {
            const response = await axios.get('http://localhost:5050/api/v1/user/logout')
            toast.success(( `${response.data.message}`),
            {duration: 3000, position: "top-right",icon: "❌"}   
         );
          dispatch(setAuthUser(null))
         navigate('/')
       } catch (error) {
         toast.error(( `${error.response.data.message}`),
            {duration: 3000, position: "top-right",icon: "��"}   
         );
       }
    }
    // const submitHandler = async (e) => {
    //     e.preventDefault()
             
    //           const searchUser = listedUsers?.find((user)=> user.fullName.toLowerCase().includes(searchValue.toLowerCase()))
    //           if(searchUser){
    //             dispatch(setListedUsers([searchUser]))
    //           }else{
    //             toast.error(( "User not found"),
    //             {duration: 3000, position: "top-right",icon: "��"}   
    //             );
    //           }
    // }
    
  return (
    <>
      <div className="sidebar border-r w-1/3 border-gray-400 p-4 flex flex-col ">
        <form className="flex mb-2" >
          <div className="relative w-full">
            <button
              type="submit"
              className="absolute top-4 left-2 "
            >
              <IoIosSearch size={18} className="" />
            </button>
            <input
              type="text"
              placeholder="Search....."
              className="input w-full bg-white input-bordered rounded-md pl-10"
            //   value={searchValue}
            //   onChange={(e) => setSearchValue(e.target.value)}
              name="searchValue"
            />
          </div>
        </form>
        <div className="divider my-0 py-0 h-[1px] bg-gray-400"></div>
        <OtherUsers/>
        <div className="mt-3">
            <button onClick={logOuthandler} className="btn btn-sm text-lg  ">
                Logout
            </button>
        </div>
      </div>
    </> 
  );
};

export default Sidebar;
