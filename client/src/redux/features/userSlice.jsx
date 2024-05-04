import { createSlice } from "@reduxjs/toolkit";  



const userSlice = createSlice({
    name:"user",
    initialState : {
        userData : null,
        userCounter: 0
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload;
        },
        increment : (state)=>{
            // if(state.userCounter < 10){
                state.userCounter += 1
            // }
        },
        decrement : (state)=>{
            if(state.userCounter > 0){
                state.userCounter -= 1
            }
        }
    }
})

export const {setUserData,increment,decrement} = userSlice.actions;

export default userSlice.reducer;