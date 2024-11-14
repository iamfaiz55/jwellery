import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./apis/adminApi";
import { adminAuthApi } from "./apis/adminAuthApi";
import { userAuthApi } from "./apis/userAuthApi";
import userSlice from "./slices/userSlice";
import adminSlice from "./slices/adminSlice";
import { userApi } from "./apis/userApi";
import { publicApi } from "./apis/publicApi";


const reduxStore = configureStore({
    reducer: {
        [adminAuthApi.reducerPath]: adminAuthApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [publicApi.reducerPath]: publicApi.reducer,
        admin: adminSlice,
        user: userSlice,
    },
    middleware: def => [
        ...def(),
        adminAuthApi.middleware,
        adminApi.middleware,
        userAuthApi.middleware,
        userApi.middleware,
        publicApi.middleware
    ]
})

export default reduxStore