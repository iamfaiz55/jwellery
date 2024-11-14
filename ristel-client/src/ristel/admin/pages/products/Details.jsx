
import React, { useEffect, useState } from 'react';
// import { , Button, Modal, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Modal, Table, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogoutAdminMutation } from '../../../../redux/apis/adminAuthApi';
import { useDeleteProductMutation, useGetAllProductsAdminQuery, useUpdateProdMutation } from '../../../../redux/apis/adminApi';

const Details = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [logoutAdmin] = useLogoutAdminMutation()
    const [editData, setEditData] = useState({})
    const { data: products, refetch, isError: isProdError, error: prodError, isLoading } = useGetAllProductsAdminQuery()
    const [deleteProduct, { isSuccess: deleteSuccess, isError, error }] = useDeleteProductMutation()
    // console.log(products);
    // const [varients, setVarients] = useState()


    // console.log(varients);
    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (deleteSuccess) {
    //         toast.success("Product Delete Success")
    //         refetch()
    //     }
    // }, [deleteSuccess])
    // useEffect(() => {
    //     if (isProdError) {
    //         toast.error(prodError && prodError.data && prodError.data.message)
    //         // toast.error(JSON.stringify(prodError.status))

    //     }
    // }, [isProdError])
    // useEffect(() => {
    //     if (isProdError && prodError.status == 409) {
    //         // toast.error(prodError.data.message)
    //         logoutAdmin()

    //     }
    // }, [isProdError])
    const [showModal, setShowModal] = useState(false);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const openEditModal = (product) => {
        setEditProduct(product);
        setShowFormModal(true);
    };
    // console.log(selectedVariants);
    const closeFormModal = () => {
        setShowFormModal(false);
        setEditProduct(null);
    };
    const openVariantsModal = (variants) => {
        setSelectedVariants(variants);
        setShowModal(true);
    };

    const closeVariantsModal = () => {
        setShowModal(false);
        setSelectedVariants([]);
    };
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const openUpdateModal = (product) => {
        setCurrentProduct(product);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setCurrentProduct(null);
    };

    const handleProductUpdate = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
        closeUpdateModal();
    };
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };
    return <>
        <Container fluid className="my-4">


            <Row className="mt-4">
                <Col>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : isError ? (
                        <div>Error loading products</div>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th> Image</th>
                                    {/* <th>Description</th> */}
                                    <th>Variant</th>
                                    <th>Material</th>
                                    <th>Type</th>
                                    <th>Purity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>
                                            <div className="">
                                                {product.images.map((img, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={img}
                                                        alt={product.name}
                                                        height={50}
                                                        width={50}
                                                        className="rounded-md shadow-sm"
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        {/* <td>{product.mainDesc}</td> */}
                                        <td>
                                            <Button
                                                variant="info"
                                                onClick={() => openVariantsModal(product.varient)}
                                            >
                                                View Variants
                                            </Button>
                                        </td>
                                        <td>{product.material}</td>
                                        <td>{product.productType}</td>
                                        <td>{product.purity}</td>
                                        <td>
                                            <Button variant='warning' onClick={() => openUpdateModal(product)}>update </Button >
                                            <Button variant='danger'>Delete</Button >
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>

            {/* Modal to show product variants */}
            <Modal show={showModal} onHide={closeVariantsModal} centered size="lg">
                <Modal.Header closeButton style={{ color: 'white' }}>
                    <Modal.Title>Product Variants</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'white', color: '#333' }}>
                    {/* Table with Product Variant Details */}
                    <Table responsive style={{ border: '1px solid #4169E1' }}>
                        <thead style={{ backgroundColor: '#4169E1', color: 'white' }}>
                            <tr className=''>
                                <th className='text-light'>Price</th>
                                <th className='text-light'>MRP</th>
                                <th className='text-light'>Description</th>
                                <th className='text-light'>Quantity</th>
                                <th className='text-light'>Weight</th>
                                <th className='text-light'>Dimensions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedVariants && selectedVariants.length > 0 ? (
                                selectedVariants.map((variant, index) => (
                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f7f7f7' : 'white' }}>
                                        <td>{formatCurrency(variant.price)}</td>
                                        <td>{formatCurrency(variant.mrp)}</td>
                                        <td>{variant.desc}</td>
                                        <td>{variant.quantity}</td>
                                        <td>{variant.prductWeight}</td>
                                        <td>{variant.height} x {variant.width}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No variants available.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer >
                    <Button variant="secondary" onClick={closeVariantsModal} style={{ backgroundColor: '#4169E1', color: 'white' }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>





            {/* Update Modal */}
            {currentProduct && (
                <Modal show={showUpdateModal} onHide={closeUpdateModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form2 edit={currentProduct} setShowUpdateModal={setShowUpdateModal} />
                    </Modal.Body>
                </Modal>
            )}
        </Container>
    </>
}

export default Details






const Form2 = ({ edit, setShowUpdateModal }) => {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [updateProd, { isSuccess: updateSuccess, isLoading: updateLoad }] = useUpdateProdMutation();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: edit || {
            name: '',
            images: [],
            varient: [{ price: '', mrp: '', desc: '', height: '', width: '', prductWeight: '', quantity: '' }],
            material: '',
            productType: '',
            mainDesc: '',
            purity: '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
            images: yup.array().min(1, 'At least one image is required'),
            varient: yup.array().of(
                yup.object({
                    price: yup.number().required('Enter price'),
                    mrp: yup.number().required('Enter MRP'),
                    desc: yup.string().required('Enter description'),
                    height: yup.string().required('Enter height'),
                    width: yup.string().required('Enter width'),
                    prductWeight: yup.string().required('Enter product weight'),
                    quantity: yup.number().required('Enter quantity'),
                })
            ),
            material: yup.string().required('Material is required'),
            productType: yup.string().required('Product type is required'),
            mainDesc: yup.string(),
            purity: yup.string().required('Purity is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            console.log(values);

            fd.append('name', values.name);
            fd.append('material', values.material);
            fd.append('productType', values.productType);
            fd.append('mainDesc', values.mainDesc);
            fd.append('purity', values.purity);

            values.images.forEach(file => {
                fd.append('images', file);
            });

            values.varient.forEach((variant, index) => {
                fd.append(`varient[${index}][price]`, variant.price);
                fd.append(`varient[${index}][mrp]`, variant.mrp);
                fd.append(`varient[${index}][desc]`, variant.desc);
                fd.append(`varient[${index}][height]`, variant.height);
                fd.append(`varient[${index}][width]`, variant.width);
                fd.append(`varient[${index}][prductWeight]`, variant.prductWeight);
                fd.append(`varient[${index}][quantity]`, variant.quantity);
            });


            updateProd({ ...edit, fd });


            resetForm();
        },
    });

    const addVariant = () => {
        formik.setFieldValue('varient', [
            ...formik.values.varient,
            { price: '', mrp: '', desc: '', height: '', width: '', prductWeight: '', quantity: '' },
        ]);
    };
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        formik.setFieldValue('images', files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };
    const removeVariant = (index) => {
        const newVariants = [...formik.values.varient];
        newVariants.splice(index, 1);
        formik.setFieldValue('varient', newVariants);
    };

    const handlePriceChange = (e, index) => {
        const { value } = e.target;
        const price = parseFloat(value);
        const mrp = formik.values.varient[index].mrp;
        const discount = mrp ? mrp - price : 0;

        formik.setFieldValue(`varient[${index}].price`, price);
        formik.setFieldValue(`varient[${index}].discount`, discount);
    };

    const handleMrpChange = (e, index) => {
        const { value } = e.target;
        const mrp = parseFloat(value);
        const price = formik.values.varient[index].price;
        const discount = price ? mrp - price : 0;

        formik.setFieldValue(`varient[${index}].mrp`, mrp);
        formik.setFieldValue(`varient[${index}].discount`, discount);
    };

    // let isLoading = false

    return (
        <Container className="mt-5">
            {updateLoad ? (
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Form onSubmit={formik.handleSubmit}>
                    {/* Product Name */}
                    <Form.Group controlId="productName" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            {...formik.getFieldProps('name')}
                            type="text"
                            placeholder="Enter product name"
                        />
                    </Form.Group>

                    {/* Image Upload */}
                    <Form.Group controlId="productImages" className="mb-3">
                        <Form.Label>Product Images</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            onChange={(e) => {
                                const files = Array.from(e.currentTarget.files);
                                formik.setFieldValue('images', files);
                            }}
                        />
                    </Form.Group>

                    {/* Image Preview Section */}
                    {edit?.images?.length > 0 && (
                        <Card className="mb-3">
                            <Card.Body>
                                <h5>Image Previews</h5>
                                <div className="d-flex overflow-auto">
                                    {edit.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Image Preview ${index + 1}`}
                                            className="img-thumbnail me-2"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* Main Description */}
                    <Form.Group controlId="productMainDesc" className="mb-3">
                        <Form.Label>Main Description</Form.Label>
                        <Form.Control
                            {...formik.getFieldProps('mainDesc')}
                            type="text"
                            placeholder="Enter main description"
                        />
                    </Form.Group>

                    {/* Material Selection */}
                    <Form.Group controlId="productMaterial" className="mb-3">
                        <Form.Label>Material</Form.Label>
                        <Form.Control as="select" {...formik.getFieldProps('material')}>
                            <option value="">Choose Material</option>
                            <option value="gold">Gold</option>
                            <option value="diamond">Diamond</option>
                            <option value="bronz">Bronze</option>
                            <option value="white-gold">White Gold</option>
                            <option value="rose-gold">Rose Gold</option>
                            <option value="platinum">Platinum</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Product Type Selection */}
                    <Form.Group controlId="productType" className="mb-3">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control as="select" {...formik.getFieldProps('productType')}>
                            <option value="">Choose Product Type</option>
                            <option value="rings">Rings</option>
                            <option value="earings">Earrings</option>
                            <option value="necklace">Necklaces</option>
                            <option value="mangalsutra">Mangalsutra</option>
                            <option value="chain">Chain</option>
                            <option value="pendent">Pendent</option>
                            <option value="nose-pin">Nose Pin</option>
                            <option value="bangles">Bangles</option>
                            <option value="forehead-ornament">Forehead Ornament</option>
                            <option value="anklet">Anklets</option>
                            <option value="coins">Coins</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Purity Selection */}
                    <Form.Group controlId="productPurity" className="mb-3">
                        <Form.Label>Purity</Form.Label>
                        <Form.Control as="select" {...formik.getFieldProps('purity')}>
                            <option value="">Select Purity</option>
                            <option value="24">24k</option>
                            <option value="18">18k</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Variants */}
                    {formik.values.varient.map((variant, index) => (
                        <Card key={index} className="mb-3">
                            <Card.Body>
                                <h5>Variant {index + 1}</h5>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId={`variantPrice${index}`} className="mb-3">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                {...formik.getFieldProps(`varient[${index}].price`)}
                                                type="number"
                                                placeholder="Enter price"
                                                onChange={(e) => handlePriceChange(e, index)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId={`variantMrp${index}`} className="mb-3">
                                            <Form.Label>MRP</Form.Label>
                                            <Form.Control
                                                {...formik.getFieldProps(`varient[${index}].mrp`)}
                                                type="number"
                                                placeholder="Enter MRP"
                                                onChange={(e) => handleMrpChange(e, index)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId={`variantDesc${index}`} className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        {...formik.getFieldProps(`varient[${index}].desc`)}
                                        type="text"
                                        placeholder="Enter description"
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId={`variantHeight${index}`} className="mb-3">
                                            <Form.Label>Height</Form.Label>
                                            <Form.Control
                                                {...formik.getFieldProps(`varient[${index}].height`)}
                                                type="text"
                                                placeholder="Enter height"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId={`variantWidth${index}`} className="mb-3">
                                            <Form.Label>Width</Form.Label>
                                            <Form.Control
                                                {...formik.getFieldProps(`varient[${index}].width`)}
                                                type="text"
                                                placeholder="Enter width"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId={`variantWeight${index}`} className="mb-3">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control
                                        {...formik.getFieldProps(`varient[${index}].prductWeight`)}
                                        type="text"
                                        placeholder="Enter product weight"
                                    />
                                </Form.Group>

                                <Form.Group controlId={`variantQuantity${index}`} className="mb-3">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        {...formik.getFieldProps(`varient[${index}].quantity`)}
                                        type="number"
                                        placeholder="Enter quantity"
                                    />
                                </Form.Group>

                                <Button variant="danger" onClick={() => removeVariant(index)} className="mt-3">
                                    Remove Variant
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}

                    {/* Add Variant Button */}
                    <Button variant="primary" onClick={addVariant} className="w-100 mb-3">
                        Add Variant
                    </Button>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-between">
                        <Button type="submit" variant="success">
                            Update Product
                        </Button>
                        <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                            Close
                        </Button>
                    </div>
                </Form>
            )}
        </Container>
    );
};

// export default Form;


// export default ProductForm;
