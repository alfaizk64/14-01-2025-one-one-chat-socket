import React, { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import HomePage from "./Component/HomePage";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./Store/Slice/socketSlice";
import { setOnlineUsers } from "./Store/Slice/onlineusersSlice";


const App = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
         
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5050", {
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
export default App;
// import React, { useEffect, useState } from "react";
// import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
// import HomePage from "./Component/HomePage";
// import Signup from "./Component/Signup";
// import Login from "./Component/Login";
// import { useDispatch, useSelector } from "react-redux";
// import io from "socket.io-client";
// import { setSocket } from "./Store/Slice/socketSlice";
// import { setOnlineUsers } from "./Store/Slice/onlineusersSlice";

// // Protected Route Component
// const ProtectedRoute = ({ element }) => {
//   const { authUser } = useSelector((state) => state.user);
//   return authUser ? element : <Navigate to="/" />;
// };

// const App = () => {
//   const dispatch = useDispatch();
//   const { authUser } = useSelector((state) => state.user);
//   const { socket } = useSelector((state) => state.socket);

//   useEffect(() => {
//     if (authUser) {
//       const socket = io("http://localhost:5050", {
//         query: {
//           userId: authUser.id,
//         },
//       });
//       dispatch(setSocket(socket));
//       socket.on("getOnlineUsers", (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });
//       return () => {
//         socket.close();
//       };
//     } else if (socket) {
//       socket.close();
//       dispatch(setSocket(null));
//     }
//   }, [authUser, dispatch, socket]);

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: authUser ? <Navigate to="/home" /> : <Login />,
//     },
//     {
//       path: "/register",
//       element: authUser ? <Navigate to="/home" /> : <Signup />,
//     },
//     {
//       path: "/home",
//       element: <ProtectedRoute element={<HomePage />} />,
//     },
//   ]);

//   return (
//     <div className="App h-full min-h-screen flex items-center justify-center p-4">
//       <RouterProvider router={router} />
//     </div>
//   );
// };

// export default App;
