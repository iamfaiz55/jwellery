import { configureStore } from "@reduxjs/toolkit";
import { adminAuthApi } from "./apis/adminAuthApi";
import adminSlice from "./slices/adminSlice";
import { adminApi } from "./apis/adminApi";
import { userAuthApi } from "./apis/userAuthApi";
import userSlice from "./slices/userSlice";
import { userApi } from "./apis/userApi";


const reduxStore = configureStore({
    reducer: {
        [adminAuthApi.reducerPath]: adminAuthApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        adminData: adminSlice,
        userData:userSlice,
    },
    middleware: def => [
        ...def(),
         adminAuthApi.middleware,
         adminApi.middleware,
         userAuthApi.middleware,
         userApi.middleware
        ]
})

export default reduxStore