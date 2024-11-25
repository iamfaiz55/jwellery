import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useGetAddressesQuery, useGetAllCartItemsQuery } from '../../redux/apis/userApi'
import { useLogoutUserMutation } from '../../redux/apis/userAuthApi'

const CustomerProtected = ({ compo }) => {
    // const { error, isError } = useGetAddressesQuery()
    // useSelector()
    const { user } = useSelector(state => state.user)
    console.log(user);

    const { error, isError } = useGetAllCartItemsQuery(user && user._id)
    const [logout, { isSuccess }] = useLogoutUserMutation()
    console.log(error);

    useEffect(() => {
        if (error && error.status === 409) {
            logout()
        }
    }, [isError])

    return user ? compo : <Navigate to="/login" />
}

export default CustomerProtected