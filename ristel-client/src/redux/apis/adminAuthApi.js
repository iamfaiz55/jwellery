import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminAuthApi = createApi({
    reducerPath: "adminAuthApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/adminAuth`, credentials: "include" }),
    endpoints: (builder) => {
        return {
            loginAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/login-admin",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("mobile", JSON.stringify(data.result))
                    return data.result
                },
            }),

            verifyAdminOTP: builder.mutation({
                query: adminData => {
                    return {
                        url: "/verify-otp-admin",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("ristel-admin", JSON.stringify(data.result))
                    return data.result
                },
            }),

            logoutAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/logout-admin",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("ristel-admin")
                },
            }),

        }
    }
})

export const {
    useLoginAdminMutation,
    useLogoutAdminMutation,
    useVerifyAdminOTPMutation
} = adminAuthApi
