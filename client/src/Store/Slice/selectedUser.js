 import { createSlice } from "@reduxjs/toolkit";




 const selectedUser= createSlice({
    name: 'selectedUser',
    initialState:{
        selectedUser: null
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    }
   
 })
 export const {setSelectedUser} = selectedUser.actions
 export default selectedUser.reducer;