import React, { useEffect, useState } from 'react'
import { useLazyGetCompanyAddressQuery, useUpdateTaxMutation, useUpdtaeCompanyAddressMutation } from '../redux/apis/adminApi'
import { toast } from 'sonner'
import { useLazyGetTaxesQuery } from '../redux/apis/openApi'

const CompanyAddress = () => {
    const [getAddresses, { data }] = useLazyGetCompanyAddressQuery()
    // console.log(data);
    const [getTax, { data: taxes }] = useLazyGetTaxesQuery()


    const [updateTax, { isSuccess: taxUpdateSuccess }] = useUpdateTaxMutation()
    const [updateAddress, { isSuccess, isLoading }] = useUpdtaeCompanyAddressMutation()
    const [addressData, setAddressData] = useState({})
    const [taxData, setTaxData] = useState({})

    useEffect(() => {
        if (isSuccess) {
            toast.success("Address Update Success")
            location.reload()
            setAddressData({})
            document.getElementById("edit").close()
        }
    }, [isSuccess])
    useEffect(() => {
        if (taxUpdateSuccess) {
            toast.success("Tax Update Success")
            // location.reload()
            setTaxData({})
            document.getElementById("editTax").close()
        }
    }, [taxUpdateSuccess])

    useEffect(() => {
        getTax()
        getAddresses()
    }, [isSuccess, taxUpdateSuccess])
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            {/* Table for larger screens */}
            <div className="hidden md:block">
                <table className="w-full border-collapse bg-light-golden text-left text-sm text-gray-500">
                    <thead className="bg-yellow-50 ">
                        <tr>
                            <th scope="col" className="px-6 font-bold py-4  text-gray-900">Building No</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">City</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">State</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">Country</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">Pincode</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">GST No</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {data && data.map(item => (
                            <tr key={item._id} className="hover:bg-gray-50 ">
                                <td className="px-6 py-4 text-gray-900">{item.buildingNo}</td>
                                <td className="px-6 py-4 text-gray-900">{item.city}</td>
                                <td className="px-6 py-4 text-gray-900">{item.state}</td>
                                <td className="px-6 py-4 text-gray-900">{item.country}</td>
                                <td className="px-6 py-4 text-gray-900">{item.pincode}</td>
                                <td className="px-6 py-4 text-gray-900">{item.gst}</td>
                                <td className="px-6 py-4 text-gray-900">
                                    <button onClick={e => {
                                        setAddressData(item)
                                        document.getElementById('edit').showModal()
                                    }} className="text-blue-600 hover:text-blue-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* yaha taxes print karna hai */}
            <div className='text-center m-5 '>
                <h1 className='text-3xl font-bold'>Taxes And Charges</h1>
            </div>
            <div className="">
                <table className="w-full border-collapse bg-light-golden text-left text-sm text-gray-500">
                    <thead className="bg-yellow-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">No.</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">Name</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">Percents</th>
                            <th scope="col" className="px-6 py-4 font-bold text-gray-900">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {taxes && taxes.map((item, i) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-900">{i + 1}</td>
                                <td className="px-6 py-4 text-gray-900">{item.taxName}</td>
                                <td className="px-6 py-4 text-gray-900">{item.percent}%</td>

                                <td className="px-6 py-4 text-gray-900">
                                    <button onClick={e => {
                                        setTaxData(item)
                                        document.getElementById('editTax').showModal()
                                    }} className="text-blue-600 hover:text-blue-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card layout for small screens */}
            <div className="md:hidden mt-5">
                {data && data.map(item => (
                    <div key={item._id} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-light-golden">
                        <div className="mb-2 font-medium text-gray-900">Building No: {item.buildingNo}</div>
                        <div className="mb-2 text-gray-700">City: {item.city}</div>
                        <div className="mb-2 text-gray-700">State: {item.state}</div>
                        <div className="mb-2 text-gray-700">Country: {item.country}</div>
                        <div className="mb-2 text-gray-700">Pincode: {item.pincode}</div>
                        <div className="mb-2 text-gray-700">GST No: {item.gst}</div>
                        <button onClick={e => {
                            setAddressData(item)
                            document.getElementById('edit').showModal()
                        }} className="text-blue-600 hover:text-blue-900">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <dialog id="edit" className="modal">
                <div className="modal-box bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-bold text-xl text-yellow-600">Edit Address</h3>

                    <div>
                        <div className="mb-4">
                            <label htmlFor="buildingNo" className="block text-gray-700 m-1">Building No:</label>
                            <input type="text"
                                onChange={e => setAddressData({ ...addressData, buildingNo: e.target.value })}
                                id="buildingNo"
                                value={addressData.buildingNo}
                                name="buildingNo"
                                className="input w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="city" className="block text-gray-700">City:</label>
                            <input type="text"
                                onChange={e => setAddressData({ ...addressData, city: e.target.value })}
                                id="city"
                                value={addressData.city}
                                name="city"
                                className="input w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="state" className="block text-gray-700">State:</label>
                            <input type="text"
                                onChange={e => setAddressData({ ...addressData, state: e.target.value })}
                                id="state"
                                name="state"
                                value={addressData.state}
                                className="input w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="country" className="block text-gray-700">Country:</label>
                            <input type="text"
                                onChange={e => setAddressData({ ...addressData, country: e.target.value })}
                                id="country"
                                name="country"
                                value={addressData.country}
                                className="input w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="pincode" className="block text-gray-700">Pincode:</label>
                            <input type="text"
                                onChange={e => setAddressData({ ...addressData, pincode: e.target.value })}
                                id="pincode"
                                value={addressData.pincode}
                                name="pincode"
                                className="input w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gst" className="block text-gray-700">GST No:</label>
                            <input type="text"
                                onChange={e => setAddressData({ ...addressData, gst: e.target.value })}
                                id="gst"
                                name="gst"
                                value={addressData.gst}
                                className="input w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>
                        <button onClick={e => updateAddress(addressData)} className="bg-yellow-500 my-5 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">Update</button>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="editTax" className="modal">
                <div className="modal-box bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-bold text-xl text-yellow-600">Edit Taxes</h3>

                    <div>
                        {/* <div className="mb-4">
                            <label htmlFor="taxname" className="block text-gray-700 m-1">Tax Name</label>
                            <input type="text"
                                onChange={e => setTaxData({ ...taxData, taxName: e.target.value })}
                                id="taxName"
                                value={taxData.taxName}
                                name="taxName"
                                className="input w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div> */}
                        <div className="mb-4">
                            <label htmlFor="city" className="block text-gray-700">Percent Of Tax</label>
                            <input type="text"
                                onChange={e => setTaxData({ ...taxData, percent: e.target.value })}
                                id="city"
                                value={taxData.percent}
                                name="percent"
                                className="input w-full bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>

                        <button onClick={e => updateTax(taxData)} className="bg-yellow-500 my-5 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">Update</button>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default CompanyAddress
