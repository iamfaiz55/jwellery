import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useAddAddressMutation, useGetAddressesQuery } from '../redux/apis/userApi';

const Profile = () => {
    const { user } = useSelector((state) => state.userData);
    const { data } = useGetAddressesQuery(user._id)

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="relative flex flex-col items-center rounded-2xl w-full max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto bg-white shadow-2xl p-6">
                <div className="mt-4 mb-8 w-full text-center">
                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                        Hi, {user && user.name}
                    </h4>
                </div>
                <div className="mb-5">
                    {/* <button type="button" class="btn "></button> */}
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn bg-gray-400" onClick={() => document.getElementById('add').showModal()}>Add Address</button>
                    <dialog id="add" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>

                            <Form />

                        </div>
                    </dialog>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

                    {
                        data && data.map(item => <div className="overflow-hidden group relative rounded-lg p-1 flex justify-center items-center">
                            <div className="hidden group-hover:block animate-gradient absolute top-0 left-0 w-full h-full bg-gradient-to-r from-zinc-900 via-gray-200/40 to-zinc-700 rounded-lg shadow-xl"></div>
                            <a
                                className="relative z-10 w-full bg-white p-6 sm:p-8 rounded-lg"
                                href="#"
                            >
                                <h3 className="text-xl font-bold text-gray-900">
                                    Home
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">house no.5-1-20 </p>
                                <p className="mt-2 text-sm text-gray-500">country  Indian </p>
                                <p className="mt-2 text-sm text-gray-500">State  Maharashtra </p>
                                <p className="mt-2 text-sm text-gray-500">Pincode  431001 </p>
                            </a>
                        </div>

                        )
                    }


                </div>
            </div>
        </div>
    );
};



const Form = ({ edit }) => {
    const { user } = useSelector((state) => state.userData);

    const [addAddress, { isSuccess, isLoading }] = useAddAddressMutation()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: edit || {
            pincode: "",
            houseNo: "",
            city: "",
            state: "",
            country: "",
            addressType: "",
            mobile: "",

        },
        validationSchema: yup.object({
            pincode: yup.string().required(),
            houseNo: yup.string().required("Enter houseNo"),
            city: yup.string().required("Enter city"),
            state: yup.string().required("Enter state"),
            country: yup.string().required("Enter country"),
            addressType: yup.string().required("Enter addressType"),
            mobile: yup.string().required("Enter mobile"),

        }),
        onSubmit: (values, { resetForm }) => {
            addAddress({ ...values, userId: user._id })
            console.log(values);

            resetForm();
        },
    });
    useEffect(() => {
        if (isSuccess) {
            toast.success("Address Add Success")
            document.getElementById("add").close()
            // btnRef.current.click()
        }
    }, [isSuccess])

    // let isLoading = false
    return <>
        {
            isLoading
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
                        <input {...formik.getFieldProps("houseNo")} type="text" placeholder="Type House No." className="input w-full my-2" />
                        <input {...formik.getFieldProps("state")} type="text" placeholder="Type State" className="input w-full my-2" />
                        <input {...formik.getFieldProps("city")} type="text" placeholder="Type City" className="input w-full my-2" />
                        <input {...formik.getFieldProps("pincode")} type="number" placeholder="Type pincode" className="input w-full my-2" />
                        <input {...formik.getFieldProps("country")} type="text" placeholder="Type Country" className="input w-full my-2" />
                        <input {...formik.getFieldProps("mobile")} type="number" placeholder="Type Mobile" className="input w-full my-2" />
                        {/* <input type="text" placeholder="Type here" className="input w-full my-2" /> */}
                        <select {...formik.getFieldProps("addressType")} className="select select-bordered w-full my-2">
                            <option selected >Select Address Type</option>
                            <option value="home">Home</option>
                            <option value="office">Office</option>
                        </select>
                        <div className="modal-action">
                            <button type="submit" className="btn bg-gray-400 text-black">
                                {edit ? "Update" : "Add"} Address
                            </button>
                            <button type="button" onClick={() => document.getElementById(edit ? "update" : "add").close()} className="btn">
                                Close
                            </button>
                        </div>
                    </form>
                </>
        }





    </>
}

export default Profile;
