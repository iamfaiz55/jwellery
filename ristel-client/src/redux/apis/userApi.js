// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// // .get("/get-orders", userController.getOrders)
// // .get("/details/:pId", userController.getDetails)
// // .post("/add-address", userController.addAddress)
// // .get("/get-address", userController.getAddresses)
// // .get("/get-cart/:uid", userController.getAllCartItems)
// // .post("/create-cart", userController.addCart)
// // .post("/delete-cart/:id", userController.deleteItemFromCart)



// export const userApi = createApi({
//     reducerPath: "userApi",
//     baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/user`, credentials: "include" }),
//     // baseQuery: fetchBaseQuery({ baseUrl:`http://localhost:5000/api/user`, credentials:"include" }),
//     tagTypes: ["user"],
//     endpoints: (builder) => {
//         return {
//             getOrders: builder.query({
//                 query: (id) => {
//                     return {
//                         url: `/get-orders/${id}`,
//                         method: "GET"
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 providesTags: ["user"]
//             }),
//             // getAllCAtegories: builder.query({
//             //     query: (id) => {
//             //         return {
//             //             url: `/categories`,
//             //             method: "GET"
//             //         }
//             //     },
//             //     transformResponse:data => data.result,
//             //     providesTags: ["user"]
//             // }),
//             getLiked: builder.query({
//                 query: (id) => {
//                     return {
//                         url: `/getLiked/${id}`,
//                         method: "GET",

//                     }
//                 },
//                 transformResponse: data => data.result,
//                 providesTags: ["user"]
//             }),
//             // getFilteredData: builder.query({
//             //     query: (type) => {
//             //         return {
//             //             url: `/filter`,
//             //             method: "GET",
//             //              params:type
//             //         }
//             //     },
//             //     transformResponse:data => data.result,
//             //     providesTags: ["user"]
//             // }),
//             // getCArousel: builder.query({
//             //     query: (id) => {
//             //         return {
//             //             url: `/carousel`,
//             //             method: "GET"
//             //         }
//             //     },
//             //     transformResponse:data => data.result,
//             //     providesTags: ["user"]
//             // }),
//             // getAllProducts: builder.query({
//             //     query: () => {
//             //         return {
//             //             url: "/get-products",
//             //             method: "GET"
//             //         }
//             //     },
//             //     transformResponse:data =>data.result,
//             //     providesTags: ["user"]
//             // }),
//             addAddress: builder.mutation({
//                 query: addressData => {
//                     return {
//                         url: "/add-address",
//                         method: "POST",
//                         body: addressData
//                     }
//                 },
//                 invalidatesTags: ["user"]
//             }),
//             deleteAddress: builder.mutation({
//                 query: id => {
//                     return {
//                         url: `/delete-address/${id}`,
//                         method: "DELETE",
//                         // body: addressData
//                     }
//                 },
//                 invalidatesTags: ["user"]
//             }),
//             // getDetails: builder.query({
//             //     query: id => {
//             //         return {
//             //             url: `/details/${id}`,
//             //             method: "GET",
//             //             // body: addressData
//             //         }
//             //     },
//             //     transformResponse:data => data.result,
//             //     providesTags: ["user"]
//             // }),
//             getAddresses: builder.query({
//                 query: id => {
//                     return {
//                         url: `/get-address/${id}`,
//                         method: "GET",
//                         // body: addressData
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 providesTags: ["user"]
//             }),
//             addCart: builder.mutation({
//                 query: cartData => {
//                     return {
//                         url: `/create-cart`,
//                         method: "POST",
//                         body: cartData
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 invalidatesTags: ["user"]
//             }),
//             like: builder.mutation({
//                 query: likeData => {
//                     return {
//                         url: `/like`,
//                         method: "POST",
//                         body: likeData
//                     }
//                 },
//                 // transformResponse:data => data.result,
//                 invalidatesTags: ["user"]
//             }),
//             deleteLike: builder.mutation({
//                 query: id => {
//                     return {
//                         url: `/delete-like/${id}`,
//                         method: "DELETE",
//                         // body: likeData
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 invalidatesTags: ["user"]
//             }),
//             getAllCartItems: builder.query({
//                 query: id => {
//                     return {
//                         url: `/get-cart/${id}`,
//                         method: "GET",
//                         // body: addressData
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 providesTags: ["user"]
//             }),
//             deleteCArtItem: builder.mutation({
//                 query: id => {
//                     return {
//                         url: `/delete-cart/${id}`,
//                         method: "DELETE",
//                         // body: addressData
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 invalidatesTags: ["user"]
//             }),
//             deleteFullCart: builder.mutation({
//                 query: id => {
//                     return {
//                         url: `/delete-all-cart`,
//                         method: "DELETE",
//                         body: id
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 invalidatesTags: ["user"]
//             }),
//             createOrder: builder.mutation({
//                 query: orderData => {
//                     return {
//                         url: `/create-order`,
//                         method: "POST",
//                         body: orderData
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 invalidatesTags: ["user"]
//             }),
//             cancelOrder: builder.mutation({
//                 query: id => {
//                     return {
//                         url: `/cancel-order/${id}`,
//                         method: "PUT",
//                         // body: orderData
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 invalidatesTags: ["user"]
//             }),
//             razorpay: builder.mutation({
//                 query: data => {
//                     return {
//                         url: `/razorpay`,
//                         method: "POST",
//                         body: data
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 invalidatesTags: ["user"]
//             }),
//             verifyPayment: builder.mutation({
//                 query: verifydata => {
//                     return {
//                         url: `/verify-payment`,
//                         method: "POST",
//                         body: verifydata
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 invalidatesTags: ["user"]
//             }),
//             postReview: builder.mutation({
//                 query: reviewData => {
//                     return {
//                         url: `/post-review`,
//                         method: "POST",
//                         body: reviewData
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 invalidatesTags: ["user"]
//             }),
//             // updateProfile: builder.mutation({
//             getReviews: builder.query({
//                 query: (id) => {
//                     return {
//                         url: `/get-all-reviews/${id}`,
//                         method: "GET",
//                         // body: reviewData
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 providesTags: ["user"]
//             }),

