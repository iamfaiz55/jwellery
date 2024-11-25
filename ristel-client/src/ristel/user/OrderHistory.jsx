import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Image, Breadcrumb, Container, Spinner, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import Product1 from './../../assets/images/ecommerce/product-shoe-01.jpg';
import Product2 from './../../assets/images/ecommerce/product-shoe-02.jpg';
import Product3 from './../../assets/images/ecommerce/product-shoe-03.jpg';
// import { useGetAllOrdersQuery } from '../../redux/apis/adminApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCancelOrderMutation, useGetOrdersQuery, useSendInvoiceAgainMutation } from '../../redux/apis/userApi';

// export const numberWithCommas = (x, decimal = 0) => x.toLocaleString('en-US', { minimumFractionDigits: decimal });
// export const getFileExtension = (filename) => filename.split('.').pop();
// export const getRandomNo = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;
// export const getStatusColor = (status) => {
// const colors = { 'In Progress': 'info', 'Pending': 'warning', 'Finished': 'success', 'Cancel': 'danger' };
// return colors[status] || 'primary';
// };
// export const getCategoryColor = (category) => {
// const colors = { 'Saas Services': 'info', 'Entertainment': 'info', 'Extra': 'info', 'Design': 'warning', 'Marketing': 'success', 'Development': 'danger', 'SEO': 'primary' };
// return colors[category] || 'primary';
// };
// export const chunk = (arr, chunkSize = 1, cache = []) => {
// const tmp = [...arr];
// while (tmp.length) cache.push(tmp.splice(0, chunkSize));
// return cache;
// };
// export const getTimeValue = (date) => {
// const hours = date.getHours();
// const minutes = date.getMinutes().toString().padStart(2, '0');
// const ampm = hours >= 12 ? 'PM' : 'AM';
// return ` ${hours % 12 || 12}:${minutes} ${ampm}`;
// };
// export const getDateValue = (date) => `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
// export const getSlug = (text) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
// export const convertToCurrency = (value) => '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

// // Products Data
// const ProductsData = [
//     {
//         id: 1,
//         name: 'White Adidas Top Sneakers',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 49.00,
//         mrp: 49.00,
//         sale: false,
//         rating: 5.0,
//         status: 'active',
//         images: [{ id: 1, image: Product1 }]
//     },
//     { id: 2, name: 'Red Converse shoe', colors: ['danger', 'primary', 'dark'], salePrice: 139.00, mrp: 139.00, sale: false, rating: 4.6, status: 'draft', images: [{ id: 1, image: Product2 }] },
//     {
//         id: 3, name: 'Unpaired maroon plimsoll',
//         colors: ['danger', 'success', 'dark'], salePrice: 39.00, mrp: 49.00, sale: true, rating: 3.6, new: false, status: 'active', inventory: 5, category: 'Shoe', images: [{ id: 1, image: Product3 }],
//     },];


