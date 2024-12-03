import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "../Reducer/UserReducer";

// to combine more than one reducer to handle by comman store
const AppReducer = combineReducers({
    users: userSlice.reducer
})

const AppStore = configureStore({
    reducer: AppReducer,
    devTools: true
})

export default AppStore