import React, { useState } from 'react'
import { useGetScheduleQuery } from '../../../../redux/apis/publicApi';
import { useDeleteProductMutation, useGetAllProductsAdminQuery } from '../../../../redux/apis/adminApi';

const Schedule = () => {
    // const [logoutAdmin] = useLogoutAdminMutation()
    const [open, setOpen] = useState(false)
    const [editData, setEditData] = useState({})
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);
    const [selectedDate, setSelectedDate] = useState({});
    const { data: schedules } = useGetScheduleQuery()
    console.log(schedules);

    const { data, refetch, isError: isProdError, error: prodError } = useGetAllProductsAdminQuery()
    const [deleteProduct, { isSuccess: deleteSuccess, isError, error }] = useDeleteProductMutation()
    // console.log(data);\
    const [varients, setVarients] = useState()









    // console.log(varients);
    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (deleteSuccess) {
    //         toast.success("Product Delete Success")
    //         refetch()
    //     }
    // }, [deleteSuccess])
    // useEffect(() => {
    //     if (isProdError) {
    //         toast.error(prodError.data.message)
    //         // toast.error(JSON.stringify(prodError.status))

    //     }
    // }, [isProdError])
    // useEffect(() => {
    //     if (isProdError && prodError.status == 409) {
    //         // toast.error(prodError.data.message)
    //         logoutAdmin()

    //     }
    // }, [isProdError])
    return (
        <div>Schedule</div>
    )
}

export default Schedule