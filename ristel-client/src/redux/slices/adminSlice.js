import { createSlice } from "@reduxjs/toolkit";
import { adminAuthApi } from "../apis/adminAuthApi";

const adminSlice = createSlice({
    name: "adminSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("ristel-admin")),
    },
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(adminAuthApi.endpoints.verifyAdminOTP.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(adminAuthApi.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
            state.mobile = payload
        })
        .addMatcher(adminAuthApi.endpoints.logoutAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })

})

export const { invalidate } = adminSlice.actions
export default adminSlice.reducer