import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const openApi = createApi({
    reducerPath: "openApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/open" }),
    tagTypes: ["open"],
    endpoints: (builder) => {
        return {
            getAllCAtegories: builder.query({
                query: (id) => {
                    return {
                        url: `/categories`,
                        method: "GET"
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),

            getFilteredData: builder.query({
                query: (type) => {
                    return {
                        url: `/filter`,
                        method: "GET",
                         params:type
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),
            getCArousel: builder.query({
                query: (id) => {
                    return {
                        url: `/carousel`,
                        method: "GET"
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),
            getAllProducts: builder.query({
                query: () => {
                    return {
                        url: "/get-products",
                        method: "GET"
                    }
                },
                transformResponse:data =>data.result,
                providesTags: ["user"]
            }),
            getDetails: builder.query({
                query: id => {
                    return {
                        url: `/details/${id}`,
                        method: "GET",
                        // body: addressData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),
            postContact: builder.mutation({
                query: contactData => {
                    return {
                        url: `post-contact`,
                        method: "POST",
                        body: contactData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),
        
        }
    }
})

export const {
    useGetAllCAtegoriesQuery,
    useLazyGetFilteredDataQuery,
    useGetAllProductsQuery,
    useGetCArouselQuery,
    useGetDetailsQuery,
    // usePostContactQuery
    usePostContactMutation
} = openApi

// useAddAddressMutation,
// useGetAddressesQuery,
// useGetDetailsQuery,
// useGetOrdersQuery,
// useAddCartMutation,
// useGetAllCartItemsQuery,
// useDeleteCArtItemMutation,
// useCreateOrderMutation,
// useDeleteFullCartMutation,
// // useGetAllProductsQuery,
// useCancelOrderMutation,
// // useGetCArouselQuery,
// // useGetFilteredDataQuery,
// // useLazyGetFilteredDataQuery,
// useUpdateProfileMutation,
// useLikeMutation,
// useDeleteLikeMutation,
// useGetLikedQuery,
// // useGetAllCAtegoriesQuery

