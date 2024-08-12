import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as  yup from 'yup'
// import { useRegisterAdminMutation } from '../redux/apis/adminAuthApi'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useLoginAdminMutation, useVerifyOTPMutation } from '../redux/apis/adminAuthApi'
import { useSelector } from 'react-redux'

const AdminLogin = () => {
    const [otpData, setOtpData] = useState()
    const btnRef = useRef()
    const { email } = useSelector(state => state.adminData)
    const [verify, { isSuccess: verified }] = useVerifyOTPMutation()
    const [loginAdmin, { isSuccess: sendSuccess, isLoading, isError, error }] = useLoginAdminMutation()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email().required("Enter Email"),
            password: yup.string().required("Enter Password"),
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(values);
            loginAdmin(values)
            resetForm()
        }
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (sendSuccess) {
            toast.success("OTP Sent Success")
            btnRef.current.click()
        }
    }, [sendSuccess])

    useEffect(() => {
        if (verified) {
            toast.success("User Login Success")
            navigate("/admin/dashboard")
            // btnRef()
        }
    }, [verified])
    useEffect(() => {
        if (isError) {
            toast.error(error)
        }
    }, [isError])
    return <>
        <button className=" btn hidden " ref={btnRef} onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button>
        {
            isLoading
                ? <>
                    {/* <!-- component --> */}
                    <div class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">

                        <div class="flex space-x-2 animate-pulse">
                            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                        </div>

                    </div>
                </>
                : <>
                    <div class="flex flex-col h-screen bg-gray-100">
                        <div class="grid place-items-center mx-2 my-20 sm:my-auto">



                            <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

                                <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                                    Admin Login
                                </h2>

                                <form class="mt-10" onSubmit={formik.handleSubmit}>
                                    <label for="email" class="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                                    <input {...formik.getFieldProps("email")} id="email" type="email" name="email" placeholder="e-mail address" autocomplete="email"
                                        class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                        required />

                                    <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                                    <input {...formik.getFieldProps("password")} id="password" type="password" name="password" placeholder="password" autocomplete="current-password"
                                        class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                                        required />

                                    <button type="submit"
                                        class="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none">
                                        Login
                                    </button>

                                    <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                                        <a href="#" class="flex-2 underline">
                                            Forgot password?
                                        </a>

                                        <p class="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                                            or
                                        </p>

                                        <Link to="/admin/register" class="flex-2 underline">
                                            Create an Account
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
        }







        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                {/* <label for="otp" class="block text-xs font-semibold text-gray-600 uppercase">E-mail</label> */}
                <input onChange={e => setOtpData(e.target.value)} id="otp" type="number" name="otp" placeholder="Enter Your OTP"
                    class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required />
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn bg-black text-white">Close</button>
                        <button onClick={e => verify({ otp: otpData, email: email.email })} className="btn bg-green-500">Verify</button>

                    </form>
                </div>
            </div>
        </dialog>
    </>
}

export default AdminLogin