const OrderHistory = () => {
    // const [addView] = useAddViewMutation()
    const { user } = useSelector(state => state.user);
    const [sendInoice, { isSuccess: sendSuccess, isLoading }] = useSendInvoiceAgainMutation()
    const { data: orders, error, isError } = useGetOrdersQuery(user._id);
    const [cancelOrder, { isSuccess }] = useCancelOrderMutation()
    // console.log(orders);


    useEffect(() => {
        if (isSuccess) {
            toast.success("Order Cancel Success")
        }
    }, [isSuccess])
    // useEffect(() => {
    //     addView({ type: "User All Orders " })
    // }, [])
    // productId, cartId,
    // useEffect(() => {
    //     if (user && data) {
    //         const ordersIds = data.map(order => order._id);

    //         postHistory({ userId: user._id, type: "allOrders", ordersId: ordersIds });
    //     }
    // }, [user, data]);
    // const Orders = [
    //     { id: 1, orderNo: 'GK00017', deliveredON: 'June 26,2023', orderDetails: [{ id: 11, productID: 15, color: 'Orange', size: '10', price: 49 }, { id: 11, productID: 14, color: 'Black', size: '11', price: 79 }] },
    //     { id: 2, orderNo: 'GK00012', deliveredON: 'Apr 20,2023', orderDetails: [{ id: 21, productID: 13, color: 'Orange', size: '10', price: 49 }] }

    // ];
    useEffect(() => {
        if (sendSuccess) {
            toast.success("Invoice Sended To Your Registered Email")
        }
    }, [sendSuccess])
    useEffect(() => {
        if (isSuccess) {
            toast.success("Order Cancel Success")
        }
    }, [isSuccess])

    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleCancelClick = (orderId) => {
        setSelectedOrder(orderId);
        setShowModal(true);
    };

    const handleConfirmCancel = () => {
        if (selectedOrder) {
            cancelOrder(selectedOrder);
            setShowModal(false);
            setSelectedOrder(null);
        }
    };


    return (
        <Container className='min-vh-100'>
            <Row>
                <Col xs={12}>
                    <div className="border-bottom pb-3 mb-3">
                        <h1 className="mb-0 h2 fw-bold">Order History</h1>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Account</Breadcrumb.Item>
                            <Breadcrumb.Item active>Order History</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="mb-5">
                                <h4 className="mb-0">Your Order</h4>
                                <p>Check the status of recent orders, manage returns, and discover similar products.</p>
                            </div>

                            {orders && orders.map((order, index) => (
                                <div className="mb-5 border-bottom pb-3" key={index}>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <h5 className="mb-0">Order #{order._id}</h5>
                                        <div className="d-flex justify-content-center w-100">
                                            {
                                                order.status !== "pending" || "shipped" && <>
                                                    <Link
                                                        to="#"
                                                        className="mx-auto text-danger"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleCancelClick(order._id);
                                                        }}
                                                    >
                                                        Cancel Order
                                                    </Link>
                                                </>
                                            }                                        </div>
                                        <div>
                                            {
                                                isLoading
                                                    ? <>
                                                        <div className="mb-4">
                                                            <div>
                                                                <div className="text-center">
                                                                    <Spinner animation="border" size="sm" variant="primary" />
                                                                    {/* <p>Loading Data...</p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    : <>

                                                        <Link to="#" className="me-3" onClick={e => sendInoice({ orderId: order._id })}>Download Invoice</Link>
                                                    </>
                                            }

                                        </div>
                                    </div>

                                    {order.orderItems.map((item, itemIndex) => {
                                        // Find the variant that matches item.varientId
                                        const varient = item.productId.varient.find(variant => variant._id == item.varientId);

                                        console.log("selected variant", varient);

                                        return (
                                            <Fragment key={itemIndex}>
                                                <Row className="align-items-center justify-content-between mb-4">
                                                    {/* Product Details */}
                                                    <Col lg={6} xs={12} className="d-flex">
                                                        <Image
                                                            src={item.productId.images[0]}
                                                            alt={item.productId.name}
                                                            className="img-4by3-xl rounded me-4"
                                                            style={{ maxWidth: '100px', height: 'auto' }}
                                                        />
                                                        <div>
                                                            <h5 className="mb-1">{item.productId.name}</h5>
                                                            <span>Color: <span className="text-dark">{item.color}</span>, Size: <span className="text-dark">{item.size}</span></span>
                                                            <div className="mt-2"><h4>${varient ? varient.price : item.productId.price || 0}</h4></div>
                                                        </div>
                                                    </Col>

                                                    {/* Status */}
                                                    <Col lg={2} xs={12} className="text-center">
                                                        <p className="text-muted mb-0">Status: {order.status}</p>
                                                    </Col>

                                                    {/* Action Buttons */}
                                                    <Col lg={4} xs={12} className="d-flex flex-column align-items-start align-items-lg-end">
                                                        <Link to={`/product-details/${item.productId._id}`} className="btn btn-primary mb-2 w-100 w-lg-auto">Buy again</Link>
                                                        <Link to="#" className="btn btn-secondary w-100 w-lg-auto">Shop similar</Link>
                                                    </Col>
                                                </Row>

                                                {itemIndex < order.orderItems.length - 1 && <hr className="my-3" />}
                                            </Fragment>
                                        );
                                    })}

                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            {/* Cancel Order Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to cancel this order?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirmCancel}>
                        Confirm Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
};

export default OrderHistory;
