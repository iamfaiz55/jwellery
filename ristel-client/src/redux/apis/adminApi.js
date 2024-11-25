import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`, credentials:"include" }),
    // baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/admin`, credentials: "include" }),
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
                transformResponse: data => data.result,
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
                transformResponse: data => data.result,
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
                query: pDId => {
                    return {
                        url: `/delete-products/${pDId}`,
                        method: "PUT",
                        // body: pUId
                    }
                },
                invalidatesTags: ["admin"]
            }),
            updateProd: builder.mutation({
                query: pData => {
                    return {
                        url: `/update-product/${pData._id}`,
                        method: "PUT",
                        body: pData.fd
                    }
                },
                invalidatesTags: ["admin"]
            }),
            addCarousel: builder.mutation({
                query: carouselData => {
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
                transformResponse: data => {
                    // const x = JSON.parse(localStorage.getItem("user"))
                    // //    console.log(x._id);
                    // //    console.log(data.result._id);


                    // if (x._id == data.result._id) {
                    //     // console.log(x);
                    //     // console.log(data.result); 
                    //     localStorage.setItem("user", JSON.stringify(data.result));
                    // }
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
                transformResponse: data => {
                    // const x = JSON.parse(localStorage.getItem("user"))
                    // // console.log(x);

                    // if (x._id == data.result._id) {
                    //     localStorage.setItem("user", JSON.stringify(data.result));
                    // }
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
                query: id => {
                    return {
                        url: `/delete-category/${id}`,
                        method: "DELETE",
                        // body: categoryData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            unableMethod: builder.mutation({
                query: id => {
                    return {
                        url: `/enable-method/${id}`,
                        method: "PUT",
                        // body: categoryData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            disableMethod: builder.mutation({
                query: id => {
                    return {
                        url: `/disable-method/${id}`,
                        method: "PUT",
                        // body: categoryData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            getAllContacts: builder.query({
                query: id => {
                    return {
                        url: `/get-contact`,
                        method: "GET",
                        // body: categoryData
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["admin"]
            }),
            getAllPaymentMethod: builder.query({
                query: id => {
                    return {
                        url: `/get-all-payment-method`,
                        method: "GET",
                        // body: categoryData
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["admin"]
            }),
            getCompanyAddress: builder.query({
                query: id => {
                    return {
                        url: `/get-company-addresses`,
                        method: "GET",
                        // body: categoryData
                    }
                },
                transformResponse: data => data.result,
                invalidatesTags: ["admin"]
            }),
            getAllProductsAdmin: builder.query({
                query: id => {
                    return {
                        url: `/get-all-products`,
                        method: "GET",
                        // body: categoryData
                    }
                },
                transformResponse: data => data.result,
                invalidatesTags: ["admin"]
            }),
            updtaeCompanyAddress: builder.mutation({
                query: addressData => {
                    return {
                        url: `/update-company-address/${addressData._id}`,
                        method: "PUT",
                        body: addressData.fd
                    }
                },
                transformResponse: data => data.result,
                invalidatesTags: ["admin"]
            }),
            updateTax: builder.mutation({
                query: taxData => {
                    return {
                        url: `/update-tax/${taxData._id}`,
                        method: "PUT",
                        body: taxData
                    }
                },
                transformResponse: data => data.result,
                invalidatesTags: ["admin"]
            }),

            // purity
            getAdminProductPurity: builder.query({
                query: (purityData) => {
                    return {
                        url: `/get-product-purity`,
                        method: "GET",
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["purity"]
            }),
            addAdminProductPurity: builder.mutation({
                query: (purityData) => {
                    return {
                        url: `/add-product-purity`,
                        method: "POST",
                        body: purityData
                    }
                },
                invalidatesTags: ["purity"]
            }),
            updateAdminProductPurity: builder.mutation({
                query: (purityData) => {
                    return {
                        url: `/udpate-product-purity/${purityData._id}`,
                        method: "PUT",
                        body: purityData
                    }
                },
                invalidatesTags: ["purity"]
            }),
            deleteAdminProductPurity: builder.mutation({
                query: (id) => {
                    return {
                        url: `/delete-product-purity/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["purity"]
            }),

            // material
            getAdminProductMaterial: builder.query({
                query: (materialData) => {
                    return {
                        url: `/get-product-material`,
                        method: "GET",
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["material"]
            }),
            addAdminProductMaterial: builder.mutation({
                query: (materialData) => {
                    return {
                        url: `/add-product-material`,
                        method: "POST",
                        body: materialData
                    }
                },
                invalidatesTags: ["material"]
            }),
            updateAdminProductMaterial: builder.mutation({
                query: (materialData) => {
                    return {
                        url: `/udpate-product-material/${materialData._id}`,
                        method: "PUT",
                        body: materialData
                    }
                },
                invalidatesTags: ["material"]
            }),
            deleteAdminProductMaterial: builder.mutation({
                query: (id) => {
                    return {
                        url: `/delete-product-material/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["material"]
            }),

            // product type
            getAdminProductType: builder.query({
                query: (productTypeData) => {
                    return {
                        url: `/get-product-type`,
                        method: "GET",
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["material"]
            }),
            addAdminProductType: builder.mutation({
                query: (productTypeData) => {
                    return {
                        url: `/add-product-type`,
                        method: "POST",
                        body: productTypeData
                    }
                },
                invalidatesTags: ["material"]
            }),
            updateAdminProductType: builder.mutation({
                query: (productTypeData) => {
                    return {
                        url: `/udpate-product-type/${productTypeData._id}`,
                        method: "PUT",
                        body: productTypeData
                    }
                },
                invalidatesTags: ["material"]
            }),
            deleteAdminProductType: builder.mutation({
                query: (id) => {
                    return {
                        url: `/delete-product-type/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["material"]
            }),
            getAdminProductGeneralSettings: builder.query({
                query: () => {
                    return {
                        url: `/get-product-general-settings`,
                        method: "GET",
                    }
                },
                transformResponse: data => data.result,
                // providesTags: ["material"]
            }),
            getUserStatics: builder.query({
    query: pData => {
        return {
            url: "/user/statistics",
            method: "GET",

        }
    },

    providesTags: ["admin"]
}),
    getAllOrdersOnStat: builder.query({
        query: pData => {
            return {
                url: "/all-orders-on-stat",
                method: "GET",

            }
        },

        providesTags: ["admin"]
    }),


        getProductsCountByMaterial: builder.query({
            query: pData => {
                return {
                    url: "/products/count-by-material",
                    method: "GET",

                }
            },
            transformResponse: data => data.data,
            providesTags: ["admin"]
        }),
        AddGalleryImages: builder.mutation({
            query: imageData=> {
                return {
                    url: `/add-image`,
                    method: "POST",
                    body: imageData
                }
            },
            transformResponse:data => data.result,
            invalidatesTags: ["admin"]
        }),
        deleteGalleryImage: builder.mutation({
            query: id=> {
                return {
                    url: `/delete-add-image/${id}`,
                    method: "DELETE",
                    // body: scrollCardData.fd
                }
            },
            transformResponse:data => data.result,
            invalidatesTags: ["admin"]
        }),
        updateScrollCard: builder.mutation({
            query: scrollCardData=> {
                return {
                    url: `/update-scroll-card/${scrollCardData._id}`,
                    method: "PUT",
                    body: scrollCardData.fd
                }
            },
            transformResponse:data => data.result,
            invalidatesTags: ["admin"]
        }),
        deleteScrollCard: builder.mutation({
            query: id=> {
                return {
                    url: `/delete-scroll-card/${id}`,
                    method: "DELETE",
                    // body: scrollCardData.fd
                }
            },
            transformResponse:data => data.result,
            invalidatesTags: ["admin"]
        }),
        addScrollCard: builder.mutation({
            query: scrollCardData=> {
                return {
                    url: `/add-scroll-card`,
                    method: "POST",
                    body: scrollCardData
                }
            },
            transformResponse:data => data.result,
            invalidatesTags: ["admin"]
        }),
        deleteMenuItem: builder.mutation({
            query: ({childId, menuId})=> {
                return {
                    url: `/delete-menu-item/${menuId}/${childId}`,
                    method: "DELETE",
                    // body: scrollCardData.fd
                }
            },
            transformResponse:data => data.result,
            invalidatesTags: ["admin"]
        }),
        addMenuItem: builder.mutation({
            query: menuData=> {
                return {
                    url: `add-menu-item`,
                    method: "POST",
                    body: menuData
                }
            },
            transformResponse:data => data.result,
            invalidatesTags: ["admin"]
        }),
        updateMenuItem: builder.mutation({
            query: menuData=> {
                return {
                    url: `/update-menu-item/${menuData._id}`,
                    method: "PUT",
                    body: menuData.fd
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

    //   useGetCompanyAddressQuery,
    useLazyGetCompanyAddressQuery,
    useUpdtaeCompanyAddressMutation,
    useUpdateTaxMutation,
    useGetAllProductsAdminQuery,

    // purity
    useGetAdminProductPurityQuery,
    useAddAdminProductPurityMutation,
    useUpdateAdminProductPurityMutation,
    useDeleteAdminProductPurityMutation,

    // material
    useGetAdminProductMaterialQuery,
    useAddAdminProductMaterialMutation,
    useUpdateAdminProductMaterialMutation,
    useDeleteAdminProductMaterialMutation,

    // type
    useGetAdminProductTypeQuery,
    useAddAdminProductTypeMutation,
    useUpdateAdminProductTypeMutation,
    useDeleteAdminProductTypeMutation,

    useGetAdminProductGeneralSettingsQuery,
    useGetUserStaticsQuery,
    useGetProductsCountByMaterialQuery,
    useGetAllOrdersOnStatQuery,

    // gallery
    useAddGalleryImagesMutation,
    useDeleteGalleryImageMutation,



    // mentor
    useAddScrollCardMutation,
    useUpdateScrollCardMutation,
    useDeleteScrollCardMutation,



    // nav menu
    useDeleteMenuItemMutation,
    useAddMenuItemMutation,
    useUpdateMenuItemMutation
} = adminApi
