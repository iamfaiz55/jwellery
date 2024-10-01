import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useRegisterUserMutation } from '../redux/apis/userAuthApi';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const UserRegister = () => {
    const [registerUser, { isSuccess, isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            email: yup.string().email().required("Enter Email"),
            password: yup.string().required("Enter Password"),
        }),
        onSubmit: (values, { resetForm }) => {
            registerUser(values);
            resetForm();
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("User Register Success");
            navigate("/user/login");
        }
    }, [isSuccess]);

    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            <motion.div
                className="flex flex-col  bg-light-golden"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="grid place-items-center mx-2 sm:my-auto mb-20 sm:mb-0">
                    <motion.div
                        className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg"
                        variants={containerVariants}
                    >
                        <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                            User Register
                        </h2>

                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="name" className="block text-xs font-semibold text-gray-600 uppercase">Name</label>
                            <input
                                {...formik.getFieldProps("name")}
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter Your Name"
                                className="rounded-md my-2 block w-full py-3 px-1 mt-2 text-gray-200 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-light-golden"
                            />

                            <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                {...formik.getFieldProps("email")}
                                placeholder="e-mail address"
                                autoComplete="email"
                                className="rounded-md my-2 block w-full py-3 px-1 mt-2 text-gray-200 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-light-golden"
                            />

                            <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                            <input
                                {...formik.getFieldProps("password")}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="password"
                                autoComplete="current-password"
                                className="rounded-md my-2 block w-full py-3 px-1 mt-2 mb-4 text-gray-200 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-light-golden"
                                required
                            />

                            <motion.button
                                type="submit"
                                className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Register
                            </motion.button>

                            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                                <a href="#" className="flex-2 underline">
                                    Forgot password?
                                </a>

                                <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                                    or
                                </p>

                                <Link to="/user/login" className="flex-2 underline">
                                    Already Have Account
                                </Link>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default UserRegister;
