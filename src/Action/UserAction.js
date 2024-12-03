import { createAsyncThunk } from "@reduxjs/toolkit";
import UserApi from "../API/UserApi";

// read all - createAsyncThunk(action_const, action_handler_method)
export const readAllUser = createAsyncThunk("user/all", async () => {
    console.log(`read all user action method`)
    const res = await UserApi.readAll()
    return res?.data?.users
})


// create
export const addNewUser = createAsyncThunk("user/add", async (user) => {
    // console.log(`add new user action method`)
    const res = await UserApi.create(user)
    return res?.data
})

// update
export const editUser = createAsyncThunk("user/edit", async ({ id, user }) => {
    console.log(`edit user action method`)
    const res = await UserApi.update({ id, user })
    return { id , data: res?.data, user }
})

// delete
export const deleteUser = createAsyncThunk("user/delete", async (id) => {
    console.log(`delete user action method = ${id}`)
    const res = await UserApi.delete(id)
    return { id , data: res?.data }
})
