import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const publicApi = createApi({
    reducerPath: "publicApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/open`, credentials: "include" }),
    tagTypes: ["open", "admin"],
    endpoints: (builder) => {
        return {
            getAllCAtegories: builder.query({
                query: () => ({
                    url: `/categories`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getFilteredData: builder.query({
                query: ({ material, page = 1, limit = 12 }) => ({
                    url: `/filter`,
                    method: "GET",
                    params: { material, page, limit }, 
                }),
                // transformResponse: (response) => ({
                //     products: response.result, 
                //     pagination: response.pagination,
                // }),
                providesTags: ["Products"],
            }),
            
            getCArousel: builder.query({
                query: () => ({
                    url: `/carousel`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getAllProducts: builder.query({
                query: ({ page = 1, limit = 8, type } = {}) => ({
                    url: "/get-products",
                    method: "GET",
                    params: { page, limit, type }
                }),
                // transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getDetails: builder.query({
                query: (id) => ({
                    url: `/details/${id}`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getCompanyDetails: builder.query({
                query: (id) => ({
                    url: `/get-company`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getTaxes: builder.query({
                query: () => ({
                    url: `/get-tax`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            postContact: builder.mutation({
                query: (contactData) => ({
                    url: `post-contact`,
                    method: "POST",
                    body: contactData
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getAllScrollCards: builder.query({
                query: () => ({
                    url: `/get-scroll-cards`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getAllGalleryImages: builder.query({
                query: () => ({
                    url: `/get-adds-images`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getSchedule: builder.query({
                query: data=> {
                    return {
                        url: `/get-schedules`,
                        method: "GET",
                        // body: data
                    }
                },
                transformResponse: data => data.result,
                invalidatesTags: ["admin"]
            }),
            getAllMenuItems: builder.query({
                query: () => ({
                    url: `/get-menu-items`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
              // material
              getPublicProductMaterial: builder.query({
                query: (materialData) => {
                    return {
                        url: `/get-product-material`,
                        method: "GET",
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["material"]
            }),
        }
    }
})

export const {
    useGetAllCAtegoriesQuery,
    useLazyGetFilteredDataQuery,
    useGetAllProductsQuery,
    useLazyGetAllProductsQuery,
    useGetCArouselQuery,
    useGetDetailsQuery,
    usePostContactMutation,
    useGetTaxesQuery,
    useLazyGetTaxesQuery,
    useGetCompanyDetailsQuery,
    useGetAllScrollCardsQuery,
    useGetAllGalleryImagesQuery,
    useGetScheduleQuery,
    useGetAllMenuItemsQuery,
    useGetPublicProductMaterialQuery
} = publicApi


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

