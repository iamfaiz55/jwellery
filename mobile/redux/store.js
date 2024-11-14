import { configureStore } from "@reduxjs/toolkit";
import { adminMobileApi } from "./apis/adminMobileApi";


const reduxStore = configureStore({
    reducer: {
        [adminMobileApi.reducerPath]:adminMobileApi.reducer,
    },
    middleware:def=> [...def(), adminMobileApi.middleware]
})

export default reduxStore