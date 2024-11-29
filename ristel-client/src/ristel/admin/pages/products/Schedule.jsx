import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Form, Row, Col, Card, ListGroup, InputGroup } from 'react-bootstrap';
// import {
//     useDeleteProductMutation,
//     useGetAllProductsAdminQuery,
//     useSetScheduleMutation,
// } from '../redux/apis/adminApi';
// import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useLogoutAdminMutation } from '../../../../redux/apis/adminAuthApi';
import { useGetScheduleQuery } from '../../../../redux/apis/publicApi';
import { useDeleteProductMutation, useGetAllProductsAdminQuery, useSetScheduleMutation } from '../../../../redux/apis/adminApi';
import { toast } from 'react-toastify';
// import { useLogoutAdminMutation } from '../redux/apis/adminAuthApi';
// import { useGetScheduleQuery } from '../redux/apis/openApi';

const Schedule = () => {
    const [logoutAdmin] = useLogoutAdminMutation();
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [selectedDate, setSelectedDate] = useState({});
    const [varients, setVarients] = useState([]);
    const { data: schedules } = useGetScheduleQuery();
    const { data, refetch, isError: isProdError, error: prodError } = useGetAllProductsAdminQuery();
    const [deleteProduct, { isSuccess: deleteSuccess }] = useDeleteProductMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (deleteSuccess) {
            toast.success('Product deleted successfully');
            refetch();
        }
    }, [deleteSuccess]);

    useEffect(() => {
        if (isProdError && prodError.status === 409) {
            logoutAdmin();
        }
    }, [isProdError]);

    return (
        <div className="m-5">
            {open ? (
                <Check
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    data={editData}
                    setOpen={setOpen}
                />
            ) : (
                <>
                    {/* Product List */}
                    <div className="product-list">
                        {data &&
                            data.map((item, index) => {
                                if (!item.isDelete) {
                                    return (
                                        <div
                                            key={item._id}
                                            className="list-item d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between border-bottom py-3"
                                            style={{
                                                backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#ffffff',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            {/* Product Information */}
                                            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                                                {/* Thumbnail Images */}
                                                <div className="d-flex flex-wrap me-md-3 mb-3 mb-md-0">
                                                    {item.images.map((img, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={img}
                                                            alt={item.name}
                                                            style={{
                                                                height: '60px',
                                                                width: '60px',
                                                                marginRight: '5px',
                                                                objectFit: 'cover',
                                                                borderRadius: '4px',
                                                                border: '1px solid #d9e3f0',
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Product Details */}
                                                <div>
                                                    <h5 className="mb-2" style={{ color: '#3b5998' }}>
                                                        {index + 1}. {item.name}
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        Variants: {item.varient.length}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-3 mt-md-0">
                                                <Button
                                                    variant="outline-primary"
                                                    className="me-2"
                                                    onClick={() => setVarients(item.varient)}
                                                >
                                                    View Variants
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setEditData(item);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                    </div>

                    {/* Variants Modal */}
                    <Modal
                        show={Boolean(varients.length)}
                        onHide={() => setVarients([])}
                        size="lg" // Enlarges the modal
                        centered
                        className="variant-modal"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: '1.5rem', color: '#3b5998' }}>
                                Product Variants
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#f0f8ff', padding: '30px' }}>
                            {varients.length > 0 ? (
                                <div className="variant-list">
                                    {varients.map((item, index) => (
                                        <Card
                                            key={index}
                                            className="mb-4"
                                            style={{
                                                backgroundColor: '#ffffff',
                                                border: '1px solid #d9e3f0',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            <Card.Body>
                                                <Card.Title
                                                    style={{
                                                        fontSize: '1.25rem',
                                                        fontWeight: 'bold',
                                                        color: '#3b5998',
                                                    }}
                                                >
                                                    Variant {index + 1}
                                                </Card.Title>
                                                <hr />
                                                <Card.Text style={{ fontSize: '1rem', marginBottom: '10px' }}>
                                                    <strong>Description:</strong> {item.desc}
                                                </Card.Text>
                                                <Card.Text style={{ fontSize: '1rem', marginBottom: '10px' }}>
                                                    <strong>Price:</strong> ${item.price}
                                                </Card.Text>
                                                <Card.Text style={{ fontSize: '1rem', marginBottom: '10px' }}>
                                                    <strong>MRP:</strong> ${item.mrp}
                                                </Card.Text>
                                                <Card.Text style={{ fontSize: '1rem', marginBottom: '10px' }}>
                                                    <strong>Weight:</strong> {item.prductWeight}
                                                </Card.Text>
                                                <Card.Text style={{ fontSize: '1rem' }}>
                                                    <strong>Quantity:</strong> {item.quantity}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ fontSize: '1.2rem', textAlign: 'center', color: '#6c757d' }}>
                                    No variants available.
                                </p>
                            )}
                        </Modal.Body>
                        <Modal.Footer style={{ borderTop: 'none' }}>
                            <Button
                                variant="outline-primary"
                                style={{
                                    fontSize: '1rem',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                }}
                                onClick={() => setVarients([])}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </>
            )}
        </div>
    );
};

const Check = ({ data, setOpen, setSelectedDate, selectedDate }) => {
    const [schedule, { isSuccess, isError, error }] = useSetScheduleMutation();
    const [discounts, setDiscounts] = useState([]);

    const handleDiscountChange = (variantId, value) => {
        setDiscounts((prev) => {
            const existingDiscount = prev.find((item) => item.vId === variantId);
            if (existingDiscount) {
                return prev.map((item) =>
                    item.vId === variantId ? { ...item, discount: value } : item
                );
            } else {
                return [...prev, { vId: variantId, discount: value }];
            }
        });
    };
    useEffect(() => {
        if (isError) {
            toast.error(error.message)
        }
    }, [isError])

    return (
        <Modal show onHide={() => setOpen(false)} fullscreen centered>
            <Modal.Header closeButton>
                <Modal.Title>Schedule Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Variants List */}
                <h5 className="mb-4">Product Variants</h5>
                <ListGroup>
                    {data.varient.map((variant, index) => (
                        <ListGroup.Item key={variant._id} className="mb-2">
                            <Row>
                                <Col xs={12} className="mb-2">
                                    <strong>Variant {index + 1}</strong>
                                </Col>
                                <Col xs={6}>
                                    <p className="mb-0"><strong>Description:</strong> {variant.desc}</p>
                                    <p className="mb-0"><strong>Price:</strong> ₹{variant.price}</p>
                                    <p className="mb-0"><strong>MRP:</strong> ₹{variant.mrp}</p>
                                </Col>
                                <Col xs={6}>
                                    <p className="mb-0"><strong>Height:</strong> {variant.height}</p>
                                    <p className="mb-0"><strong>Width:</strong> {variant.width}</p>
                                    <p className="mb-0"><strong>Quantity:</strong> {variant.quantity}</p>
                                </Col>
                                <Col xs={12} className="mt-2">
                                    <Form.Group>
                                        <Form.Label>Set Discount (%)</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter discount"
                                                onChange={(e) =>
                                                    handleDiscountChange(variant._id, e.target.value)
                                                }
                                            />
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {/* Schedule Inputs */}
                <h5 className="mt-4 mb-3">Schedule Details</h5>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Start Date and Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            onChange={(e) =>
                                setSelectedDate({ ...selectedDate, startDate: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>End Date and Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            onChange={(e) =>
                                setSelectedDate({ ...selectedDate, endDate: e.target.value })
                            }
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        schedule({
                            startDate: selectedDate.startDate,
                            endDate: selectedDate.endDate,
                            discounts,
                            pId: data._id,
                        });
                        setOpen(false);
                    }}
                >
                    Add Schedule
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Schedule;
