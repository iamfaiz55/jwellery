import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const CustomerProtected = ({ compo }) => {
    const { user } = useSelector(state => state.user)
    return user ? compo : <Navigate to="/login" />
}

export default CustomerProtected