import React, { useEffect } from 'react'
import { useDisableMethodMutation, useGetAllPaymentMethodQuery, useUnableMethodMutation } from '../redux/apis/adminApi'
import { toast } from 'sonner'

const PaymentMethod = () => {
    const { data } = useGetAllPaymentMethodQuery()
    const [enable, { isSuccess }] = useUnableMethodMutation()
    const [disable, { isSuccess: disabledSuccess }] = useDisableMethodMutation()

    const handleUpdtae = (id, isActive) => {
        if (isActive) {
            disable(id)
        } else {
            enable(id)
        }
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Method Enable Success")
        }
    }, [isSuccess])
    useEffect(() => {
        if (disabledSuccess) {
            toast.success("Method Disabled Success")
        }
    }, [disabledSuccess])


    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-light-golden text-left text-sm text-gray-500">
                <thead className="bg-light-golden">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">#</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 hidden md:table-cell">Method</th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900 hidden md:table-cell">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {data && data.map((item, i) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {i + 1}
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <h1 className='text-2xl'>{item.method}</h1>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-warning"
                                    defaultChecked={item.active}
                                    onChange={e => handleUpdtae(item._id, item.active)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PaymentMethod
