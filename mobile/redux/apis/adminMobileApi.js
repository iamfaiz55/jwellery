import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminMobileApi = createApi({
    reducerPath: "adminMobileApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/adminAuth`, credentials:"include" }),
    // baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/adminAuth`, credentials:"include" }),
    tagTypes: ["AdminAuth"],
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

                invalidatesTags: ["AdminAuth"]
            }),
            mobileResponse: builder.mutation({
                query: resData => {
                    return {
                        url: "/mobile-login-response",
                        method: "POST",
                        body: resData
                    }
                },

                invalidatesTags: ["AdminAuth"]
            }),
  
        
            verifyOTP: builder.mutation({
                query: adminData => {
                    return {
                        url: "/verify-otp-admin",
                        method: "POST",
                        body: adminData
                    }
                },

                invalidatesTags: ["AdminAuth"]
            }),
        
            logoutAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/logout-admin",
                        method: "POST",
                        body: adminData
                    }
                },

                invalidatesTags: ["AdminAuth"]
            }),
            noitificationToken: builder.mutation({
                query: tokenData => {
                    return {
                        url: "/create-token",
                        method: "POST",
                        body: tokenData
                    }
                },

                invalidatesTags: ["AdminAuth"]
            }),
        
        }
    }
})

export const { 
    useLoginAdminMutation,
    useLogoutAdminMutation,

    useVerifyOTPMutation,


    useLoginBySocketMutation, 
    useMobileResponseMutation,
    useNoitificationTokenMutation
} = adminMobileApi
