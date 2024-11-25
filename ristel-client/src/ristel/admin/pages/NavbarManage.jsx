import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FieldArray, useFormik } from 'formik';
import * as yup from 'yup';
import { Pencil, Trash } from 'react-bootstrap-icons'; // Import trash icon from React Bootstrap Icons

// import { useAddMenuItemMutation, useDeleteMenuItemMutation } from '../redux/apis/adminApi';
// import { toast } from 'sonner';
// import { useGetAllMenuItemsQuery } from '../redux/apis/openApi';
import { Button, Card, Form, ListGroup, Modal, Spinner } from 'react-bootstrap';
import { useGetAllMenuItemsQuery } from '../../../redux/apis/publicApi';
import { useAddMenuItemMutation, useDeleteMenuItemMutation, useUpdateMenuItemMutation } from '../../../redux/apis/adminApi';
import { toast } from 'react-toastify';

const NavbarManage = () => {
    const [edit, setedit] = useState()
    const { data, refetch } = useGetAllMenuItemsQuery();
    // console.log("data", data);

    const [deleteMenuItem, { isSuccess, isLoading, isError, error }] = useDeleteMenuItemMutation();
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        if (isSuccess) {
            toast.success("Menu Item Delete Success");
            refetch();
        }
    }, [isSuccess]);

    return (
        <div className="container mt-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <h5>Manage Navbar</h5>
                </Card.Header>
                <Card.Body>
                    <Button
                        onClick={() => setShowModal(true)}
                        variant="primary"
                        className="mb-3"
                    >
                        Add Menu Item
                    </Button>
                    <ListGroup>
                        {data && data.map((menuItem, i) => (
                            <React.Fragment key={menuItem._id}>
                                <ListGroup.Item variant="info">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>{menuItem.menuitem}</div>
                                        <div>
                                            <Button
                                                onClick={() => {
                                                    setedit(menuItem);
                                                    setShowModal(true);
                                                }}
                                                variant="success"
                                                size="sm"
                                                className="me-2"
                                            >
                                                <Pencil />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => deleteMenuItem({ menuId: menuItem._id })}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        {/* Displaying the Header */}
                                        {menuItem.header && (
                                            <div className="mb-2">
                                                <strong>Header: </strong> {menuItem.header}
                                            </div>
                                        )}

                                        {/* If the Menu Item has an image */}
                                        {menuItem.menuImage && (
                                            <div className="mb-2">
                                                <img src={menuItem.menuImage} alt="Menu" width="100" height="100" />
                                            </div>
                                        )}

                                        {/* Display Children */}
                                        <ListGroup>
                                            {menuItem.children.map((child, j) => (
                                                <ListGroup.Item key={child._id}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            {i + 1}.{j + 1} - {child.menuitem}
                                                        </div>
                                                        <div>
                                                            {/* Displaying the child link */}
                                                            <Link to={child.link} className="btn btn-link text-primary">
                                                                View Link
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    {/* Displaying the Badge for each Child */}
                                                    {child.badge && (
                                                        <div className="mt-2">
                                                            <strong>Badge: </strong> {child.badge}
                                                        </div>
                                                    )}

                                                    {/* Displaying Grandchildren */}
                                                    {child.grandChildren && child.grandChildren.length > 0 && (
                                                        <ListGroup className="mt-3">
                                                            {child.grandChildren.map((grandChild, k) => (
                                                                <ListGroup.Item key={grandChild._id}>
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <div>
                                                                            {k + 1} - {grandChild.name}
                                                                        </div>
                                                                        <div>
                                                                            <Link to={grandChild.link} className="btn btn-link text-primary">
                                                                                View Link
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </ListGroup.Item>
                                                            ))}
                                                        </ListGroup>
                                                    )}
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </div>
                                </ListGroup.Item>
                            </React.Fragment>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>


            {/* Add Menu Item Modal */}
            <Modal show={showModal} >
                <Modal.Header closeButton onHide={e => setShowModal(false)}>
                    <Modal.Title>Add Menu Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddMenuForm edit={edit} setShowModal={setShowModal} />
                </Modal.Body>
            </Modal>
        </div>
    );
};



const AddMenuForm = ({ edit, setShowModal }) => {
    const [updateMenuItem, { isSuccess: updateSuccess, isLoading: updateLoaing }] = useUpdateMenuItemMutation()
    const { data, refetch } = useGetAllMenuItemsQuery();
    const [addMenuItem, { isSuccess, isLoading }] = useAddMenuItemMutation();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            menuitem: edit?.menuitem || '',
            menuImage: edit?.menuImage || null,
            header: edit?.header || '',
            children: edit?.children || [
                {
                    menuitem: '',
                    image: null,
                    link: '',
                    badge: '',
                    grandChildren: [{ name: '', link: '' }]
                }
            ],
        },
        validationSchema: yup.object({
            menuitem: yup.string().required('Enter Menu Item'),
            header: yup.string().required('Enter Header'),
            children: yup.array().of(
                yup.object({
                    menuitem: yup.string().required('Enter Child Menu Item'),
                    image: yup.mixed(),
                    link: yup.string().required('Enter Link'),
                    badge: yup.string(),
                    grandChildren: yup.array().of(
                        yup.object({
                            name: yup.string().required('Enter Grandchild Name'),
                            link: yup.string().required('Enter Grandchild Link')
                        })
                    ),
                })
            ),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            fd.append('menuitem', values.menuitem);
            // if (values.menuImage) {
            //     fd.append('menuImage', values.menuImage);
            // }
            if (values.header) {
                fd.append('header', values.header);
            }

            values.children.forEach((child, index) => {
                fd.append(`children[${index}].menuitem`, child.menuitem);
                fd.append(`children[${index}].link`, child.link);
                fd.append(`children[${index}].badge`, child.badge);
                if (child.image) {
                    fd.append(`children[${index}].image`, child.image);
                }

                child.grandChildren.forEach((grandChild, gIndex) => {
                    fd.append(`children[${index}].grandChildren[${gIndex}].name`, grandChild.name);
                    fd.append(`children[${index}].grandChildren[${gIndex}].link`, grandChild.link);
                });
            });
            // console.log("--------------");

            if (edit) {
                updateMenuItem({ id: edit.id, formData: fd });
            } else {
                addMenuItem(fd);
            } resetForm();
        },
    });

    const handleAddChild = () => {
        const newChild = {
            menuitem: '',
            image: null,
            link: '',
            badge: '',
            grandChildren: [{ name: '', link: '' }],
        };
        formik.setFieldValue('children', [...formik.values.children, newChild]);
    };

    const handleRemoveChild = (index) => {
        const updatedChildren = formik.values.children.filter((_, i) => i !== index);
        formik.setFieldValue('children', updatedChildren);
    };

    const handleAddGrandChild = (childIndex) => {
        const newGrandChild = { name: '', link: '' };
        const updatedChildren = [...formik.values.children];
        updatedChildren[childIndex].grandChildren.push(newGrandChild);
        formik.setFieldValue('children', updatedChildren);
    };

    const handleRemoveGrandChild = (childIndex, grandChildIndex) => {
        const updatedChildren = [...formik.values.children];
        updatedChildren[childIndex].grandChildren = updatedChildren[childIndex].grandChildren.filter((_, gIndex) => gIndex !== grandChildIndex);
        formik.setFieldValue('children', updatedChildren);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Menu Item Success");
            setShowModal(false)
            // document.getElementById("add").close();
            refetch();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (updateSuccess) {
            toast.success("Menu Item Update Success");
            setShowModal(false)
            // document.getElementById("add").close();
            refetch();
        }
    }, [updateSuccess]);



    return (
        <div className="">
            <Form onSubmit={formik.handleSubmit}>
                <pre>{JSON.stringify(formik.values, null, 2)}</pre>
                <Form.Group controlId="menuitem" className="mb-3 w-100">
                    <Form.Label>Menu Item</Form.Label>
                    <Form.Control
                        className=''
                        type="text"
                        {...formik.getFieldProps('menuitem')}
                        isInvalid={formik.touched.menuitem && formik.errors.menuitem}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.menuitem}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* <Form.Group controlId="menuImage" className="mb-3">
                    <Form.Label>Menu Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={e => formik.setFieldValue('menuImage', e.currentTarget.files[0])}
                        isInvalid={formik.touched.menuImage && formik.errors.menuImage}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.menuImage}
                    </Form.Control.Feedback>
                </Form.Group> */}

                <Form.Group controlId="header" className="mb-3 w-100">
                    <Form.Label>Header</Form.Label>
                    <Form.Control
                        type="text"
                        {...formik.getFieldProps('header')}
                        isInvalid={formik.touched.header && formik.errors.header}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.header}
                    </Form.Control.Feedback>
                </Form.Group>

                {formik.values.children.map((child, childIndex) => (
                    <div key={childIndex} className="border border-2  p-3 mb-3 rounded w-100" >
                        <Form.Group controlId={`children[${childIndex}].menuitem`} className="mb-3">
                            <Form.Label>Child Menu Item</Form.Label>
                            <Form.Control
                                type="text"
                                {...formik.getFieldProps(`children[${childIndex}].menuitem`)}
                                isInvalid={formik.touched.children?.[childIndex]?.menuitem && formik.errors.children?.[childIndex]?.menuitem}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.children?.[childIndex]?.menuitem}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId={`children[${childIndex}].image`} className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={e => formik.setFieldValue(`children[${childIndex}].image`, e.currentTarget.files[0])}
                                isInvalid={formik.touched.children?.[childIndex]?.image && formik.errors.children?.[childIndex]?.image}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.children?.[childIndex]?.image}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId={`children[${childIndex}].link`} className="mb-3">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="text"
                                {...formik.getFieldProps(`children[${childIndex}].link`)}
                                isInvalid={formik.touched.children?.[childIndex]?.link && formik.errors.children?.[childIndex]?.link}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.children?.[childIndex]?.link}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId={`children[${childIndex}].badge`} className="mb-3">
                            <Form.Label>Badge</Form.Label>
                            <Form.Control
                                type="text"
                                label="Badge"
                                {...formik.getFieldProps(`children[${childIndex}].badge`)}
                            />
                        </Form.Group>

                        <div>
                            {child && child.grandChildren && child.grandChildren.map((grandChild, grandChildIndex) => (
                                <div key={grandChildIndex} className="border p-3 mb-3 rounded alert alert-primary ">
                                    <Form.Group controlId={`children[${childIndex}].grandChildren[${grandChildIndex}].name`} className="mb-3">
                                        <Form.Label>Grandchild Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...formik.getFieldProps(`children[${childIndex}].grandChildren[${grandChildIndex}].name`)}
                                            isInvalid={formik.touched.children?.[childIndex]?.grandChildren?.[grandChildIndex]?.name && formik.errors.children?.[childIndex]?.grandChildren?.[grandChildIndex]?.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.children?.[childIndex]?.grandChildren?.[grandChildIndex]?.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId={`children[${childIndex}].grandChildren[${grandChildIndex}].link`} className="mb-3">
                                        <Form.Label>Grandchild Link</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...formik.getFieldProps(`children[${childIndex}].grandChildren[${grandChildIndex}].link`)}
                                            isInvalid={formik.touched.children?.[childIndex]?.grandChildren?.[grandChildIndex]?.link && formik.errors.children?.[childIndex]?.grandChildren?.[grandChildIndex]?.link}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.children?.[childIndex]?.grandChildren?.[grandChildIndex]?.link}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <div className="d-flex justify-content-end">
                                        <Button
                                            variant="danger"
                                            className='btn-sm'
                                            onClick={() => handleRemoveGrandChild(childIndex, grandChildIndex)}
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button
                                variant="success"
                                onClick={() => handleAddGrandChild(childIndex)}
                                className="mb-3 btn-sm"
                            >
                                Add Grandchild
                            </Button>
                        </div>

                        <Button
                            variant="danger"
                            onClick={() => handleRemoveChild(childIndex)}
                        >
                            <Trash />
                        </Button>
                    </div>
                ))}

                <Button
                    variant="success"
                    onClick={handleAddChild}
                    className="mb-3"
                >
                    Add Child Item
                </Button>

                <div className="d-flex mx-auto">
                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="mx-2"
                            onClick={e => {
                                const values = formik.values
                                const fd = new FormData();
                                fd.append('menuitem', values.menuitem);
                                // if (values.menuImage) {
                                //     fd.append('menuImage', values.menuImage);
                                // }
                                if (values.header) {
                                    fd.append('header', values.header);
                                }

                                values.children.forEach((child, index) => {
                                    fd.append(`children[${index}].menuitem`, child.menuitem);
                                    fd.append(`children[${index}].link`, child.link);
                                    fd.append(`children[${index}].badge`, child.badge);
                                    if (child.image) {
                                        fd.append(`children[${index}].image`, child.image);
                                    }

                                    child.grandChildren.forEach((grandChild, gIndex) => {
                                        fd.append(`children[${index}].grandChildren[${gIndex}].name`, grandChild.name);
                                        fd.append(`children[${index}].grandChildren[${gIndex}].link`, grandChild.link);
                                    });
                                });
                                // console.log("--------------");

                                if (edit) {
                                    updateMenuItem({ _id: edit._id, fd });
                                } else {
                                    addMenuItem(fd);
                                }
                                console.log(fd);

                            }}
                        // disabled={isLoading || updateLoaing}
                        >
                            {(isLoading || updateLoaing) && (
                                <Spinner animation="border" size="sm" className="me-2" />
                            )}
                            Submit
                        </Button>
                    </div>
                    <div>
                        <Button
                            type="button"
                            onClick={() => setShowModal(false)}
                            variant="secondary"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};



export default NavbarManage;
