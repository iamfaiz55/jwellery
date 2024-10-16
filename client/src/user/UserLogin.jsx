import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLoginUserMutation, useVerifyOTPUserMutation } from '../redux/apis/userAuthApi';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { usePostHistoryMutation } from '../redux/apis/openApi';

const UserLogin = () => {
    const { mobile } = useSelector(state => state.userData)
    // console.log(mobile);
    const { user } = useSelector(state => state.userData)
    const [postHistory] = usePostHistoryMutation()


    const [verify, { isSuccess }] = useVerifyOTPUserMutation()
    const [loginUser, { isSuccess: sendSuccess, isLoading, isError, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    const [otpData, setOtpData] = useState()

    const formik = useFormik({
        initialValues: {
            mobile: "",

        },
        validationSchema: yup.object({
            mobile: yup.string().required("Enter Mobile Number"),

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
            postHistory({ userId: user._id, type: "login" })
            navigate("/");
        }
    }, [isSuccess]);


    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    useEffect(() => {
        const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isSystemDark) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);
    return (
        <>

            {isLoading ? (
                <div className="flex items-center justify-center p-5 bg-light-golden dark:bg-gray-800">
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            ) : (
                <motion.div
                    className="flex flex-col pb-14 bg-light-golden dark:bg-gray-900"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <button className="hidden" ref={btnRef} onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button>

                    <div className="flex justify-center sm:mb-20 md:mb-24">
                        <motion.div
                            className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 mt-10 sm:px-10 sm:py-6 bg-white dark:bg-gray-800 rounded-lg shadow-md lg:shadow-lg"
                            variants={containerVariants}
                        >
                            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800 dark:text-white">
                                User Login
                            </h2>

                            <form className="mt-10" onSubmit={formik.handleSubmit}>
                                <label htmlFor="mobile" className="block text-xs font-semibold text-gray-600 uppercase dark:text-gray-300">Mobile</label>
                                <input
                                    {...formik.getFieldProps("mobile")}
                                    id="mobile"
                                    type="number"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    className="block w-full py-3 px-1 text-sm md:text-2xl  mt-2 bg-light-golden dark:bg-gray-400 text-gray-900 rounded-lg dark:text-gray-200 appearance-none border-b-2 border-gray-100 dark:border-gray-600 focus:text-gray-500 focus:outline-none focus:border-light-golden dark:focus:border-gray-400
    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
    [-moz-appearance:textfield]"
                                    required
                                />


                                <motion.button
                                    onClick={e => loginUser(formik.values)}
                                    type="submit"
                                    className="w-full btn font-bold mt-5 bg-yellow-200 dark:bg-gray-700 dark:text-white rounded-lg text-2xl uppercase focus:outline-none hover:bg-yellow-500 dark:hover:bg-gray-600"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            )}

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box dark:bg-gray-700 dark:text-white">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <input
                        onChange={e => setOtpData(e.target.value)}
                        id="otp"
                        type="number"
                        name="otp"
                        placeholder="Enter Your OTP"
                        className="block w-full py-3 px-1 mt-2 text-gray-800 dark:text-gray-200 appearance-none border-b-2 border-golden-100 dark:border-gray-600 focus:text-gray-500 dark:focus:text-gray-300 focus:outline-none focus:border-golden-200 dark:focus:border-gray-400"
                        required
                    />
                    <div className="modal-action">
                        <button className="btn bg-black dark:bg-gray-600 text-white" onClick={e => document.getElementById("my_modal_1").close()}>Close</button>
                        <button onClick={() => verify({ otp: otpData, mobile })} className="btn bg-green-500 dark:bg-green-600">Verify</button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default UserLogin;
