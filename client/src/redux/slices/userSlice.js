import { createSlice } from "@reduxjs/toolkit";
import { userAuthApi } from "../apis/userAuthApi";

const userSlice= createSlice({
    name: "userSlice",
    initialState: {
        user: JSON.parse(localStorage.getItem("user"))
    },
    reducers: {
        invalidate: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = false
            })
        }
    },
    extraReducers: builder => builder
        .addMatcher(userAuthApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })
        .addMatcher(userAuthApi.endpoints.logoutUser.matchFulfilled, (state, { payload }) => {
            state.user = null
        })
        // .addCase(actionName.rejected, (state, { payload }) => {
        //     state.loading = false
        //     state.error = payload
        // })
       
})

// export const { invalidate } = userSlice.actions
export default userSlice.reducer