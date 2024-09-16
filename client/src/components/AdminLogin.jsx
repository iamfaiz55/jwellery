import React, { useEffect, useRef, useState } from 'react'
import { json, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useLoginAdminMutation, useVerifyOTPMutation } from '../redux/apis/adminAuthApi'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const AdminLogin = () => {
    const [otpData, setOtpData] = useState()
    const btnRef = useRef()
    const { email } = useSelector(state => state.adminData)
    const [verify, { isSuccess: verified, error: verifyError }] = useVerifyOTPMutation()

    const [loginAdmin, { isSuccess: sendSuccess, isLoading, isError, error }] = useLoginAdminMutation()
    console.log(error && error.data.message);
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
            loginAdmin(values)
            resetForm()
        }
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (sendSuccess) {
            toast.success("OTP Sent Successfully")
            btnRef.current.click()
        }
    }, [sendSuccess])

    useEffect(() => {
        if (verified) {
            toast.success("User Login Successful")
            navigate("/admin/dashboard")
        }
    }, [verified])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message)
        }
    }, [isError])

    return <>
        <button className="hidden" ref={btnRef} onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button>
        {
            isLoading
                ? <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
                : <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-screen bg-light-golden"
                >
                    <div className="grid place-items-center mx-2 my-20 sm:my-auto">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg"
                        >
                            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-golden-800">
                                Admin Login
                            </h2>
                            <form className="mt-10" onSubmit={formik.handleSubmit}>
                                <label htmlFor="email" className="block text-xs font-semibold text-golden-600 uppercase">E-mail</label>
                                <input {...formik.getFieldProps("email")} id="email" type="email" name="email" placeholder="e-mail address" autoComplete="email"
                                    className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-golden-100 focus:text-gray-500 focus:outline-none focus:border-golden-200"
                                    required />

                                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-golden-600 uppercase">Password</label>
                                <input {...formik.getFieldProps("password")} id="password" type="password" name="password" placeholder="password" autoComplete="current-password"
                                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-golden-100 focus:text-gray-500 focus:outline-none focus:border-golden-200"
                                    required />

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    type="submit"
                                    className="w-full py-3 mt-10 bg-golden rounded-sm font-medium text-black uppercase focus:outline-none hover:bg-golden-700 hover:shadow-none"
                                >
                                    Login
                                </motion.button>

                                <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                                    <a href="#" className="flex-2 underline">
                                        Forgot password?
                                    </a>

                                    <p className="flex-1 text-golden-500 text-md mx-4 my-1 sm:my-auto">
                                        or
                                    </p>

                                    <Link to="/admin/register" className="flex-2 underline">
                                        Create an Account
                                    </Link>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
        }

        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <input onChange={e => setOtpData(e.target.value)} id="otp" type="number" name="otp" placeholder="Enter Your OTP"
                    className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-golden-100 focus:text-gray-500 focus:outline-none focus:border-golden-200"
                    required />
                <div className="modal-action">
                    <button className="btn bg-black text-white" onClick={e => document.getElementById("my_modal_1").close()}>Close</button>
                    <button onClick={() => verify({ otp: otpData, email: email.email })} className="btn bg-green-500">Verify</button>
                </div>
            </div>
        </dialog>
    </>
}

export default AdminLogin
