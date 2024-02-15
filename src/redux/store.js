import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/reducers/todoSlice"

export default configureStore({
    reducer: {
        todo: todoReducer,
    }
})