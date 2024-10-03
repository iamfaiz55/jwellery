import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLoginUserMutation, useVerifyOTPUserMutation } from '../redux/apis/userAuthApi';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const UserLogin = () => {
    const { mobile } = useSelector(state => state.userData)
    console.log(mobile);

    const [verify, { isSuccess }] = useVerifyOTPUserMutation()
    const [loginUser, { isSuccess: sendSuccess, isLoading, isError, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    const [otpData, setOtpData] = useState()

    const formik = useFormik({
        initialValues: {
            mobile: "",

        },
        validationSchema: yup.object({
            mobile: yup.string().email().required("Enter Email"),

        }),
        onSubmit: (values, { resetForm }) => {
            loginUser(values);
            console.log(values);

            resetForm();
        }
    });
    const btnRef = useRef()

    useEffect(() => {
        if (sendSuccess) {
            toast.success("OTP Sent Successfully")
            btnRef.current.click()
        }
    }, [sendSuccess])

    useEffect(() => {
        if (isSuccess) {
            toast.success("User Login Success");
            navigate("/");
        }
    }, [isSuccess]);
    useEffect(() => {
        if (isError) {
            toast.error(error.data.message);
            // navigate("/");
        }
    }, [isError]);

    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center  p-5 bg-light-golden ">
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            ) : (
                <motion.div
                    className="flex flex-col   bg-light-golden"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <button className="hidden" ref={btnRef} onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button>

                    <div className=" flex justify-center sm:mb-20  md:mb-24 ">
                        <motion.div
                            className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 mt-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg"
                            variants={containerVariants}
                        >
                            <h2 className=" text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                                User Login
                            </h2>
                            {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
                            <form className="mt-10" onSubmit={formik.handleSubmit}>
                                <label htmlFor="mobile" className="block text-xs font-semibold text-gray-600 uppercase">Mobile</label>
                                <input
                                    {...formik.getFieldProps("mobile")}
                                    id="mobile"
                                    type="number"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    // autoComplete="email"
                                    className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-light-golden"
                                    required
                                />

                                {/* <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label> */}
                                {/* <input
                                    {...formik.getFieldProps("password")}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    autoComplete="current-password"
                                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-light-golden"
                                    required
                                /> */}

                                <motion.button
                                    onClick={e => loginUser(formik.values)}
                                    type="submit"
                                    className=" w-full btn font-bold mt-5 bg-yellow-200 rounded-lg text2xl text-golden uppercase focus:outline-none hover:bg-golden hover:text-white hover:shadow-none"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.button>

                                <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                                    {/* <a href="#" className="flex-2 underline">
                                        Forgot password?
                                    </a> */}

                                    {/* <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                                        or
                                    </p> */}

                                    {/* <Link to="/user/register" className="flex-2 underline">
                                        Create an Account
                                    </Link> */}
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            )}



            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <input onChange={e => setOtpData(e.target.value)} id="otp" type="number" name="otp" placeholder="Enter Your OTP"
                        className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-golden-100 focus:text-gray-500 focus:outline-none focus:border-golden-200"
                        required />
                    <div className="modal-action">
                        <button className="btn bg-black text-white" onClick={e => document.getElementById("my_modal_1").close()}>Close</button>
                        <button onClick={() => verify({ otp: otpData, mobile: mobile })} className="btn bg-green-500">Verify</button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default UserLogin;
