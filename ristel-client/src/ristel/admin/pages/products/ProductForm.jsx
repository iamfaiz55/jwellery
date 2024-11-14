

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { FaStar } from 'react-icons/fa';
import { useAddProductMutation, useDeleteProductMutation, useGetAllProductsAdminQuery, useUpdateProdMutation } from './../../../../redux/apis/adminApi';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useDropzone } from 'react-dropzone';
import { Image, Button } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
const ProductForm = () => {
    const [variants, setVariants] = useState([]);
    const [productData, setProductData] = useState();
    const [galleryImages, setGalleryImages] = useState([]);
    const [isNew, setIsNew] = useState(false)
    const [hoveredRating, setHoveredRating] = useState(0)
    const { data, refetch, isError: isProdError, error: prodError } = useGetAllProductsAdminQuery();

    const [addProduct, { isSuccess: addSuccess, isLoading: addLoading, isError: addError, error: addProdError }] = useAddProductMutation();

    const [updateProduct, { isSuccess: updateSuccess, isLoading: updateLoad, isError: updateError, error: updateProdError }] = useUpdateProdMutation();

    const [deleteProduct, { isSuccess: deleteSuccess, isLoading: deleteLoading, isError: deleteError, error: deleteProdError }] = useDeleteProductMutation();

    const handleAddVariant = () => {
        setVariants([...variants, {
            mrp: '',
            price: '',
            discount: '',
            height: '',
            width: '',
            productWeight: '',
            material: '',
            productType: '',
            purity: '',
            desc: '',
            productDetails: '',
            specification: '',
            refundPolicy: '',
            freeShippingPolicy: '',
        }])
    }

    const loadSavedValues = () => {
        const savedValues = localStorage.getItem('productFormValues');
        return savedValues ? JSON.parse(savedValues) : {
            name: productData ? productData.name : "Skillhub",
            mrp: productData ? productData.mrp : "1",
            image: productData ? productData.image : "",
            price: productData ? productData.price : "2",
            discount: productData ? productData.discount : "2",
            height: productData ? productData.height : "2",
            width: productData ? productData.width : "2",
            prductWeight: productData ? productData.prductWeight : "2",
            material: productData ? productData.material : "Gold",
            productType: productData ? productData.productType : "Rings",
            desc: productData ? productData.desc : "f",
            purity: productData ? productData.purity : "18K",
            productDetails: productData ? productData.productDetails : "f",
            specification: productData ? productData.specification : "f",
            refundPolicy: productData ? productData.refundPolicy : "f",
            freeShippingPolicy: productData ? productData.freeShippingPolicy : "f",
            rating: productData ? productData.rating : "",
        };
    };

    // Formik setup
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: loadSavedValues(),
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
            mrp: yup.string().required('MRP is required'),
            image: yup.mixed().required('Image URL is required'),
            price: yup.string().required('Price is required'),
            discount: yup.string().required('Discount is required'),
            height: yup.string().required('Height is required'),
            width: yup.string().required('Width is required'),
            productWeight: yup.string().required('Product Weight is required'),
            material: yup.string().required('Material is required'),
            productType: yup.string().required('Product Type is required'),
            desc: yup.string().required('Description is required'),
            purity: yup.string().required('Purity is required'),
            productDetails: yup.string().required('Product Details are required'),
            specification: yup.string().required('Specification is required'),
            refundPolicy: yup.string().required('Refund Policy is required'),
            freeShippingPolicy: yup.string().required('Free Shipping Policy is required'),
            rating: yup.number().required('Rating is required').min(1).max(5),
        }),

        onSubmit: async (values, { resetForm }) => {
            const fd = new FormData();

            if (values.image instanceof File) {
                fd.append('image', values.image);
            } else {
                console.error("Main image is missing or not a valid file.");
                return;
            }

            for (const key in values) {
                if (values.hasOwnProperty(key) && key !== 'image' && values[key] !== undefined && values[key] !== null) {
                    fd.append(key, values[key]);
                }
            }

            if (galleryImages.length > 0) {
                galleryImages.forEach((file) => {
                    fd.append('galleryImages', file);
                });
            } else {
                console.warn("No gallery images selectedd");
            }

            try {

                const response = productData
                    ? await updateProduct(fd)
                    : await addProduct(fd)


                localStorage.setItem('productFormValues', JSON.stringify(values));
                resetForm()
                // setGalleryImages([])

                console.log(response.data);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }

    });

    //  localStorage fuction save to productFormValues value
    const saveToLocalStorage = () => {
        localStorage.setItem('productFormValues', JSON.stringify(formik.values));
        console.log('Data saved to  the local storage:', formik.values);
    };


    useEffect(() => {
        const time = setInterval(() => {
            saveToLocalStorage();
        }, 5000);

        return () => clearInterval(time);
    }, [formik.values]);













    const handleClasses = (arg) => clsx({
        "form-control my-2": true,
        "is-invalid": formik.touched[arg] && formik.errors[arg],
        "is-valid": formik.touched[arg] && !formik.errors[arg],
    });

    const handleRatingClick = (value) => {
        formik.setFieldValue('rating', value);
    };
    // const handleImageUpload = (e) => {
    //     const file = event.currentTarget.file[0];
    //     if (file) {
    //         formik.setFieldValue('image', file);
    //     }
    // };


    //     setGalleryImages(files);
    //     console.log('Selected files:', files);
    // };
    const handleFilesSelected = (files) => {
        setGalleryImages(files);
        console.log(files)
    };

    //add Toast
    useEffect(() => {
        if (addSuccess) {
            toast.success("Product added successfully");
        }

    }, [addSuccess,]);

    //update toast
    useEffect(() => {
        if (updateSuccess) {
            toast.success("Product updated successfully");
        }

    }, [updateSuccess,]);

    //  Delete Product toast
    useEffect(() => {
        if (deleteSuccess) {
            toast.success("Product deleted successfully");
        }

    }, [deleteSuccess,])
    // error
    // useEffect(() => {
    //     if (updateError) {
    //         toast.error(updateProductError);
    //     }
    // }, [updateError,])
    useEffect(() => {
        if (deleteError) {
            toast.error(deleteProdError)
        }
    }, [deleteError]);
    // useEffect(() => {
    //     if (addError) {
    //         toast.error(addErrorproduct);
    //     }
    // }, [addError])
    return <>
        <pre>{JSON.stringify(formik.data, null, 2)}</pre>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        <pre>{JSON.stringify(formik.errors, null, 2)}</pre>


        <div className="container">
            <div className="row">
                <div className="col-sm-7 offset-sm-3">
                    <div className="card">
                        <div className="card-header justify-content-center d-flex">
                            <h3> Jewellery Product Detailes</h3>
                        </div>
                        <div className="card-body">
                            <Form noValidate onSubmit={formik.handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        className={handleClasses("name", formik)}
                                        {...formik.getFieldProps("name")}
                                        type="text"
                                        placeholder="Enter Your Name"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="mrp">
                                    <Form.Label>MRP</Form.Label>
                                    <Form.Control
                                        className={handleClasses("mrp", formik)}
                                        {...formik.getFieldProps("mrp")}
                                        type="text"
                                        placeholder="Enter MRP"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.mrp}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* images gallery */}

                                <Card.Body>
                                    <div>
                                        <h4 className="mb-4">Product Gallery</h4>

                                        {/* Main Image Upload */}
                                        <Form.Group className="mb-4" controlId="image">
                                            <Form.Label className="mb-1">Product Image </Form.Label>
                                            <p>Add Product main Image.</p>
                                            <Form.Control
                                                id="image"
                                                name="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={e => formik.setFieldValue("image", e.target.files[0])}
                                                className={formik.touched.image && formik.errors.image ? 'is-invalid' : ''}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.image}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* Gallery Images Upload */}
                                        <div>
                                            <h5 className="mb-1">Product Gallery</h5>
                                            <p>Add Product Gallery Images.</p>
                                            <div className="dropzone mt-4 p-4 border-dashed text-center">
                                                <DropFiles onFilesSelected={handleFilesSelected} />
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>




                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        className={handleClasses("price", formik)}
                                        {...formik.getFieldProps("price")}
                                        type="number"
                                        placeholder="Enter Price"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.price}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="discount">
                                    <Form.Label>Discount</Form.Label>
                                    <Form.Control
                                        className={handleClasses("discount", formik)}
                                        {...formik.getFieldProps("discount")}
                                        type="text"
                                        placeholder="Enter Discount"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.discount}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="height">
                                    <Form.Label>Height</Form.Label>
                                    <Form.Control
                                        className={handleClasses("height", formik)}
                                        {...formik.getFieldProps("height")}
                                        type="text"
                                        placeholder="Enter Height"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.height}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="width">
                                    <Form.Label>Width</Form.Label>
                                    <Form.Control
                                        // controlId="width"
                                        className={handleClasses("width", formik)}
                                        {...formik.getFieldProps("width")}
                                        type="text"
                                        placeholder="Enter Width"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.width}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="productWeight">
                                    <Form.Label>Product Weight</Form.Label>
                                    <Form.Control
                                        className={handleClasses("productWeight", formik)}
                                        {...formik.getFieldProps("productWeight")}
                                        type="text"
                                        placeholder="Enter Product Weight"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.productWeight}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="material">
                                    <Form.Label>Material</Form.Label>
                                    <Form.Control
                                        as="select"
                                        {...formik.getFieldProps("material")}
                                        className={handleClasses("material", formik)}
                                    >
                                        <option value="">Choose The Material</option>
                                        <option value="gold">Gold</option>
                                        <option value="diamond">Diamond</option>
                                        <option value="bronze">Bronze</option>
                                        <option value="white-gold">White-Gold</option>
                                        <option value="rose-gold">Rose-Gold</option>
                                        <option value="platinum">Platinum</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.material}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="productType">
                                    <Form.Label>Product Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        {...formik.getFieldProps("productType")}
                                        className={handleClasses("productType", formik)}
                                    >
                                        <option value="">Choose The Type Of Product</option>
                                        <option value="rings">Rings</option>
                                        <option value="earrings">Earrings</option>
                                        <option value="necklace">Necklaces</option>
                                        <option value="mangalsutra">Mangalsutra</option>
                                        <option value="chain">Chain</option>
                                        <option value="pendant">Pendant</option>
                                        <option value="nose-pin">Nose Pin</option>
                                        <option value="bangles">Bangles</option>
                                        <option value="forehead-ornament">Forehead Ornament</option>
                                        <option value="anklet">Anklets</option>
                                        <option value="coins">Coins</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.productType}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="purity">
                                    <Form.Label>Purity</Form.Label>
                                    <Form.Control
                                        as="select"
                                        {...formik.getFieldProps("purity")}
                                        className={handleClasses("purity", formik)}
                                    >
                                        <option value="">Select Purity</option>
                                        <option value="22k">22K</option>
                                        <option value="18k">18K</option>
                                        <option value="14k">14K</option>
                                        <option value="10k">10K</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.purity}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="desc">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        {...formik.getFieldProps("desc")}
                                        as="textarea"
                                        placeholder="Type Description"
                                        className={handleClasses("desc", formik)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.desc}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* productDetails */}
                                <Form.Group controlId="productDetails" className="mb-3">
                                    <Form.Label>Product Details</Form.Label>
                                    <ReactQuill
                                        value={formik.values.productDetails}
                                        onChange={(content) => formik.setFieldValue("productDetails", content)}
                                        onBlur={() => formik.setFieldTouched("productDetails")}
                                    />
                                    {formik.touched.productDetails && formik.errors.productDetails && (
                                        <div className="text-danger">{formik.errors.productDetails}</div>
                                    )}
                                </Form.Group>
                                {/* specification */}
                                <Form.Group controlId="specification" className="mb-3">
                                    <Form.Label>Specification</Form.Label>
                                    <ReactQuill
                                        value={formik.values.specification}
                                        onChange={(content) => formik.setFieldValue("specification", content)}
                                        onBlur={() => formik.setFieldTouched("specification")}
                                    />
                                    {formik.touched.specification && formik.errors.specification && (
                                        <div className="text-danger">{formik.errors.specification}</div>
                                    )}
                                </Form.Group>
                                {/* refundPolicy */}
                                <Form.Group controlId="refundPolicy" className="mb-3">
                                    <Form.Label>Refund Policy</Form.Label>
                                    <ReactQuill
                                        value={formik.values.refundPolicy}
                                        onChange={(content) => formik.setFieldValue("refundPolicy", content)}
                                        onBlur={() => formik.setFieldTouched("refundPolicy")}
                                    />
                                    {formik.touched.refundPolicy && formik.errors.refundPolicy && (
                                        <div className="text-danger">{formik.errors.refundPolicy}</div>
                                    )}
                                </Form.Group>

                                {/* freeShippingPolicy */}
                                <Form.Group controlId="freeShippingPolicy" className="mb-3">
                                    <Form.Label>Free Shipping Policy</Form.Label>
                                    <ReactQuill
                                        value={formik.values.freeShippingPolicy}
                                        onChange={(content) => formik.setFieldValue("freeShippingPolicy", content)}
                                        onBlur={() => formik.setFieldTouched("freeShippingPolicy")}
                                    />
                                    {formik.touched.freeShippingPolicy && formik.errors.freeShippingPolicy && (
                                        <div className="text-danger">{formik.errors.freeShippingPolicy}</div>
                                    )}
                                </Form.Group>

                                {/* rating sathi ahe */}


                                {/* <Form.Group controlId="rating">
                                    <Form.Label>Rating</Form.Label>
                                    <div className="rating" style={{ display: 'flex' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                onClick={() => {
                                                    const currentRating = formik.values.rating;

                                                    if (currentRating === star) {
                                                        formik.setFieldValue('rating', star - 1);
                                                    } else {
                                                        formik.setFieldValue('rating', star);
                                                    }
                                                }}
                                               
                                                color={formik.values.rating >= star ? "gold" : "lightgray"}
                                                style={{ cursor: 'pointer', fontSize: '26px', marginRight: '15px' }}
                                            />
                                        ))}
                                    </div>
                                    {formik.touched.rating && formik.errors.rating ? (
                                        <div className="text-danger">{formik.errors.rating}</div>
                                    ) : null}
                                </Form.Group> */}
                                <Form.Group controlId="rating">
                                    <Form.Label>Rating</Form.Label>
                                    <div className="rating" style={{ display: 'flex' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                onClick={() => {
                                                    const currentRating = formik.values.rating;
                                                    if (currentRating === star) {
                                                        formik.setFieldValue('rating', star - 1)
                                                    } else {
                                                        formik.setFieldValue('rating', star)
                                                    }
                                                }}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                color={hoveredRating >= star || formik.values.rating >= star ? "gold" : "lightgray"}
                                                style={{ cursor: 'pointer', fontSize: '26px', marginRight: '15px' }}
                                            />
                                        ))}
                                    </div>
                                    {formik.touched.rating && formik.errors.rating ? (
                                        <div className="text-danger">{formik.errors.rating}</div>
                                    ) : null}
                                </Form.Group>
                                {/* Vareint from stat */}

                                <h4 className="mt-4">Variants Add</h4>
                                {variants.map((variant, index) => (
                                    <div key={index} className="border p-3 mb-3 bg-gray-100 text-white">
                                        <h5>Variant {index + 1}</h5>
                                        {/* mrp */}
                                        <Form.Group controlId={`variant-mrp-${index}`}>
                                            <Form.Label>MRP</Form.Label>
                                            <Form.Control
                                                value={variant.mrp}
                                                onChange={(e) => {
                                                    const newVariants = [...variants];
                                                    newVariants[index].mrp = e.target.value;
                                                    setVariants(newVariants);
                                                }}
                                                className={handleClasses("mrp", formik)}
                                                {...formik.getFieldProps("mrp")}
                                                type="text"
                                                placeholder="Enter MRP"
                                            />
                                            {formik.touched.mrp && formik.errors.mrp && (
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.mrp}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>




                                        <Form.Group controlId={`variant-price-${index}`}>
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                value={variant.price}
                                                onChange={(e) => {
                                                    const newVariants = [...variants];
                                                    newVariants[index].price = e.target.value;
                                                    setVariants(newVariants);
                                                }}
                                                className={handleClasses("price", formik)}
                                                {...formik.getFieldProps("price")}
                                                type="number"
                                                placeholder="Enter Price"
                                            />
                                            {formik.touched.price && formik.errors.price && (
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.price}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>


                                        <Form.Group controlId={`variant-discount-${index}`}>
                                            <Form.Label>Discount</Form.Label>
                                            <Form.Control
                                                value={variant.discount}
                                                onChange={(e) => {
                                                    const newVariants = [...variants];
                                                    newVariants[index].discount = e.target.value;
                                                    setVariants(newVariants);
                                                }}
                                                className={handleClasses("discount", formik)}
                                                {...formik.getFieldProps("discount")}
                                                type="text"
                                                placeholder="Enter Discount"
                                            />
                                            {formik.touched.discount && formik.errors.discount && (
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.discount}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>


                                        <Form.Group controlId={`variant-height-${index}`}>
                                            <Form.Label>Height</Form.Label>
                                            <Form.Control
                                                value={variant.height}
                                                onChange={(e) => {
                                                    const newVariants = [...variants];
                                                    newVariants[index].height = e.target.value;
                                                    setVariants(newVariants);
                                                }}
                                                className={handleClasses("height", formik)}
                                                {...formik.getFieldProps("height")}
                                                type="text"
                                                placeholder="Enter Height"
                                            />
                                            {formik.touched.height && formik.errors.height && (
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.height}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>

                                        <Form.Group controlId={`variant-width-${index}`}>
                                            <Form.Label>Width</Form.Label>
                                            <Form.Control
                                                value={variant.width}
                                                onChange={(e) => {
                                                    const newVariants = [...variants];
                                                    newVariants[index].width = e.target.value;
                                                    setVariants(newVariants);
                                                }}
                                                className={handleClasses("width", formik)}
                                                {...formik.getFieldProps("width")}
                                                type="text"
                                                placeholder="Enter Width"
                                            />
                                            {formik.touched.width && formik.errors.width && (
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.width}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>


                                        <Form.Group controlId={`variant-weight-${index}`}>
                                            <Form.Label>Product Weight</Form.Label>
                                            <Form.Control
                                                value={variant.productWeight}
                                                onChange={(e) => {
                                                    const newVariants = [...variants];
                                                    newVariants[index].productWeight = e.target.value;
                                                    setVariants(newVariants);
                                                }}
                                                className={handleClasses(`variants[${index}].productWeight`, formik)}
                                                {...formik.getFieldProps(`variants[${index}].productWeight`)}
                                                type="text"
                                                placeholder="Enter Product Weight"
                                            />
                                            {formik.touched.variants?.[index]?.productWeight && formik.errors.variants?.[index]?.productWeight && (
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.variants[index].productWeight}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>


                                        <Form.Group controlId={`variant-purity-${index}`}>
                                            <Form.Label>Purity</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={variant.purity}
                                                onChange={(e) => {
                                                    const newVariants = [...variants];
                                                    newVariants[index].purity = e.target.value;
                                                    setVariants(newVariants);
                                                }}
                                                className={handleClasses(`variants[${index}].purity`, formik)}
                                                {...formik.getFieldProps(`variants[${index}].purity`)}
                                            >
                                                <option value="">Select Purity</option>
                                                <option value="22k">22K</option>
                                                <option value="18k">18K</option>
                                                <option value="14k">14K</option>
                                                <option value="10k">10K</option>
                                            </Form.Control>
                                            {formik.touched.variants?.[index]?.purity && formik.errors.variants?.[index]?.purity && (
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.variants[index].purity}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>






                                        {/* Describition */}

                                        <Form.Group controlId={`variant-desc-${index}`}>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                value={variant.desc}
                                                onChange={(e) => {
                                                    const newVariants = [...variants];
                                                    newVariants[index].desc = e.target.value;
                                                    setVariants(newVariants);
                                                }}
                                                className={handleClasses(`variants[${index}].desc`, formik)}
                                                {...formik.getFieldProps(`variants[${index}].desc`)}
                                                type="text"
                                                placeholder="Enter Description"
                                            />
                                            {formik.touched.variants?.[index]?.desc && formik.errors.variants?.[index]?.desc && (
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.variants[index].desc}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>



                                        {/* productDetails */}
                                        <Form.Group controlId="productDetails" className="text-black mb-3">
                                            <Form.Label>Product Details</Form.Label>
                                            <ReactQuill
                                                {...formik.getFieldProps("productDetails")}
                                                theme="snow"
                                                value={formik.values.productDetails}
                                                onChange={(content) => formik.setFieldValue("productDetails", content)}
                                                onBlur={() => formik.setFieldTouched("productDetails")}
                                            />

                                            {formik.touched.productDetails && formik.errors.productDetails && (
                                                <div className="text-danger">{formik.errors.productDetails}</div>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.productDetails}
                                            </Form.Control.Feedback>
                                        </Form.Group>




                                        {/* specification */}
                                        <Form.Group controlId="specification" className="text-black mb-3">
                                            <Form.Label>Specification</Form.Label>
                                            <ReactQuill
                                                {...formik.getFieldProps("specification")}
                                                theme="snow"
                                                value={formik.values.specification}
                                                onChange={(content) => formik.setFieldValue("specification", content)}
                                                onBlur={() => formik.setFieldTouched("specification")}
                                            />

                                            {formik.touched.specification && formik.errors.specification && (
                                                <div className="text-danger">{formik.errors.specification}</div>
                                            )}
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.specification}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* refundPolicy */}
                                        <Form.Group controlId="refundPolicy" className="text-black mb-3 border border-black p-3">
                                            <Form.Label>Refund Policy</Form.Label>
                                            <ReactQuill
                                                {...formik.getFieldProps("refundPolicy")}
                                                theme="snow"
                                                value={formik.values.refundPolicy}
                                                onChange={(content) => formik.setFieldValue("refundPolicy", content)}
                                                onBlur={() => formik.setFieldTouched("refundPolicy")}
                                            />
                                            {formik.touched.refundPolicy && formik.errors.refundPolicy && (
                                                <div className="text-danger">{formik.errors.refundPolicy}</div>
                                            )}

                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.refundPolicy}
                                            </Form.Control.Feedback>
                                        </Form.Group>





                                        {/* freeShippingPolicy */}
                                        <Form.Group controlId="freeShippingPolicy" className="text-black">
                                            <Form.Label>Free Shipping Policy</Form.Label>
                                            <ReactQuill
                                                {...formik.getFieldProps("freeShippingPolicy")}
                                                theme="snow"
                                                value={formik.values.freeShippingPolicy}
                                                onChange={(content) => formik.setFieldValue("freeShippingPolicy", content)}
                                                onBlur={() => formik.setFieldTouched("freeShippingPolicy")}
                                            />
                                            {formik.touched.freeShippingPolicy && formik.errors.freeShippingPolicy && (
                                                <div className="text-danger">{formik.errors.freeShippingPolicy}</div>
                                            )}

                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.freeShippingPolicy}
                                            </Form.Control.Feedback>
                                        </Form.Group>


                                    </div>
                                ))}
                                {/* Vareint from end */}
                                <hr></hr>
                                {/* add product button */}
                                <div className="flex  mt-3 ">
                                    <Button type="submit" variant="primary" className="w-80">
                                        ADD Product
                                    </Button>{' '}

                                    <Button variant="secondary" onClick={handleAddVariant} className="w-80">
                                        Add Variant
                                    </Button>{' '}

                                    <Button variant="primary" onClick={saveToLocalStorage} style={{ marginLeft: '10px' }}>
                                        Save to Local Storage
                                    </Button>
                                </div>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}





const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
}

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
    position: 'relative'
}

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
}

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
}

const DropFiles = ({ onFilesSelected }) => {
    const [images, setImages] = useState([]);
    const maxImages = 5;

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {

            if (images.length + acceptedFiles.length > maxImages) {
                alert('You can only select up to 5 images.');
                return;
            }

            const newImages = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            );
            setImages((prevImages) => [...prevImages, ...newImages]);
            onFilesSelected([...images, ...newImages]);
        }
    });

    // Function to remove an image
    const handleRemoveImage = (indexToRemove) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages)
        onFilesSelected(updatedImages)
    };

    const thumbs = images.map((file, index) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <Image src={file.preview} style={img} alt={file.name} />
            </div>

            <Button
                variant="danger"
                className="position-absolute top-0 end-0"
                style={{ padding: '2px' }}
                onClick={() => handleRemoveImage(index)}
            >
                <X size={20} />
            </Button>
        </div>
    ));

    useEffect(() => {
        //  component unmounts call clean preicew image url 
        return () => {
            images.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [images]);

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>
                    Drag 'n' drop some files here, or click to select files{' '}
                    <span className="text-danger">(Max Images: 5)</span>
                </p>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
    );
}

export default ProductForm;
