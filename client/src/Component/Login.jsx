import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../Store/Slice/userSlice";


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
      const [showPassword, setShowPassword] = useState(false);
  const [loginData, setloginData] = useState({
    username: "",
    password: "",
  });

  const changeHandler =(e)=>{
    const {name,value} =e.target
    setloginData((prevData)=>{
      
      return{...prevData, [name]:value}
    })
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://one4-01-2025-one-one-chat-socket.onrender.com/api/v1/user/login",loginData,{
        headers: {
            "Content-type": "application/json",
        },
        withCredentials:true
      })
      dispatch(setAuthUser(res?.data))
  
      
      toast.success(`${res.data.message}`, {duration: 2000, position: "top-right", });   
      setloginData({
        username: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/home");
    }, 1000);
} catch (error) {
     toast.error(`Error: ${error.response.data.message}`,
      {duration: 3000, position: "top-right",icon: "❌"});      
}
  };
  return (
    <>
      <div className="max-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-green-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  border border-green-100">
          <h1 className="text-3xl font-bold text-center text-black">Login</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                htmlFor="UserName"
                className="p-2 text-lg  label-text text-black"
              >
                UserName :
              </label>
              <input
                id="UserName"
                type="text"
                className="border outline-none bg-white input-bordered h-10 w-full p-2 rounded-lg border-green-100"
                placeholder="Enter Your UserName"
                name="username"
                value={loginData.username}
                onChange={changeHandler}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="Password"
                className="p-2 text-lg  label-text text-black"
              >
                Password :
              </label>
              <div className="relative">
                <input
                  id="Password"
                  type={showPassword ? "text" : "password"}
                  className="border outline-none bg-white input-bordered h-10 w-full p-2 rounded-lg border-green-100"
                  placeholder="Enter Your Password"
                  name="password"
                  value={loginData.password}
                  onChange={changeHandler}
                />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 cursor-pointer text-gray-600">
                        {showPassword ? <FaRegEye/> : <FaEyeSlash/>}
                    </span>
              </div>
            </div>

            <div>
              <button className="btn text-lg font-normal hover:text-white hover:bg-green-300 text-black btn-block btn-sm mt-4 border border-green-700 bg-white">
                Log in
              </button>
            </div>
            <p className=" text-lg text-center w-full block text-black mt-2">
              Don't have an account ?
              <Link to="/register" className=" ml-2">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
