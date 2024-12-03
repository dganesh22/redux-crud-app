import { createSlice } from "@reduxjs/toolkit";
import { readAllUser, addNewUser, editUser, deleteUser } from '../Action/UserAction'


const userSlice = createSlice({
    name: "user",
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(addNewUser.fulfilled, (state, action) => { 
                state.push(action.payload.user)
        })
            .addCase(readAllUser.fulfilled, (state, action) => {
                return [...action.payload]
            })
            .addCase(editUser.fulfilled, (state, action) => { 
                let index = state.findIndex(item => item.id === action.payload.id)
                state[index] = {
                    ...state[index],
                    ...action.payload.user
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => { 
                let index = state.findIndex(item => item.id === action.payload.id)
                state.splice(index,1)
            })
    }
})

export default userSlice