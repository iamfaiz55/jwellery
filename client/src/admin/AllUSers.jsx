import React, { useEffect } from 'react';
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from '../redux/apis/adminApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
    const navigate = useNavigate()
    const { data, refetch } = useGetAllUsersQuery();
    const [blockUser, { isSuccess }] = useBlockUserMutation();
    const [unblockUser, { isSuccess: unblocked }] = useUnblockUserMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success('User Blocked Successfully');
            refetch();
        }
    }, [isSuccess, refetch]);

    useEffect(() => {
        if (unblocked) {
            toast.success('User Unblocked Successfully');
            refetch();
        }
    }, [unblocked, refetch]);

    return (
        <div className='bg-light-golden p-5 dark:bg-gray-900'>
            {/* Table for md and lg screens */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg hidden md:block">
                <div className='m-5'>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300 border-spacing-2">
                        <thead className="text-xs text-gray-700 uppercase bg-light-golden dark:bg-gray-800">
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-light-golden dark:text-gray-200 dark:bg-gray-800 border-b border-gray-600">
                                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">#</th>
                                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Mobile</th>
                                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((user, i) => (
                                <tr key={user.email} className="hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                                    <td className="p-3 text-gray-800 dark:text-gray-300 border-b">{i + 1}</td>
                                    <td className="p-3 text-gray-800 dark:text-gray-300 border-b">{user.mobile}</td>
                                    <td className="p-3 text-gray-800 dark:text-gray-300 border-b">
                                        {user.isBlock
                                            ? <button
                                                type="button"
                                                onClick={() => unblockUser(user._id)}
                                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition mr-2"
                                            >
                                                Unblock
                                            </button>
                                            : <button
                                                type="button"
                                                onClick={() => blockUser(user._id)}
                                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition mr-2"
                                            >
                                                Block
                                            </button>
                                        }
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/admin/get-history/${user._id}`)}
                                            className="btn bg-green-400 text-black"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Cards for small screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">
                {data && data.map((user, i) => (
                    <div key={user.email} className="bg-white p-5 rounded-lg shadow hover:bg-light-golden dark:bg-gray-800 dark:text-gray-300 transition">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-600 dark:text-gray-300">#{i + 1}</span>
                            <span className="text-gray-800 dark:text-gray-300">{user.name}</span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-300 mb-4">{user.email}</p>
                        <div className="flex justify-between">
                            {user.isBlock ? (
                                <button
                                    type="button"
                                    onClick={() => unblockUser(user._id)}
                                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                                >
                                    Unblock
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => blockUser(user._id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                                >
                                    Block
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => navigate(`/admin/get-history/${user._id}`)}
                                className="btn bg-green-400 text-black"
                            >
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AllUsers;
