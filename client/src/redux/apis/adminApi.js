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
    useUpdateCarouselMutation
} = adminApi
