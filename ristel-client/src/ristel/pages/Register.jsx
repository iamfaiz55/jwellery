// import node module libraries
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';

// import media files
import Logo from './../../assets/images/brand/logo/logo.png';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const Register = () => {
    return (
        <Fragment>
            <Row className="align-items-center justify-content-center g-0 min-vh-100">
                <Col lg={5} md={5} className="py-8 py-xl-0">
                    <Card>
                        <Card.Body className="p-6">
                            <div className="mb-4">
                                <div className='text-center'>

                                    <Link to="/">
                                        <Image src={Logo} height={100} className="mb-4" alt="" />
                                    </Link>
                                </div>
                                <h1 className="mb-1 fw-bold">Sign up</h1>
                                <span>
                                    Already have an account?{' '}
                                    <Link to="/login" className="ms-1">
                                        Sign in
                                    </Link>
                                </span>
                            </div>
                            {/* Form */}
                            <Form>
                                <Row>
                                    <Col lg={12} md={12} className="mb-3">
                                        {/* User Name */}
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="username"
                                            placeholder="User Name"
                                            required
                                        />
                                    </Col>
                                    <Col lg={12} md={12} className="mb-3">
                                        {/* email */}
                                        <Form.Label>Email </Form.Label>
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            placeholder="Email address here"
                                            required
                                        />
                                    </Col>
                                    <Col lg={12} md={12} className="mb-3">
                                        {/* Password */}
                                        <Form.Label>Password </Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="password"
                                            placeholder="**************"
                                            required
                                        />
                                    </Col>
                                    <Col lg={12} md={12} className="mb-3">
                                        {/* Checkbox */}
                                        <Form.Check type="checkbox" id="check-api-checkbox">
                                            <Form.Check.Input type="checkbox" />
                                            <Form.Check.Label>
                                                I agree to the
                                                <Link to="/pages/terms-and-conditions">
                                                    Terms of Service{' '}
                                                </Link>{' '}
                                                and{' '}
                                                <Link to="/pages/terms-and-conditions">
                                                    Privacy Policy.
                                                </Link>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Col>
                                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                                        {/* Button */}
                                        <Button variant="primary" type="submit" size='lg'>
                                            Sign in
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            <hr className="my-4" />
                            <div className="mt-4 text-center">
                                {/* Facebook */}
                                <Link
                                    to="#"
                                    className="btn-social btn-social-outline btn-facebook"
                                >
                                    <i className="fab fa-facebook"></i>
                                </Link>{' '}
                                {/* Twitter */}
                                <Link
                                    to="#"
                                    className="btn-social btn-social-outline btn-twitter"
                                >
                                    <i className="fab fa-twitter"></i>
                                </Link>{' '}
                                {/* LinkedIn */}
                                <Link
                                    to="#"
                                    className="btn-social btn-social-outline btn-linkedin"
                                >
                                    <i className="fab fa-linkedin"></i>
                                </Link>{' '}
                                {/* GitHub */}
                                <Link
                                    to="#"
                                    className="btn-social btn-social-outline btn-github"
                                >
                                    <i className="fab fa-github"></i>
                                </Link>
                            </div>
                            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", }}> <Icon path={mdiArrowLeft} size={1} /> Back to Shopping</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Register;
