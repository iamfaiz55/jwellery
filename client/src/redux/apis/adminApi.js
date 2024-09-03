import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`, credentials:"include" }),
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/admin`, credentials:"include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
           
            getAllOrders: builder.query({
                query: pData => {
                    return {
                        url: "/all-orders",
                        method: "GET",
                        // body: pData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["admin"]
            }),
            getAllUsers: builder.query({
                query: pData => {
                    return {
                        url: "/all-user",
                        method: "GET",
                        // body: pData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["admin"]
            }),
            addProduct: builder.mutation({
                query: pData => {
                    return {
                        url: "/add-product",
                        method: "POST",
                        body: pData
                    }
                },
                invalidatesTags: ["admin"]
            }),
        
            deleteProduct: builder.mutation({
                query: pDId=> {
                    return {
                        url: `/delete-products/${pDId}`,
                        method: "PUT",
                        // body: pUId
                    }
                },
                invalidatesTags: ["admin"]
            }),
            updateProd: builder.mutation({
                query: pData=> {
                    return {
                        url: `/update-product/${pData._id}`,
                        method: "PUT",
                        body: pData.fd
                    }
                },
                invalidatesTags: ["admin"]
            }),
            addCarousel: builder.mutation({
                query: carouselData=> {
                    return {
                        url: `/add-carousel`,
                        method: "POST",
                        body: carouselData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            deleteCarousel: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-carousel/${id}`,
                        method: "DELETE",
                        // body: id
                    }
                },
                invalidatesTags: ["admin"]
            }),
            updateStatus: builder.mutation({
                query: statusData => {
                    return {
                        url: `/update-order-status`,
                        method: "PUT",
                        body: statusData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            updateCarousel: builder.mutation({
                query: carouselData => {
                    return {
                        url: `/update-carousel`,
                        method: "POST",
                        body: carouselData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            blockUser: builder.mutation({
                query: id => {
                    return {
                        url: `/block-user/${id}`,
                        method: "PUT",
                        // body: carouselData
                    }
                },
                transformResponse:data => {
                    const x = JSON.parse(localStorage.getItem("user"))
                //    console.log(x._id);
                //    console.log(data.result._id);
             
                    
                    if(x._id == data.result._id){   
                        // console.log(x);
                        // console.log(data.result); 
                        localStorage.setItem("user", JSON.stringify(data.result));
                    }
                },
                invalidatesTags: ["admin"]
            }),
            unblockUser: builder.mutation({
                query: id => {
                    return {
                        url: `/unblock-user/${id}`,
                        method: "PUT",
                        // body: carouselData
                    }
                },
                transformResponse:data => {
                    const x = JSON.parse(localStorage.getItem("user"))
                    // console.log(x);
                    
                    if(x._id == data.result._id){    
                        localStorage.setItem("user", JSON.stringify(data.result));
                    }
                },
                invalidatesTags: ["admin"]
            }),
            addCategory: builder.mutation({
                query: categoryData => {
                    return {
                        url: `/add-category`,
                        method: "POST",
                        body: categoryData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            deleteCategory: builder.mutation({
                query: id=> {
                    return {
                        url: `/delete-category/${id}`,
                        method: "DELETE",
                        // body: categoryData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            unableMethod: builder.mutation({
                query: id=> {
                    return {
                        url: `/enable-method/${id}`,
                        method: "PUT",
                        // body: categoryData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            disableMethod: builder.mutation({
                query: id=> {
                    return {
                        url: `/disable-method/${id}`,
                        method: "PUT",
                        // body: categoryData
                    }
                },
                invalidatesTags: ["admin"]
            }),
        
            getAllContacts: builder.query({
                query: id=> {
                    return {
                        url: `/get-contact`,
                        method: "GET",
                        // body: categoryData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["admin"]
            }),
        
            getAllPaymentMethod: builder.query({
                query: id=> {
                    return {
                        url: `/get-all-payment-method`,
                        method: "GET",
                        // body: categoryData
                    }
                },
                transformResponse:data => data.result,
                providesTags: ["admin"]
            }),
        
            getCompanyAddress: builder.query({
                query: id=> {
                    return {
                        url: `/get-company-addresses`,
                        method: "GET",
                        // body: categoryData
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["admin"]
            }),
            updtaeCompanyAddress: builder.mutation({
                query: addressData=> {
                    return {
                        url: `/update-company-address/${addressData._id}`,
                        method: "PUT",
                        body: addressData
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["admin"]
            }),
        
        }
    }
})

export const { 
    useAddProductMutation,
    useGetAllProductsQuery,
    useDeleteProductMutation,
    useUpdateProdMutation,
    useGetAllOrdersQuery,
    useGetAllUsersQuery,
    useAddCarouselMutation,
    useDeleteCarouselMutation,
    useUpdateStatusMutation,
    useUpdateCarouselMutation,
    useBlockUserMutation,
    useUnblockUserMutation,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllContactsQuery,


    useGetAllPaymentMethodQuery,
  useUnableMethodMutation,
  useDisableMethodMutation,

  useGetCompanyAddressQuery,
  useUpdtaeCompanyAddressMutation
} = adminApi
