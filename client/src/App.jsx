import React, { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import HomePage from "./Component/HomePage";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./Store/Slice/socketSlice";
import { setOnlineUsers } from "./Store/Slice/onlineusersSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <HomePage/>,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
         
  useEffect(() => {
    if (authUser) {
      const socket = io("https://one4-01-2025-one-one-chat-socket.onrender.com", {
        query: {
          userId: authUser.id,
        },
      });
      dispatch(setSocket(socket));
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);
  return (
    <>
      <div className="App h-full min-h-screen flex items-center justify-center p-4">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
