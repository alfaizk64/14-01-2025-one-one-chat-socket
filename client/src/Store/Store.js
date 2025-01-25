import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import listedUserReducer from "./Slice/listedUserSlice";
import selectedUserReducer from "./Slice/selectedUser";
import messageReducer from "./Slice/messageSlice";
import socketReducer from "./Slice/socketSlice";
import onlineuserSlice from "./Slice/onlineusersSlice";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const rootReducer = combineReducers({
    user: userReducer,
    listedUsers: listedUserReducer,
    selectedUser: selectedUserReducer,
    message: messageReducer,
    socket: socketReducer,
    onlineUsers: onlineuserSlice,
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer:persistedReducer ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore serialization checks for the socket slice
        ignoredPaths: ["socket.socket"], // Ignoring the state path
        ignoredActions: ["socket/setSocket",FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignoring the action
      },
    }),
});
