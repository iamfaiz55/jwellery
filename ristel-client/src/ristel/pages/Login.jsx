// import node module libraries
import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image, FloatingLabel, Modal, Badge, Alert } from 'react-bootstrap';

// import media files
import Logo from './../../assets/images/brand/logo/logo.png';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiCheck } from '@mdi/js';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation, useVerifyOTPUserMutation } from '../../redux/apis/userAuthApi';
const Login = () => {
    const [otp, setOtp] = useState()
    const navigate = useNavigate()
    const [loginUser, { isSuccess, isLoading, isError, error, data }] = useLoginUserMutation()
    const [verifyOTP, {
        isSuccess: verifySuccess,
        isLoading: verifyIsLoading,
        isError: verifyIsError,
        error: verifyError }
    ] = useVerifyOTPUserMutation()
    const [show, setShow] = useState(false);


    const { register, handleSubmit, setError, watch, formState: { errors, touchedFields } } = useForm()
    const handleLogin = (data) => {
        const regex = /^[6-9]\d{9}$/
        const val = data.mobile.split(" ")[1]
        if (val.length < 10) {
            setError("mobile", { type: "custom", message: "Invalid Mobile Number" })
        } else if (!regex.test(val)) {
            setError("mobile", { type: "custom", message: "Invalid Indian Mobile" })
        } else {
            loginUser({ mobile: val })
        }
    }
    useEffect(() => {
        if (isSuccess) {
            setShow(true)
        }
    }, [isSuccess])
    useEffect(() => {
        if (verifySuccess) {
            navigate("/")
        }
    }, [verifySuccess])
    return (
        <Fragment>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Row className="align-items-center justify-content-center g-0 min-vh-100">
                <Col lg={5} md={5} className="py-8 py-xl-0">
                    <Card>
                        <Card.Body className="p-6">
                            <div className="mb-4">
                                <div className='text-center'>
                                    <Link to="/">
                                        <Image src={Logo} className="mb-4 img-fluid" height={100} alt="" />
                                    </Link>
                                </div>
                                {
                                    show
                                        ? <Alert className='alert-success'> <Icon path={mdiCheck} size={1} /> OTP Send To Registered Mobile</Alert>
                                        : <h1 className="mb-1 fw-bold">Sign in</h1>
                                }

                                {
                                    show
                                        ? <div>
                                            <p>A One-Time Password (OTP) has been sent to your mobile number. Please enter the 6-digit OTP below to verify your account.</p>
                                            <FloatingLabel
                                                controlId="mobile"
                                                label="Your OTP"
                                                className="mb-3"
                                                placeholder="Enter OTP"
                                            >
                                                <InputMask
                                                    onChange={e => setOtp(e.target.value.split(" ").join(""))}
                                                    maskChar="-"
                                                    type="tel"
                                                    mask="999 999"
                                                    placeholder="Enter OTP"
                                                    className={`form-control form-control-lg `} />
                                            </FloatingLabel>
                                            <Button onClick={e => verifyOTP({ mobile: data, otp })} className='w-100' disabled={verifyIsLoading}> {verifyIsLoading ? "Please Wait Verifing.." : "Verify OTP"}</Button>
                                            <div className='my-2 text-center'>Didn't receive the OTP? <span className='ms-2'>Resend</span> </div>
                                        </div>
                                        : <div>
                                            <p>OTP will be received on your registered mobile number</p>
                                            <Form onSubmit={handleSubmit(handleLogin)}>
                                                <Row>
                                                    <Col lg={12} md={12} className="mb-3">
                                                        <FloatingLabel
                                                            controlId="mobile"
                                                            label="Email mobile number here"
                                                            className="mb-3"
                                                            placeholder="Email mobile number here"
                                                        >
                                                            <InputMask
                                                                {...register("mobile", { required: "Mobile Number Is Required", minLength: { value: 10, message: "Invalid Mobile Number minlength" } })}
                                                                maskChar=" "
                                                                type="tel"
                                                                mask="+\91\ 9999999999"
                                                                placeholder="Email mobile number here"
                                                                className={`form-control form-control-lg ${errors.mobile && "is-invalid"}`} />
                                                            {errors.mobile && <span className='invalid-feedback'>{errors.mobile?.message}</span>}
                                                            {/* {errors.mobile && <span>required</span>} */}
                                                        </FloatingLabel>
                                                    </Col>


                                                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                                                        {/* Button */}
                                                        <Button disabled={isLoading} variant="primary" type="submit" size='lg'>
                                                            {isLoading ? "Please Wait.." : "Continue With OTP"}
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <div className='text-center mt-3'>
                                                            If your mobile number is not registered with us, we will create a new account for you. {' '}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                }
                            </div>
                            {/* Form */}

                            <hr />
                            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", }}> <Icon path={mdiArrowLeft} size={1} /> Back to Shopping</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </Fragment>
    );
};

export default Login;
