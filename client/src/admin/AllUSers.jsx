import React, { useEffect } from 'react';
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from '../redux/apis/adminApi';
import { toast } from 'sonner';
// import { useblock } from '../App';

const AllUsers = () => {
    // const { block, setBlock } = useblock()
    const { data, refetch } = useGetAllUsersQuery();
    const [blockUser, { isSuccess, data: blockData }] = useBlockUserMutation();
    const [unblockUser, { isSuccess: unblocked, data: unblockData }] = useUnblockUserMutation();
    // console.log(blockData, unblockData);

    useEffect(() => {
        if (isSuccess) {
            toast.success('User Blocked Successfully');
            // setBlock(true)
            refetch();
        }
    }, [isSuccess, refetch]);

    useEffect(() => {
        if (unblocked) {
            toast.success('User Unblocked Successfully');
            refetch();
            // setBlock(false)
        }
    }, [unblocked, refetch]);

    return (
        <div className='bg-light-golden h-screen'>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className='m-5'>
                    <table className="w-full text-sm text-left text-gray-500 border-spacing-2">
                        <thead className="text-xs text-gray-700 uppercase bg-light-golden">
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-light-golden uppercase border-b border-gray-600">
                                <th className="p-3 font-bold uppercase text-gray-600">#</th>
                                <th className="p-3 font-bold uppercase text-gray-600">Name</th>
                                <th className="p-3 font-bold uppercase text-gray-600">Email</th>
                                <th className="p-3 font-bold uppercase text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((user, i) => (
                                <tr key={user.email} className="hover:bg-light-golden transition">
                                    <td className="p-3 text-gray-800 text-center border-b">{i + 1}</td>
                                    <td className="p-3 text-gray-800 text-center border-b">{user.name}</td>
                                    <td className="p-3 text-gray-800 text-center border-b">{user.email}</td>
                                    <td className="p-3 text-gray-800 text-center border-b">
                                        {user.isBlock
                                            ? <>
                                                <button
                                                    type="button"
                                                    onClick={e => unblockUser(user._id)}
                                                    className="btn bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition mr-2"
                                                >
                                                    Unblock
                                                </button>
                                            </>
                                            : <>
                                                <button
                                                    type="button"
                                                    onClick={e => blockUser(user._id)}
                                                    className="btn bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition mr-2"
                                                >
                                                    Block
                                                </button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
