import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useGetAddressesQuery } from '../../redux/apis/userApi'
import { useLogoutUserMutation } from '../../redux/apis/userAuthApi'

const CustomerProtected = ({ compo }) => {
    const { error, isError } = useGetAddressesQuery()
    const [logout, { isSuccess }] = useLogoutUserMutation()
    console.log(error);

    useEffect(() => {
        if (error && error.status === 406) {
            logout()
        }
    }, [isError])

    const { user } = useSelector(state => state.user)
    return user ? compo : <Navigate to="/login" />
}

export default CustomerProtected