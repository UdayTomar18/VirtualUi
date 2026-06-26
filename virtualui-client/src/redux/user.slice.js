import { createSlice } from "@reduxjs/toolkit";
import { deleteApp } from "firebase/app";


const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        }
    }
});

export const {setUserData} = userSlice.actions

export default userSlice.reducer