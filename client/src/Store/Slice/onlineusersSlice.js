import { createSlice } from "@reduxjs/toolkit";




const onlineUserSlice =createSlice({
    name:'onlineUser',
    initialState:{
        onlineUsers:null,
    },
    reducers:{
        setOnlineUsers:(state,action) => {
            state.onlineUsers=action.payload;
        }
    }
})

export const {setOnlineUsers}=onlineUserSlice.actions;
export default onlineUserSlice.reducer;