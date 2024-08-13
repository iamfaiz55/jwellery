import React from 'react'
import { useGetAllUsersQuery } from '../redux/apis/adminApi'
import { toast } from 'sonner'

const AllUsers = () => {
    const { data, refetch } = useGetAllUsersQuery()

    // Mock function to simulate blocking a user
    const handleBlock = (userId) => {
        // Replace with your block user logic
        toast.success(`User ${userId} blocked`)
        refetch()
    }

    // Mock function to simulate editing a user
    const handleEdit = (user) => {
        // Replace with your edit user logic
        toast.success(`Edit user ${user.name}`)
    }

    return <div className='bg-light-golden h-screen '>
        <div className="overflow-x-auto shadow-md sm:rounded-lg  ">
            <div className='m-5 '>
                <table className="w-full text-sm text-left text-gray-500   border-spacing-2">
                    <thead className="text-xs text-gray-700 uppercase bg-light-golden">
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-light-golden uppercase border-b border-gray-600">
                            <th className="p-3 font-bold uppercase text-gray-600">#</th>
                            <th className="p-3 font-bold uppercase text-gray-600">Name</th>
                            <th className="p-3 font-bold uppercase text-gray-600">Email</th>
                            <th className="p-3 font-bold uppercase text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((user, i) => (
                                <tr key={user.email} className=" hover:bg-light-golden transition">
                                    <td className="p-3 text-gray-800 text-center border-b">{i + 1}</td>
                                    <td className="p-3 text-gray-800 text-center border-b">{user.name}</td>
                                    <td className="p-3 text-gray-800 text-center border-b">{user.email}</td>
                                    <td className="p-3 text-gray-800 text-center border-b">
                                        <button
                                            type="button"
                                            onClick={() => handleBlock(user.email)}
                                            className="btn bg-red-500 hover:bg-red-600 transition mr-2"
                                        >
                                            Block
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(user)}
                                            className="btn bg-green-300 hover:bg-green-400 transition"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}

export default AllUsers
