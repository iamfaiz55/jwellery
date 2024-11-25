import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAddAddressMutation, useDeleteAddressMutation, useGetAddressesQuery, useUpdateAddressMutation } from '../../redux/apis/userApi';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
const AddressInfo = () => {
    const [updateAddress, { isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateAddressMutation()
    const [addAddress, { isSuccess, isLoading }] = useAddAddressMutation();
    const [deleteAddress, { isSuccess: deleteSuccess }] = useDeleteAddressMutation()
    const [update, setUpdate] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState()
    const { user } = useSelector(state => state.user)
    const { data, error, isError, refetch } = useGetAddressesQuery(user && user._id);
    const [modalShow, setModalShow] = useState(false);
    const countryOptions = [
        { value: 'India', label: 'India' },
        { value: 'UK', label: 'UK' },
        { value: 'US', label: 'US' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Australia', label: 'Australia' },
        { value: 'Germany', label: 'Germany' },
        { value: 'France', label: 'France' },
        { value: 'China', label: 'China' },
        { value: 'Japan', label: 'Japan' },
        { value: 'Brazil', label: 'Brazil' },
        { value: 'South Africa', label: 'South Africa' },
        { value: 'Russia', label: 'Russia' },
        { value: 'Mexico', label: 'Mexico' },
        { value: 'Italy', label: 'Italy' },
        { value: 'Netherlands', label: 'Netherlands' },
        { value: 'Spain', label: 'Spain' },
        { value: 'Sweden', label: 'Sweden' },
        { value: 'Norway', label: 'Norway' },
        { value: 'Argentina', label: 'Argentina' },
        { value: 'South Korea', label: 'South Korea' },
        { value: 'Saudi Arabia', label: 'Saudi Arabia' },
        { value: 'United Arab Emirates', label: 'United Arab Emirates' }
    ];
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: selectedAddress || {
            pincode: "",
            address: "",
            city: "",
            state: "",
            country: "",
            addressType: "",
            mobile: "",
            email: "",
            firstname: "",
            lastName: "",
        },
        validationSchema: yup.object({
            pincode: yup.string().required("Enter pincode"),
            address: yup.string().required("Enter address"),
            city: yup.string().required("Enter city"),
            state: yup.string().required("Enter state"),
            country: yup.string().required("Enter country"),
            addressType: yup.string().required("Select address type"),
            mobile: yup.string().required("Enter mobile number"),
            email: yup.string().email("Invalid email format"),
            firstname: yup.string().required("Enter first name"),
            lastName: yup.string().required("Enter last name"),
        }),
        onSubmit: (values, { resetForm }) => {

            resetForm();
        },
    });



    // console.log(data);
    // console.log(user);

    const data2 = [
        {
            id: 1,
            title: "Billing Address #1",
            address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
        },
        {
            id: 2,
            title: "Billing Address #2",
            address: "1234 Elm St. Springfield, Illinois 62704",
        },
    ];
    useEffect(() => {
        if (isSuccess) {
            toast.success("Address Added Success ")
        }
    }, [isSuccess])
    useEffect(() => {
        if (updateSuccess) {
            toast.success("Address Update Success ")
            refetch()
            setUpdate(false)
        }
    }, [updateSuccess])
    useEffect(() => {
        if (deleteSuccess) {
            toast.success("Address Delete Success ")
            refetch()
        }
    }, [deleteSuccess])
    return (
        <>
            <Card className="border-0 shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <h3 className="mb-0">Billing Address</h3>
                    <p className="mb-0 small">
                        Changes to your billing information will take effect starting with
                        the next scheduled payment and will be reflected on your next invoice.
                    </p>
                </Card.Header>
                <Card.Body>
                    {/* List group for addresses */}
                    <ListGroup variant="flush" className="mb-4">
                        {data && data.map((item, index) => (
                            <ListGroup.Item className="px-0 pt-3 pb-4" key={index}>
                                <Row>
                                    <Col>
                                        <h5 className="mb-1">{`${item.firstname} ${item.lastName}`}</h5>
                                        <p className="mb-0 text-muted">
                                            <strong>Address Type:</strong> {item.addressType} <br />
                                            <strong>Address:</strong> {item.address} <br />
                                            <strong>City:</strong> {item.city} <br />
                                            <strong>State:</strong> {item.state} <br />
                                            <strong>Country:</strong> {item.country} <br />
                                            <strong>Pincode:</strong> {item.pincode} <br />
                                            <strong>Mobile:</strong> {item.mobile}
                                        </p>
                                    </Col>
                                    <Col xs="auto" className="d-flex align-items-center">
                                        <button
                                            onClick={e => {
                                                setUpdate(true)
                                                setSelectedAddress(item)
                                            }}
                                            className="btn btn-outline-success btn-sm"
                                        >
                                            <FaPencilAlt />
                                        </button>
                                    </Col>
                                    <Col xs="auto" className="d-flex align-items-center">
                                        <button
                                            onClick={e => {
                                                deleteAddress(item._id)
                                                // setUpdate(true)
                                                // setSelectedAddress(item)
                                            }}
                                            className="btn btn-outline-danger btn-sm"
                                        >
                                            <FaTrash />
                                        </button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {/* Add new address button */}
                    <Link to="#" className="btn btn-primary mb-4" onClick={() => setModalShow(true)}>
                        Add New Address
                    </Link>

                    {/* add model */}
                    <Modal aria-labelledby="contained-modal-title-vcenter" show={modalShow} centered>
                        <form >
                            <Modal.Body>
                                {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label htmlFor="firstname">First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="firstname"
                                            placeholder="Enter first name"
                                            {...formik.getFieldProps("firstname")}
                                            isInvalid={formik.touched.firstname && formik.errors.firstname}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.firstname}</Form.Control.Feedback>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="lastName"
                                            placeholder="Enter last name"
                                            {...formik.getFieldProps("lastName")}
                                            isInvalid={formik.touched.lastName && formik.errors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label htmlFor="email">Email (Optional)</Form.Label>
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            placeholder="Enter email address"
                                            {...formik.getFieldProps("email")}
                                            isInvalid={formik.touched.email && formik.errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label htmlFor="mobile">Phone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="mobile"
                                            placeholder="Enter phone number"
                                            {...formik.getFieldProps("mobile")}
                                            isInvalid={formik.touched.mobile && formik.errors.mobile}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.mobile}</Form.Control.Feedback>
                                    </Col>

                                    <Col xs={6} className="mb-3">
                                        <Form.Label htmlFor="address">Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="address"
                                            placeholder="Enter address"
                                            {...formik.getFieldProps("address")}
                                            isInvalid={formik.touched.address && formik.errors.address}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
                                    </Col>

                                    <Col xs={6} className="mb-3">
                                        <Form.Label htmlFor="city">Town / City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="city"
                                            placeholder="Enter City"
                                            {...formik.getFieldProps("city")}
                                            isInvalid={formik.touched.city && formik.errors.city}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
                                    </Col>
                                    <Col xs={12} className="mb-3">
                                        <Form.Label htmlFor="country">Address Type</Form.Label>
                                        <Form.Select
                                            id="country"
                                            {...formik.getFieldProps("addressType")}
                                            isInvalid={formik.touched.addressType && formik.errors.addressType}
                                        >
                                            <option disabled value="">Select Address Type</option>
                                            <option value="home">HOME</option>
                                            <option value="office">OFFICE</option>
                                            {/* {countryOptions.map((country) => (
                                        <option key={country.value} value={country.value}>{country.label}</option>
                                    ))} */}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{formik.errors.addressType}</Form.Control.Feedback>
                                    </Col>

                                    <Col xs={6} className="mb-3">
                                        <Form.Label htmlFor="state">State</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="state"
                                            placeholder="Enter State"
                                            {...formik.getFieldProps("state")}
                                            isInvalid={formik.touched.state && formik.errors.state}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.state}</Form.Control.Feedback>
                                    </Col>

                                    <Col xs={6} className="mb-3">
                                        <Form.Label htmlFor="pincode">Zip / Postal Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="pincode"
                                            placeholder="Zip / Postal Code"
                                            {...formik.getFieldProps("pincode")}
                                            isInvalid={formik.touched.pincode && formik.errors.pincode}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.pincode}</Form.Control.Feedback>
                                    </Col>

                                    <Col xs={12} className="mb-3">
                                        <Form.Label htmlFor="country">Country</Form.Label>
                                        <Form.Select
                                            id="country"
                                            {...formik.getFieldProps("country")}
                                            isInvalid={formik.touched.country && formik.errors.country}
                                        >
                                            <option value="">Select Country</option>
                                            {countryOptions.map((country) => (
                                                <option key={country.value} value={country.value}>{country.label}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={e => setModalShow(false)}>Close</Button>
                                <Button onClick={e => {
                                    const values = formik.values
                                    if (!user.email) {
                                        const x = localStorage.getItem("user");
                                        const y = JSON.parse(x);
                                        const z = { ...y, email: values.email };
                                        localStorage.setItem("user", JSON.stringify(z));
                                    }
                                    // console.log(values);
                                    setModalShow(false);
                                    addAddress({ ...values, userId: user._id });
                                }} disabled={isLoading}>Save Changes</Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                    {/* add model */}
                    {/* update model */}
                    <Modal aria-labelledby="contained-modal-title-vcenter" show={update} centered>
                        <form >
                            <Modal.Body>
                                {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label htmlFor="firstname">First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="firstname"
                                            placeholder="Enter first name"
                                            {...formik.getFieldProps("firstname")}
                                            isInvalid={formik.touched.firstname && formik.errors.firstname}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.firstname}</Form.Control.Feedback>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="lastName"
                                            placeholder="Enter last name"
                                            {...formik.getFieldProps("lastName")}
                                            isInvalid={formik.touched.lastName && formik.errors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label htmlFor="email">Email (Optional)</Form.Label>
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            placeholder="Enter email address"
                                            {...formik.getFieldProps("email")}
                                            isInvalid={formik.touched.email && formik.errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label htmlFor="mobile">Phone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="mobile"
                                            placeholder="Enter phone number"
                                            {...formik.getFieldProps("mobile")}
                                            isInvalid={formik.touched.mobile && formik.errors.mobile}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.mobile}</Form.Control.Feedback>
                                    </Col>

                                    <Col xs={6} className="mb-3">
                                        <Form.Label htmlFor="address">Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="address"
                                            placeholder="Enter address"
                                            {...formik.getFieldProps("address")}
                                            isInvalid={formik.touched.address && formik.errors.address}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
                                    </Col>

                                    <Col xs={6} className="mb-3">
                                        <Form.Label htmlFor="city">Town / City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="city"
                                            placeholder="Enter City"
                                            {...formik.getFieldProps("city")}
                                            isInvalid={formik.touched.city && formik.errors.city}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
                                    </Col>
                                    <Col xs={12} className="mb-3">
                                        <Form.Label htmlFor="country">Address Type</Form.Label>
                                        <Form.Select
                                            id="country"
                                            {...formik.getFieldProps("addressType")}
                                            isInvalid={formik.touched.addressType && formik.errors.addressType}
                                        >
                                            <option disabled value="">Select Address Type</option>
                                            <option value="home">HOME</option>
                                            <option value="office">OFFICE</option>
                                            {/* {countryOptions.map((country) => (
                                        <option key={country.value} value={country.value}>{country.label}</option>
                                    ))} */}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{formik.errors.addressType}</Form.Control.Feedback>
                                    </Col>

                                    <Col xs={6} className="mb-3">
                                        <Form.Label htmlFor="state">State</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="state"
                                            placeholder="Enter State"
                                            {...formik.getFieldProps("state")}
                                            isInvalid={formik.touched.state && formik.errors.state}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.state}</Form.Control.Feedback>
                                    </Col>

                                    <Col xs={6} className="mb-3">
                                        <Form.Label htmlFor="pincode">Zip / Postal Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="pincode"
                                            placeholder="Zip / Postal Code"
                                            {...formik.getFieldProps("pincode")}
                                            isInvalid={formik.touched.pincode && formik.errors.pincode}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.pincode}</Form.Control.Feedback>
                                    </Col>

                                    <Col xs={12} className="mb-3">
                                        <Form.Label htmlFor="country">Country</Form.Label>
                                        <Form.Select
                                            id="country"
                                            {...formik.getFieldProps("country")}
                                            isInvalid={formik.touched.country && formik.errors.country}
                                        >
                                            <option value="">Select Country</option>
                                            {countryOptions.map((country) => (
                                                <option key={country.value} value={country.value}>{country.label}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={e => setUpdate(false)}>Close</Button>
                                <Button onClick={e => {
                                    const values = formik.values
                                    if (!user.email) {
                                        const x = localStorage.getItem("user");
                                        const y = JSON.parse(x);
                                        const z = { ...y, email: values.email };
                                        localStorage.setItem("user", JSON.stringify(z));
                                    }
                                    // console.log(values);
                                    // setUpdate(false);
                                    updateAddress({ ...values, userId: user._id });
                                }} disabled={updateLoading}>Save Changes</Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                    {/* update model */}


                    {/* Tax location info */}
                    <p className="mb-0 small">
                        Your tax location determines the taxes that are applied to your bill.
                    </p>
                    <Link to="#" className="small">
                        How do I correct my tax location?
                    </Link>
                </Card.Body>
            </Card>
        </>
    );
};

export default AddressInfo;
