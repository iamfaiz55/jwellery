import React, { useEffect, useState } from 'react'
import { useLazyGetCompanyAddressQuery, useUpdtaeCompanyAddressMutation } from '../../../../redux/apis/adminApi'
// import { useLazyGetCompanyAddressQuery, useUpdateCompanyLogoMutation } from '../../../../redux/apis/adminApi'

const Logo = () => {
    const [getAddresses, { data }] = useLazyGetCompanyAddressQuery()
    const [updateCompanyLogo, { isLoading, isSuccess }] = useUpdtaeCompanyAddressMutation()
    const [logo, setLogo] = useState(null)

    useEffect(() => {
        getAddresses()
    }, [getAddresses])

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const fd = new FormData()
        if (file) {
            setLogo(file)
        }
    }

    // Handle logo update
    const handleLogoUpdate = () => {
        if (logo) {
            const fd = new FormData()
            fd.append('images', logo)

            try {
                updateCompanyLogo({ ...data && data[0], fd })
            } catch (error) {
                console.error('Error updating logo', error)
            }
        }
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Logo Update Successfully", {
                style: { backgroundColor: 'white', color: 'blue', border: '1px solid blue' },
                icon: <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>,
                progressStyle: { backgroundColor: 'blue' }
            });
        }
    }, [isSuccess]);
    return (
        <div className='text-center'>
            {data && data[0] && (
                <div>
                    {/* Display current logo */}
                    <img src={data[0].logo} className='img-fluid' width={500} alt="Company Logo" />
                </div>
            )}

            {/* File input for selecting a new logo */}
            <div className="mt-3">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-control"
                />
            </div>

            {/* Update button */}
            <div className="mt-3">
                <button
                    className='btn btn-primary'
                    onClick={handleLogoUpdate}
                    disabled={isLoading || !logo} // Disable button while loading or if no file selected
                >
                    {isLoading ? 'Updating...' : 'Update Logo'}
                </button>
            </div>



        </div>
    )
}

export default Logo
