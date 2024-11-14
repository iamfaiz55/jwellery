import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


// register-user
// login-user
// logout-user
export const userAuthApi = createApi({
    reducerPath: "userAuthApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/userAuth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {

            loginUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/login-user",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("mobile", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),

            verifyOTPUser: builder.mutation({
                query: otpData => {
                    return {
                        url: "/verify-otp-user",
                        method: "POST",
                        body: otpData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("user", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),

            logoutUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout-user",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("user")
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),

        }
    }
})

export const {
    useLoginUserMutation,
    useLogoutUserMutation,
    useVerifyOTPUserMutation
} = userAuthApi
