import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Row, Col, Container, Image } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa'; // Icon for the edit button
// import axios from 'axios';
import "./profile.css"
import { useUpdateProfileDataMutation, useUpdateProfileMutation } from '../../redux/apis/userApi';
import { useFormik } from 'formik';
// import * yup from 'yup';
import { toast } from 'react-toastify';

import * as yup from 'yup';


const Profile = () => {
    const [updateProfile, { isSuccess, isLoading }] = useUpdateProfileMutation();

    const [updateProfileData, { isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateProfileDataMutation()


    const { user } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
    });
    const [isEditing, setIsEditing] = useState(false);


    const formik = useFormik({
        initialValues: {
            name: user && user.name ? user.name : "",
            email: user && user.email ? user.email : "",
            mobile: user && user.mobile ? user.mobile : "",
        },
        validationSchema: yup.object({
            name: yup.string(),
            mobile: yup.string(),
            email: yup.string()
        }),
        onSubmit: (values, { resetForm }) => {
            updateProfileData({ ...values, _id: user._id })
            resetForm()
        }
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        updateProfileData({ ...formData, formData, _id: user._id })

    };
    useEffect(() => {
        if (updateSuccess) {
            toast.success("Update Success")
            setIsEditing(false)
        }
    }, [updateSuccess])

    return (
        <Container className="profile-container ">
            <div className="text-center">
                <h3>User Profile</h3>
                <p className="text-muted">
                    Update your profile information below. Click "Edit" to make changes.
                </p>
            </div>

            <div className="d-flex justify-content-center mb-4">
                <Image
                    src={user && user.image || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    roundedCircle
                    className="profile-image"
                    width={150}
                    height={150}
                />
            </div>


            <Form onSubmit={handleSubmit} className='m-5'>

                <div className="d-flex  w-75">
                    <div className='w-50 mx-2'>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Enter your name"
                                className="form-input "
                            />
                        </Form.Group>

                    </div>
                    <div className='w-50 mx-2'>
                        <Form.Group>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Enter your mobile number"
                                className="form-input "
                            />
                        </Form.Group>

                    </div>
                </div>

                <div className=' w-75 mx-2'>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="Enter your email address"
                            className="form-input "
                        />
                    </Form.Group>
                </div>

                <div className="d-flex justify-content-center mb-4">
                    <Button
                        variant="outline-primary"
                        onClick={() => setIsEditing(!isEditing)}
                        className="edit-button"
                    >
                        <FaEdit /> {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>

                    {isEditing && (
                        <Button variant="success" onClick={e => handleSubmit()} className="save-button">
                            Save Changes
                        </Button>
                    )}
                </div>
            </Form >




        </Container >
    );
};

export default Profile;
