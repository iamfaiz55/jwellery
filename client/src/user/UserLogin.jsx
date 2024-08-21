import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLoginUserMutation } from '../redux/apis/userAuthApi';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserLogin = () => {
    const [loginUser, { isSuccess, isLoading, isError, error }] = useLoginUserMutation();
    const navigate = useNavigate();

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
            loginUser(values);
            resetForm();
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("User Login Success");
            navigate("/");
        }
    }, [isSuccess]);

    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen p-5 bg-light-golden min-w-screen">
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            ) : (
                <motion.div
                    className="flex flex-col h-screen bg-light-golden"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="grid place-items-center mx-2 my-20 sm:my-auto mb-96 lg:mb-24">
                        <motion.div
                            className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg"
                            variants={containerVariants}
                        >
                            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                                User Login
                            </h2>

                            <form className="mt-10" onSubmit={formik.handleSubmit}>
                                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                                <input
                                    {...formik.getFieldProps("email")}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="e-mail address"
                                    autoComplete="email"
                                    className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-light-golden"
                                    required
                                />

                                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                                <input
                                    {...formik.getFieldProps("password")}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    autoComplete="current-password"
                                    className="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-light-golden"
                                    required
                                />

                                <motion.button
                                    type="submit"
                                    className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.button>

                                <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                                    <a href="#" className="flex-2 underline">
                                        Forgot password?
                                    </a>

                                    <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                                        or
                                    </p>

                                    <Link to="/user/register" className="flex-2 underline">
                                        Create an Account
                                    </Link>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default UserLogin;