//             updateProfile: builder.mutation({
//                 query: data => {
//                     return {
//                         url: `/update-profile`,
//                         method: "PUT",
//                         body: data
//                     }
//                 },
//                 transformResponse: data => {
//                     const userProfile = JSON.parse(localStorage.getItem("user"));

//                     if (userProfile._id == data.result._id) {
//                         // userProfile.image = data.result.image;
//                         localStorage.setItem("user", JSON.stringify(data.result));
//                     }
//                 },
//                 invalidatesTags: ["user"]
//             }),
//             getAllPaymentMethodUser: builder.query({
//                 query: id => {
//                     return {
//                         url: `/get-all-payment-method`,
//                         method: "GET",
//                         // body: categoryData
//                     }
//                 },
//                 transformResponse: data => data.result,
//                 providesTags: ["user"]
//             }),


//         }
//     }
// })

// export const {
//     useAddAddressMutation,
//     useGetAddressesQuery,
//     useDeleteAddressMutation,
//     useGetOrdersQuery,
//     useAddCartMutation,
//     useGetAllCartItemsQuery,
//     useDeleteCArtItemMutation,
//     useCreateOrderMutation,
//     useDeleteFullCartMutation,
//     useCancelOrderMutation,

//     useUpdateProfileMutation,
//     useLikeMutation,
//     useDeleteLikeMutation,
//     useGetLikedQuery,
//     useRazorpayMutation,
//     useVerifyPaymentMutation,
//     // useGetReviewsMutation,
//     usePostReviewMutation,
//     useGetReviewsQuery,
//     useGetAllPaymentMethodUserQuery

