import { React, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  
    const navigate= useNavigate()
    const [showPassword, setShowPassword] = useState(false);

  const [userData, setuserData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setuserData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
          const res = await axios.post("https://one4-01-2025-one-one-chat-socket.onrender.com/api/v1/user/registerUser",userData,{
            headers: {
                "Content-type": "application/json",
            },
            withCredentials:true
          })
          toast.success(`${res.data.message}`, {duration: 2000, position: "top-right", });   
          setuserData({
            fullName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "",
          });
          setTimeout(() => {
            navigate("/");
        }, 1000);
    } catch (error) {
         toast.error(`Error: ${error.response.data.message}`, {duration: 3000, position: "top-right",icon: "❌"});      
    }
      
    // console.log(userData);
};

  return (
    <>
      <div className="">
        <div className="w-full p-6 rounded-lg shadow-md bg-green-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  border border-green-100">
          <h1 className="text-3xl font-bold text-center text-black">Signup</h1>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="p-2 text-lg  label-text text-black"
              >
                FullName :
              </label>
              <input
                id="fullname"
                type="text"
                className="border outline-none bg-white input-bordered h-10 w-full p-2 rounded-lg border-green-100"
                placeholder="Enter Full Name"
                name="fullName"
                value={userData.fullName}
                onChange={onChangeHandler}
              />
            </div>
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
                value={userData.username}
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="p-2 text-lg  label-text text-black"
              >
                email :
              </label>
              <input
                id="email"
                type="email"
                className="border outline-none bg-white input-bordered h-10 w-full p-2 rounded-lg border-green-100"
                placeholder="Enter Your Email"
                name="email"
                value={userData.email}
                onChange={onChangeHandler}
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
                        type={showPassword ?'text':'password' }
                        className="border outline-none bg-white input-bordered h-10 w-full p-2 rounded-lg border-green-100"
                        placeholder="Enter Your Password"
                        name="password"
                        value={userData.password}
                        onChange={onChangeHandler}
                    />
                     <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 cursor-pointer text-gray-600">
                        {showPassword ? <FaRegEye/> : <FaEyeSlash/>}
                    </span>
               </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="p-2 text-lg label-text text-black"
              >
                ConfirmPassword :
              </label>
                <div className="relative">
                    <input
                    id="confirmPassword"
                    type={showPassword ? "text": "password"}
                    className="border outline-none  bg-white input-bordered h-10 w-full p-2 rounded-lg border-green-100"
                    placeholder="Enter Your ConfirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={onChangeHandler}
                />
                   <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 cursor-pointer text-gray-600">
                        {showPassword ? <FaRegEye/> : <FaEyeSlash/>}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex gap-4 items-center" htmlFor="male">
                <span className="label-text text-black text-lg">Male:</span>
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  checked={userData.gender == "male"}
                  value="male"
                  className="checkbox bg-white"
                  onChange={onChangeHandler}
                />
              </label>
              <label className="flex gap-4 items-center" htmlFor="female">
                <span className="label-text text-black text-lg">Female:</span>
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  checked={userData.gender == "female"}
                  value="female"
                  className="checkbox bg-white"
                  onChange={onChangeHandler}
                />
              </label>
            </div>
            <div>
              <button className="btn text-lg font-normal hover:text-white hover:bg-green-300 text-black btn-block btn-sm mt-4 border border-green-700 bg-white">
                Sign up
              </button>
            </div>
          </form>
        
      
            <p className=" text-lg text-center w-full block text-black mt-2">
              Already have an account ?
              <Link to="/" className=" ml-2">
                Login
              </Link>
            </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
