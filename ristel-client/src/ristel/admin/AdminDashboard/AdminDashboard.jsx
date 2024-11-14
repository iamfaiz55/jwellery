

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Modal, Button } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import ApexCharts from 'react-apexcharts';


import { FaDollarSign, FaGem, FaBoxOpen, FaHammer } from 'react-icons/fa';
import { FaProjectDiagram } from 'react-icons/fa';
import { useGetAllOrdersQuery, useUpdateStatusMutation } from '../../../redux/apis/adminApi';
import { toast } from 'react-toastify';
import Apex from '../../Apex/Apex';
const AdminDashboard = () => {
    const [show, setShow] = useState(false);

    // const options = {
    //     chart: {
    //         id: 'sales-chart'
    //     },
    //     xaxis: {


    //         categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    //             'September', 'October', 'November', 'December']
    //     }
    // };

    // const series = [
    //     {
    //         name: 'Sales',
    //         data: [30, 40, 35, 50, 49, 60]
    //     }
    // ];

    // const data = [
    //     {
    //         title: 'SALES',
    //         value: '$10,800',
    //         change: '+20.9%',
    //         icon: <FaDollarSign style={{ fontSize: '2.5rem', color: '#FFD700' }} />,
    //         bgColor: '#FFFAF0',
    //         borderColor: '#FFD700'
    //     },
    //     {
    //         title: 'REVENUE',
    //         value: '$50,000',
    //         change: '+15%',
    //         icon: <FaGem style={{ fontSize: '2.5rem', color: '#00BFFF' }} />,
    //         bgColor: '#E0FFFF',
    //         borderColor: '#00BFFF'
    //     },
    //     {
    //         title: 'PRODUCTS',
    //         value: '180',
    //         change: '+10',
    //         icon: <FaBoxOpen style={{ fontSize: '2.5rem', color: '#32CD32' }} />,
    //         bgColor: '#F0FFF0',
    //         borderColor: '#32CD32'
    //     },
    //     {
    //         title: 'DESIGNERS',
    //         value: '15',
    //         change: '+3',
    //         icon: <FaHammer style={{ fontSize: '2.5rem', color: '#FF6347' }} />,
    //         bgColor: '#FFEBEE',
    //         borderColor: '#FF6347'
    //     }
    // ];



    // const radialBarData = {
    //     series: [85, 75, 65, 55, 50],
    //     options: {
    //         chart: {
    //             type: 'radialBar',
    //         },
    //         plotOptions: {
    //             radialBar: {
    //                 dataLabels: {
    //                     total: {
    //                         show: true,
    //                         label: 'Total',
    //                         formatter: () => 100,
    //                     },
    //                 },
    //             },
    //         },
    //         labels: ['Category A', 'Category B', 'Category C', 'Category D'],

    //         tooltip: {
    //             enabled: true,
    //         },
    //     },
    // };

    // const pieData = {
    //     series: [400, 300, 300, 200],
    //     options: {
    //         chart: {
    //             type: 'pie',
    //         },
    //         labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    //         colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    //         tooltip: {
    //             enabled: true,
    //         },
    //     },
    // }
    const handleClose = () => setShow(false);
    const [statusData, setStatusData] = useState({})
    const [updateStatus, { isSuccess }] = useUpdateStatusMutation()
    const { data: orders } = useGetAllOrdersQuery();
    // console.log(data);
    useEffect(() => {
        if (isSuccess) {
            toast.success("Status Update Success")
            setShow(false)
            // document.getElementById("edit").close()
        }
    }, [isSuccess])
    return (
        <Container fluid>



            <Row className="mb-4">
                <Col className='mt-5'>
                    <h2>Jewelry Admin Dashboard</h2>
                    <p>Track sales, revenue, products, and jewelry designers/craftsmen for your business!</p>
                </Col>
            </Row>

            <Apex />
            {/* Alertsn */}
            {/* <Row>
                <Col>
                    <Alert variant="info">
                        <h4>Information page</h4>
                        This is an informational message!
                    </Alert>
                </Col>
            </Row> */}
            {/* Sales, Revenue, Products, Designers */}
            {/* <Row className="mb-3">
                {data.map((item, index) => (
                    <Col key={index} md={4} lg={3}>
                        <Card className="text-center mb-4" style={{ backgroundColor: item.bgColor, border: `2px solid ${item.borderColor}` }}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-center align-items-center">
                                    {item.icon} <span className="ms-2" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{item.title}</span>
                                </Card.Title>
                                <Card.Text className="fs-4">
                                    <strong>{item.value}</strong>
                                </Card.Text>
                                <span className={`text-${item.change.includes('+') ? 'success' : 'danger'}`}>{item.change}</span>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row> */}


            {/* <Row>

                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title><h4>Radial Bar Chart</h4></Card.Title>
                            <ApexCharts
                                options={radialBarData.options}
                                series={radialBarData.series}
                                type="radialBar"
                                height={397}
                            />
                        </Card.Body>
                    </Card>
                </Col>


                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title><h4>Pie Chart</h4></Card.Title>
                            <ApexCharts
                                options={pieData.options}
                                series={pieData.series}
                                type="pie"
                                height={350}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}




            {/* Main Dashboard Section */}
            <Row>
                {/* <Col md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title><h4>Sales Overview</h4></Card.Title>
                            <Chart options={options} series={series} type="line" height={250} />
                        </Card.Body>
                    </Card>
                </Col> */}

                <Col md={4}>
                    <Row>
                        {/* Jewelry Orders Card */}
                        {/* <Col xs={12}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title><h4>Jewelry Orders</h4></Card.Title>
                                    <Card.Text>
                                        Total Orders: 145
                                        <br />
                                        Pending Orders: 12
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col> */}

                        {/* Inventory Card */}
                        {/* <Col xs={12}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title><h4>Inventory Status</h4></Card.Title>
                                    <Card.Text>
                                        In Stock: 320 Items
                                        <br />
                                        Low Stock: 20 Items
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col> */}
                    </Row>
                </Col>
            </Row>
            {/*  orders */}

            <div className=" rounded-lg border border-light shadow-md ">
                <table className="table table-striped table-hover text-left text-xs text-gray-500" style={{ fontSize: '11px' }}>
                    <thead className="table-primary ">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-dark">Product Name</th>
                            <th scope="col" className="px-6 py-4 font-medium text-dark d-none d-md-table-cell">User Name</th>
                            <th scope="col" className="px-6 py-4 font-medium text-dark d-none d-md-table-cell">Status</th>
                            <th scope="col" className="px-6 py-4 font-medium text-dark d-md-none">Price & Action</th>
                            <th scope="col" className="px-6 py-4 font-medium text-dark d-none d-md-table-cell">Price</th>
                            <th scope="col" className="px-6 py-4 font-medium text-dark d-none d-md-table-cell">Address</th>
                            <th scope="col" className="px-6 py-4 font-medium text-dark d-none d-md-table-cell">Payment Method</th>
                            <th scope="col" className="px-6 py-4 font-medium text-dark d-none d-md-table-cell">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(order => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 font-medium text-dark">
                                    {order.orderItems.map(item => (
                                        <div key={item._id}>
                                            <div className="font-weight-bold text-primary">{item.productId && item.productId.name}</div>
                                            <div className="text-muted">Qty: {item.quantity}</div>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4 d-none d-md-table-cell">
                                    <div className="text-sm">
                                        <div className="font-weight-bold text-primary">{order.userId && order.userId.mobile}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 d-none d-md-table-cell">
                                    <span className={`badge ${order.status === 'cancelled' ? 'badge-danger' : 'badge-success'} text-black`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 d-md-none">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="text-dark font-weight-bold">₹{order.total}</div>
                                        <button onClick={() => {
                                            setShow(true)
                                            // document.getElementById('edit').showModal();
                                            setStatusData({ ...statusData, orderId: order._id });
                                        }} className="btn btn-link text-primary">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 d-none d-md-table-cell">₹{order.total}</td>
                                <td className="px-6 py-4 d-none d-md-table-cell">
                                    <div className="text-sm">
                                        <div className="font-weight-bold text-primary">{order.deliveryAddressId && order.deliveryAddressId.addressType}</div>
                                        <div className="text-muted">{order.deliveryAddressId && order.deliveryAddressId.city}, {order.deliveryAddressId && order.deliveryAddressId.state}</div>
                                        <div className="text-muted">{order.deliveryAddressId && order.deliveryAddressId.country} - {order.deliveryAddressId && order.deliveryAddressId.pincode}</div>
                                        <div className="text-muted">Mobile: {order.deliveryAddressId && order.deliveryAddressId.mobile}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 d-none d-md-table-cell">
                                    {order.paymentMethod}
                                </td>
                                <td className="px-6 py-4 d-none d-md-table-cell">
                                    <Button onClick={() => {
                                        setShow(true)
                                        setStatusData({ ...statusData, orderId: order._id });
                                    }} className="btn btn-primary text-black">
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <dialog id="edit" className="modal fade">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Update Order Status</h5>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <select onChange={e => setStatusData({ ...statusData, status: e.target.value })} className="form-select form-control">
                                    <option disabled selected>Select The Status</option>
                                    <option value={"delivered"}>Delivered</option>
                                    <option value={"shipped"}>Shipped</option>
                                    <option value={"dispatched"}>Dispatched</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={e => updateStatus(statusData)}>Update</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </dialog> */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h5 className="modal-title">Update Order Status</h5>
                            {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body">
                            <select onChange={e => setStatusData({ ...statusData, status: e.target.value })} className="form-select form-control">
                                <option disabled selected>Select The Status</option>
                                <option value={"delivered"}>Delivered</option>
                                <option value={"shipped"}>Shipped</option>
                                <option value={"dispatched"}>Dispatched</option>
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={e => updateStatus(statusData)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>























            <Row className="mb-4">
                <Col>
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Loading Data...</p>
                    </div>
                </Col>
            </Row>

            {/* Footer Section */}
            <Row>
                <Col>
                    <footer className="text-center">
                        <small>&copy; 2024 Jewelry Shop</small>
                    </footer>
                </Col>
            </Row>








        </Container>
    );
}

export default AdminDashboard;





