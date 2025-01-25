import { createSlice } from "@reduxjs/toolkit";




const listedusersSlice = createSlice({
    name: 'listedUsers',
    initialState: {
        listedUsers: null,
        
        },
        
    reducers: {
        setListedUsers: (state, action) => {
            state.listedUsers = action.payload;
        },
        
    }
})
export const {setListedUsers} = listedusersSlice.actions;
export default listedusersSlice.reducer;