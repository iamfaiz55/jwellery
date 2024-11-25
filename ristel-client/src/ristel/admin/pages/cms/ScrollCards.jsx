import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { useGetAllScrollCardsQuery } from '../../../../redux/apis/publicApi';
import { useAddScrollCardMutation, useDeleteScrollCardMutation, useUpdateScrollCardMutation } from '../../../../redux/apis/adminApi';
import { toast } from 'react-toastify';
// import { useGetAllScrollCardsQuery } from '../redux/apis/openApi';
// import { useAddScrollCardMutation, useDeleteScrollCardMutation, useUpdateScrollCardMutation } from '../redux/apis/adminApi';
// import { toast } from 'sonner';

const ScrollCards = () => {
    const { data, refetch } = useGetAllScrollCardsQuery();
    const [selectedData, setSelectedData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [deleteScrollCard, { isSuccess }] = useDeleteScrollCardMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Scroll card deleted successfully");
            refetch();
        }
    }, [isSuccess, refetch]);

    const handleShowModal = (data = null) => {
        setSelectedData(data || {});
        setIsEditing(!!data);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="p-4 bg-white text-blue-700">
            <div className="text-center mb-4">
                <Button
                    variant="primary"
                    onClick={() => handleShowModal()}
                    className="btn-lg"
                >
                    Add ScrollCards
                </Button>
            </div>
            <Table bordered hover className="text-blue-700">
                <thead className="bg-blue-50 text-blue-900">
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Link</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>
                                <img src={item.image} alt={item.title} width={100} />
                            </td>
                            <td>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                    {item.link}
                                </a>
                            </td>
                            <td>{item.desc}</td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleShowModal(item)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => deleteScrollCard(item._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ScrollCardsForm
                show={showModal}
                onHide={handleCloseModal}
                edit={selectedData}
                isEditing={isEditing}
                refetch={refetch}
            />
        </div>
    );
};

const ScrollCardsForm = ({ show, onHide, edit, isEditing, refetch }) => {
    const [addScrollCard, { isSuccess: addSuccess, isLoading: addLoading }] = useAddScrollCardMutation();
    const [updateScrollCard, { isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateScrollCardMutation();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: edit?.title || '',
            link: edit?.link || '',
            image: '',
            desc: edit?.desc || '',
        },
        validationSchema: yup.object({
            title: yup.string().required('Enter title'),
            link: yup.string().required('Enter link'),
            image: yup.mixed().required('Upload an image'),
            desc: yup.string().required('Enter Description'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const fd = new FormData();
            fd.append('title', values.title);
            fd.append('link', values.link);
            fd.append('images', values.image);
            fd.append('desc', values.desc);

            if (isEditing) {
                await updateScrollCard({ fd, _id: edit._id });
            } else {
                await addScrollCard(fd);
            }

            resetForm();
            refetch();
            onHide();
        },
    });

    useEffect(() => {
        if (addSuccess) toast.success("ScrollCards added successfully");
    }, [addSuccess]);

    useEffect(() => {
        if (updateSuccess) toast.success("ScrollCards updated successfully");
    }, [updateSuccess]);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit ScrollCards' : 'Add ScrollCards'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            className='w-100'
                            {...formik.getFieldProps('title')}
                            isInvalid={formik.touched.title && !!formik.errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Link</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('link')}
                            isInvalid={formik.touched.link && !!formik.errors.link}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.link}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
                            isInvalid={formik.touched.image && !!formik.errors.image}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.image}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>DESC</Form.Label>
                        <Form.Control
                            type="text"
                            {...formik.getFieldProps('desc')}
                            isInvalid={formik.touched.desc && !!formik.errors.desc}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.desc}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {isEditing && edit.image && (
                        <div className="mb-3">
                            <img src={edit.image} alt="Scroll Card" width={100} />
                        </div>
                    )}
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-100"
                        disabled={addLoading || updateLoading}
                    >
                        {addLoading || updateLoading ? (
                            <Spinner animation="border" size="sm" />
                        ) : isEditing ? (
                            'Update ScrollCard'
                        ) : (
                            'Add ScrollCard'
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ScrollCards;
