import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAddProductMutation, useDeleteProductMutation, useGetAllProductsAdminQuery, useUpdateProdMutation } from '../redux/apis/adminApi'
import { useGetAllProductsQuery } from '../redux/apis/openApi'
// import { useGetAllProductsQuery } from '../redux/apis/userApi'

const Dashboard = () => {
  const [editData, setEditData] = useState({})
  const { data, refetch, isError: isProdError, error: prodError } = useGetAllProductsAdminQuery()
  const [deleteProduct, { isSuccess: deleteSuccess, isError, error }] = useDeleteProductMutation()
  console.log(data);


  const navigate = useNavigate()
  // useEffect(() => {
  //   is
  // }, [isProdError])


  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Product Delete Success")
    }
  }, [deleteSuccess])
  useEffect(() => {
    if (isError) {
      toast.error(error)
    }
  }, [isError])


  return <div className='bg-light-golden'>
    <div className="flex justify-end">
      <button
        onClick={() => document.getElementById('add').showModal()}
        className="btn bg-amber-400 hover:bg-golden mr-5 transition"
      >
        Add Product
      </button>

      {/* Add Modal */}
      <dialog id="add" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Product</h3>
          <Form refetch={refetch} />
        </div>
      </dialog>
      {/* Add Modal End */}
    </div>

    {/* Product Table and Card Display */}
    <div className="hidden sm:block overflow-x-auto shadow-md sm:rounded-lg m-5">
      {/* Table View */}
      <table className="w-full text-sm text-left text-gray-500 border-spacing-2">
        <thead className="text-xs text-gray-700 uppercase bg-light-golden">
          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-light-golden uppercase border-b border-gray-600">
            <th className="p-3 font-bold uppercase text-gray-600">#</th>
            <th className="p-3 font-bold uppercase text-gray-600">Name</th>
            <th className="p-3 font-bold uppercase text-gray-600">Image</th>
            <th className="p-3 font-bold uppercase text-gray-600">Description</th>
            <th className="p-3 font-bold uppercase text-gray-600">Price</th>
            <th className="p-3 font-bold uppercase text-gray-600">MRP</th>
            <th className="p-3 font-bold uppercase text-gray-600">Discount</th>
            <th className="p-3 font-bold uppercase text-gray-600">Width</th>
            <th className="p-3 font-bold uppercase text-gray-600">Weight</th>
            <th className="p-3 font-bold uppercase text-gray-600">Material</th>
            <th className="p-3 font-bold uppercase text-gray-600">Type</th>
            <th className="p-3 font-bold uppercase text-gray-600">Height</th>
            <th className="p-3 font-bold uppercase text-gray-600">Purity</th>
            <th className="p-3 font-bold uppercase text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.map((item, i) => {
              if (item.isDelete === false) {
                return (
                  <tr key={item._id} className="bg-light-golden hover:bg-white transition">
                    <td className="p-3 text-gray-800 text-center border-b">{i + 1}</td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.name}</td>
                    <td className="p-3 text-gray-800 text-center border-b">
                      <div className="text-center">
                        <img src={item.image} height={50} width={50} alt={item.name} className="rounded-md shadow-sm" />
                      </div>
                    </td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.desc}</td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.price}</td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.mrp}</td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.discount}</td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.width}</td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.prductWeight}</td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.material}</td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.productType}</td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.height}</td>
                    <td className="p-3 text-gray-800 text-center border-b">{item.purity}</td>
                    <td className="p-3 text-gray-800 text-center border-b">
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById('update').showModal();
                          setEditData(item);
                        }}
                        className="btn bg-green-300 hover:bg-green-400 transition"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteProduct(item._id)}
                        className="btn bg-red-500 hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }
            })
          }
        </tbody>
      </table>
    </div>

    <div className="sm:hidden grid grid-cols-1 gap-4 m-5">
      {/* Card View */}
      {data && data.map((item) => {
        if (item.isDelete === false) {
          return (
            <div key={item._id} className="bg-light-golden p-4 rounded-lg shadow-md">
              <div className="text-center">
                <img src={item.image} height={100} width={100} alt={item.name} className="rounded-md mb-2" />
              </div>
              <h4 className="text-lg font-bold mb-2">{item.name}</h4>
              <p className="mb-2">Description: {item.desc}</p>
              <p className="mb-2">Price: {item.price}</p>
              <p className="mb-2">MRP: {item.mrp}</p>
              <p className="mb-2">Discount: {item.discount}</p>
              <p className="mb-2">Width: {item.width}</p>
              <p className="mb-2">Weight: {item.prductWeight}</p>
              <p className="mb-2">Material: {item.material}</p>
              <p className="mb-2">Type: {item.productType}</p>
              <p className="mb-2">Height: {item.height}</p>
              <p className="mb-2">Purity: {item.purity}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => {
                    document.getElementById('update').showModal();
                    setEditData(item);
                  }}
                  className="btn bg-green-300 hover:bg-green-400 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="btn bg-red-500 hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>

    {/* Update Modal */}
    <dialog id="update" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Product</h3>
        <Form edit={editData} refetch={refetch} />
      </div>
    </dialog>
    {/* Update Modal End */}
  </div>
}

const Form = ({ edit, refetch }) => {
  // console.log(edit);
  const [addProd, { isSuccess, isLoading, isError, error }] = useAddProductMutation()
  const [updateProd, { isSuccess: updateSuccess, isLoading: updateLoad }] = useUpdateProdMutation()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: edit || {
      name: "",
      mrp: "",
      image: "",
      price: "",
      discount: "",
      height: "",
      width: "",
      prductWeight: "",
      material: "",
      productType: "",
      desc: "",
      purity: "",
      rating: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      mrp: yup.string().required("Enter mrp"),
      image: yup.string().required("Enter Image"),
      price: yup.string().required("Enter price"),
      discount: yup.string().required("Enter discount"),
      height: yup.string().required("Enter height"),
      width: yup.string().required("Enter width"),
      prductWeight: yup.string().required("Enter prductWeight"),
      material: yup.string().required("Enter material"),
      productType: yup.string().required("Enter productType"),
      desc: yup.string().required("Enter desc"),
      purity: yup.string().required("Enter purity"),
      rating: yup.number().required("Enter Rating"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const fd = new FormData();
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          fd.append(key, values[key]);
        }
      }
      if (edit) {
        updateProd({ ...edit, fd });
      } else {
        addProd(fd)

      }
      resetForm();
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product Add Success")
      document.getElementById("add").close()
      refetch()
      // btnRef.current.click()
    }
  }, [isSuccess])
  useEffect(() => {
    if (isError) {
      toast.error(error)
    }
  }, [isError])

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Product Updtae Success")
      document.getElementById("update").close()
      refetch()
    }
  }, [updateSuccess])
  return <div className=''>
    {
      isLoading || updateLoad
        ? <>
          <div class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">

            <div class="flex space-x-2 animate-pulse">
              <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>

          </div>
        </>
        : <>
          <form onSubmit={formik.handleSubmit}>

            {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
            <input {...formik.getFieldProps("name")} type="text" placeholder="Type name" className="input
     input-bordered w-full  my-2 " />
            {/* <input {...formik.getFieldProps("image")} type="file" placeholder="Type image" className="input
     input-bordered w-full  my-2 " /> */}
            <input
              type="file"
              onChange={e => {
                formik.setFieldValue("image", e.currentTarget.files[0]);
              }}
              placeholder="Select Image"
              className="file-input file-input-bordered w-full"
            />

            <input {...formik.getFieldProps("price")} type="number" placeholder="Type price" className="input
     input-bordered w-full  my-2 " />
            <input {...formik.getFieldProps("mrp")} type="number" placeholder="Type mrp" className="input
     input-bordered w-full  my-2 " />
            <input {...formik.getFieldProps("discount")} type="text" placeholder="Type discount" className="input
     input-bordered w-full  my-2 " />
            <input {...formik.getFieldProps("rating")} type="text" placeholder="Type Rating" className="input
     input-bordered w-full  my-2 " />
            <input {...formik.getFieldProps("height")} type="text" placeholder="Type height" className="input
     input-bordered w-full  my-2 " />
            <input {...formik.getFieldProps("width")} type="text" placeholder="Type width" className="input
     input-bordered w-full  my-2 " />
            <input {...formik.getFieldProps("prductWeight")} type="text" placeholder="Type Weight" className="input
     input-bordered w-full  my-2" />
            {/* < input type="text" placeholder="Type material" className="input
     input-bordered w-full  my-2 " /> */}
            <select {...formik.getFieldProps("material")} className="select select-bordered w-full my-2">
              <option selected>Choose The Material</option>
              <option value={"gold"}>Gold</option>
              <option value={"diamond"}>Diamond</option>
              <option value={"bronz"}>Bronz</option>
              <option value={"white-gold"}>White-Gold</option>
              <option value={"rose-gold"}>Rose-Gold</option>
              <option value={"platinum"}>Platinum</option>
            </select>


            <select  {...formik.getFieldProps("productType")} className="select select-bordered w-full my-2">
              <option selected>Choose The Typo Of Product</option>
              <option value={"rings"}>
                Rings
              </option>
              <option value={"earings"}>
                Earings
              </option>
              <option value={"necklace"}>Necklaces</option>
              <option value={"mangalsutra"}>mangalsutra</option>
              <option value={"chain"}>chain</option>
              <option value={"pendent"}>Pendent</option>
              <option value={"nose-pin"}>Nose-Pin</option>
              <option value={"bangles"}>Bangles</option>
              <option value={"forehead-ornament"}>Forehead-Ornament</option>
              <option value={"anklet"}>Anklets</option>
              <option value={"coins"}>Coints</option>
            </select>


            < input {...formik.getFieldProps("desc")} type="text" placeholder="Type Description" className="input
     input-bordered w-full  my-2 " />
            <select {...formik.getFieldProps("purity")} className="select select-bordered w-full my-2">
              <option value="">Select Purity</option>
              <option value="24">24k</option>
              <option value="18">18k</option>
            </select>
            <div className="modal-action">
              <button type="submit" className="btn bg-gray-400 text-black">
                {edit ? "Update" : "Add"} Product
              </button>
              <button type="button" onClick={() => document.getElementById(edit ? "update" : "add").close()} className="btn">
                Close
              </button>
            </div>
          </form>
        </>
    }





  </div>
}



export default Dashboard