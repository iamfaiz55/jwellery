import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useLazyGetCompanyAddressQuery } from '../../redux/apis/adminApi'
import { useLogoutAdminMutation } from '../../redux/apis/adminAuthApi'

const AdminProtected = ({ compo }) => {
    const [logoutAdmin] = useLogoutAdminMutation()
    const { admin } = useSelector(state => state.admin)
    const [getData, { data, isError, error, }] = useLazyGetCompanyAddressQuery()
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        if (error && error.status === 409) {
            logoutAdmin()
            // getData()
        }
    }, [isError, admin])

    return admin ? compo : <Navigate to="/admin-login" />
}

export default AdminProtected