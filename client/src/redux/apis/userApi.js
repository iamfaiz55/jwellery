import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// .get("/get-orders", userController.getOrders)
// .get("/details/:pId", userController.getDetails)
// .post("/add-address", userController.addAddress)
// .get("/get-address", userController.getAddresses)
// .get("/get-cart/:uid", userController.getAllCartItems)
// .post("/create-cart", userController.addCart)
// .post("/delete-cart/:id", userController.deleteItemFromCart)



export const userApi = createApi({
    reducerPath: "userApi",
    // baseQuery: fetchBaseQuery({ baseUrl:`${import.meta.env.VITE_BACKEND_URL}/api/user`, credentials:"include" }),
    baseQuery: fetchBaseQuery({ baseUrl:`http://localhost:5000/api/user`, credentials:"include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getOrders: builder.query({
                query: (id) => {
                    return {
                        url: `/get-orders/${id}`,
                        method: "GET"
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),
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
            getLiked: builder.query({
                query: (id) => {
                    return {
                        url: `/getLiked/${id}`,
                        method: "GET",
                        
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
            addAddress: builder.mutation({
                query: addressData => {
                    return {
                        url: "/add-address",
                        method: "POST",
                        body: addressData
                    }
                },
                invalidatesTags: ["user"]
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
            getAddresses: builder.query({
                query: id => {
                    return {
                        url: `/get-address/${id}`,
                        method: "GET",
                        // body: addressData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),
            addCart: builder.mutation({
                query: cartData => {
                    return {
                        url: `/create-cart`,
                        method: "POST",
                        body: cartData
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
            like: builder.mutation({
                query: likeData => {
                    return {
                        url: `/like`,
                        method: "POST",
                        body: likeData
                    }
                },
                // transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
            deleteLike: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-like/${id}`,
                        method: "DELETE",
                        // body: likeData
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
            getAllCartItems: builder.query({
                query: id => {
                    return {
                        url: `/get-cart/${id}`,
                        method: "GET",
                        // body: addressData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),
            deleteCArtItem: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-cart/${id}`,
                        method: "DELETE",
                        // body: addressData
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
            deleteFullCart: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-all-cart`,
                        method: "DELETE",
                        body: id
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
            createOrder: builder.mutation({
                query: orderData => {
                    return {
                        url: `/create-order`,
                        method: "POST",
                        body: orderData
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
            cancelOrder: builder.mutation({
                query: id => {
                    return {
                        url: `/cancel-order/${id}`,
                        method: "PUT",
                        // body: orderData
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
            updateProfile: builder.mutation({
                query: data => {
                    return {
                        url: `/update-profile`,
                        method: "PUT",
                        body: data
                    }
                },
                transformResponse:data => {
                    const userProfile = JSON.parse(localStorage.getItem("user"));
        
                    if (userProfile) {
                        // console.log(userProfile.image);
                        userProfile.image = data.result.image;
                        // console.log(userProfile.image);
                        // console.log(data);
                        
                         
                        localStorage.setItem("user", JSON.stringify(userProfile));
                    }   
                },
                invalidatesTags: ["user"]
            }),
        
        }
    }
})

export const { 
    useAddAddressMutation,
    useGetAddressesQuery,
    useGetDetailsQuery,
    useGetOrdersQuery,
    useAddCartMutation,
    useGetAllCartItemsQuery,
    useDeleteCArtItemMutation,
    useCreateOrderMutation,
    useDeleteFullCartMutation,
    useGetAllProductsQuery,
    useCancelOrderMutation,
    useGetCArouselQuery,
    // useGetFilteredDataQuery,
    useLazyGetFilteredDataQuery,
    useUpdateProfileMutation,
    useLikeMutation,
    useDeleteLikeMutation,
    useGetLikedQuery,
    useGetAllCAtegoriesQuery
    
} = userApi
