// import React from 'react'

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Modal, Button, Table } from 'react-bootstrap';



// import { useGetAllOrdersQuery, useUpdateStatusMutation } from '../../../redux/apis/adminApi';
import { toast } from 'react-toastify';
// import Apex from '../../Apex/Apex';
import { useGetAllOrdersQuery, useUpdateStatusMutation } from '../../../../redux/apis/adminApi';

const AllOrders = () => {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const [statusData, setStatusData] = useState({})
    const [updateStatus, { isSuccess }] = useUpdateStatusMutation()
    const { data: orders } = useGetAllOrdersQuery();
    console.log(orders);
    useEffect(() => {
        if (isSuccess) {
            toast.success("Status Update Success")
            setShow(false)
            // document.getElementById("edit").close()
        }
    }, [isSuccess])
    return <>
        <div className="container my-4">
            <h3 className="mb-3">All Orders</h3>

            {orders && orders.length > 0 ? (
                <Table striped hover responsive="sm">
                    <thead className="table-primary">
                        <tr>
                            <th>Product Name</th>
                            <th className="d-none d-md-table-cell">User Name</th>
                            <th className="d-none d-md-table-cell">Status</th>
                            <th className="d-md-none">Price & Action</th>
                            <th className="d-none d-md-table-cell">Price</th>
                            <th className="d-none d-md-table-cell">Address</th>
                            <th className="d-none d-md-table-cell">Payment Method</th>
                            <th className="d-none d-md-table-cell">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>
                                    {order.orderItems.map(item => (
                                        <div key={item._id}>
                                            <div className="font-weight-bold text-primary">{item.productId?.name}</div>
                                            <div className="text-muted">Qty: {item.quantity}</div>
                                        </div>
                                    ))}
                                </td>
                                <td className="d-none d-md-table-cell">
                                    <div className="font-weight-bold text-primary">{order.userId?.mobile}</div>
                                </td>
                                <td className="d-none d-md-table-cell">
                                    <span className={`badge ${order.status === 'cancelled' ? 'badge-danger' : 'badge-success'} text-black`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="d-md-none">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="font-weight-bold">₹{order.total}</span>
                                        <Button variant="link" size="sm" onClick={() => {
                                            setShow(true);
                                            setStatusData({ ...statusData, orderId: order._id });
                                        }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </div>
                                </td>
                                <td className="d-none d-md-table-cell">₹{order.total}</td>
                                <td className="d-none d-md-table-cell">
                                    <div className="text-muted">
                                        <div>{order.deliveryAddressId?.addressType}</div>
                                        <div>{order.deliveryAddressId?.city}, {order.deliveryAddressId?.state}</div>
                                        <div>{order.deliveryAddressId?.country} - {order.deliveryAddressId?.pincode}</div>
                                        <div>Mobile: {order.deliveryAddressId?.mobile}</div>
                                    </div>
                                </td>
                                <td className="d-none d-md-table-cell">{order.paymentMethod}</td>
                                <td className="d-none d-md-table-cell">
                                    <Button variant="primary" size="sm" onClick={() => {
                                        setShow(true);
                                        setStatusData({ ...statusData, orderId: order._id });
                                    }}>
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">No orders available.</Alert>
            )}

            {/* Modal for updating order status */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Order Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body">
                        <select
                            onChange={(e) => setStatusData({ ...statusData, status: e.target.value })}
                            className="form-select form-control-sm"
                            value={statusData.status || ''}
                        >
                            <option disabled selected>Select The Status</option>
                            <option value="delivered">Delivered</option>
                            <option value="shipped">Shipped</option>
                            <option value="dispatched">Dispatched</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                    <Button variant="primary" onClick={() => {
                        if (statusData.orderId && statusData.status) {
                            updateStatus(statusData);
                        } else {
                            toast.error("Please select a status.");
                        }
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>



    </>
}

export default AllOrders