// } = userApi



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
    baseQuery: fetchBaseQuery({ baseUrl:`${import.meta.env.VITE_BACKEND_URL}/api/user`, credentials:"include" }),
    // baseQuery: fetchBaseQuery({ baseUrl:`http://localhost:5000/api/user`, credentials:"include" }),
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
            // getAllCAtegories: builder.query({
            //     query: (id) => {
            //         return {
            //             url: `/categories`,
            //             method: "GET"
            //         }
            //     },
            //     transformResponse:data => data.result,
            //     providesTags: ["user"]
            // }),
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
            // getFilteredData: builder.query({
            //     query: (type) => {
            //         return {
            //             url: `/filter`,
            //             method: "GET",
            //              params:type
            //         }
            //     },
            //     transformResponse:data => data.result,
            //     providesTags: ["user"]
            // }),
            // getCArousel: builder.query({
            //     query: (id) => {
            //         return {
            //             url: `/carousel`,
            //             method: "GET"
            //         }
            //     },
            //     transformResponse:data => data.result,
            //     providesTags: ["user"]
            // }),
            // getAllProducts: builder.query({
            //     query: () => {
            //         return {
            //             url: "/get-products",
            //             method: "GET"
            //         }
            //     },
            //     transformResponse:data =>data.result,
            //     providesTags: ["user"]
            // }),
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
            deleteAddress: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-address/${id}`,
                        method: "DELETE",
                        // body: addressData
                    }
                },
                invalidatesTags: ["user"]
            }),
            // getDetails: builder.query({
            //     query: id => {
            //         return {
            //             url: `/details/${id}`,
            //             method: "GET",
            //             // body: addressData
            //         }
            //     },
            //     transformResponse:data => data.result,
            //     providesTags: ["user"]
            // }),
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
            updateAddress: builder.mutation({
                query: addressData => {
                    return {
                        url: "/update-address",
                        method: "POST",
                        body: addressData
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
           razorpay: builder.mutation({
                query: data => {
                    return {
                        url: `/razorpay`,
                        method: "POST",
                        body: data
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
           phonePe: builder.mutation({
                query: data => {
                    return {
                        url: `/payment`,
                        method: "POST",
                        body: data
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
          verifyPayment: builder.mutation({
                query: verifydata => {
                    return {
                        url: `/verify-payment`,
                        method: "POST",
                        body: verifydata
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
          postReview: builder.mutation({
                query:reviewData => {
                    return {
                        url: `/post-review`,
                        method: "POST",
                        body: reviewData
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
          sendInvoiceAgain: builder.mutation({
                query:invoiceData => {
                    return {
                        url: `/send-invoice-again`,
                        method: "POST",
                        body: invoiceData
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
      
            // updateProfile: builder.mutation({
          getReviews: builder.query({
                query:(id) => {
                    return {
                        url: `/get-all-reviews/${id}`,
                        method: "GET",
                        // body: reviewData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),
          getProfile: builder.query({
                query:(id) => {
                    return {
                        url: `/get-profile/${id}`,
                        method: "GET",
                        // body: reviewData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
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
        
                    if (userProfile._id == data.result._id) {
                        // userProfile.image = data.result.image;
                        localStorage.setItem("user", JSON.stringify(data.result));
                    }   
                },
                invalidatesTags: ["user"]
            }),
            updateProfileData: builder.mutation({
                query: data => {
                    return {
                        url: `/update-profile-data/${data._id}`,
                        method: "PUT",
                        body: data
                    }
                },
                transformResponse:data => {
                    const userProfile = JSON.parse(localStorage.getItem("user"));
        
                    if (userProfile._id == data.result._id) {
                        // userProfile.image = data.result.image;
                        localStorage.setItem("user", JSON.stringify(data.result));
                    }   
                },
                invalidatesTags: ["user"]
            }),
            getAllPaymentMethodUser: builder.query({
                query: id=> {
                    return {
                        url: `/get-all-payment-method`,
                        method: "GET",
                        // body: categoryData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),
            deactivate: builder.mutation({
                query: id=> {
                    return {
                        url: `/deactivate/${id}`,
                        method: "PUT",
                        // body: categoryData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["user"]
            }),
        
        
        }
    }
})

export const { 
    useAddAddressMutation,
    useGetAddressesQuery,
    useDeleteAddressMutation,
    useGetOrdersQuery,
    useAddCartMutation,
    useGetAllCartItemsQuery,
    useDeleteCArtItemMutation,
    useCreateOrderMutation,
    useDeleteFullCartMutation,
    useCancelOrderMutation,

    useUpdateProfileMutation,
    useLikeMutation,
    useDeleteLikeMutation,
    useGetLikedQuery,
    useRazorpayMutation,
    useVerifyPaymentMutation,
    // useGetReviewsMutation,
    usePostReviewMutation,
    useGetReviewsQuery,
    useGetAllPaymentMethodUserQuery,
    useGetProfileQuery,
    useUpdateProfileDataMutation,
    // usePostHistoryMutation,
    usePhonePeMutation,
    useSendInvoiceAgainMutation,
    useUpdateAddressMutation,
    useDeactivateMutation
    
} = userApi