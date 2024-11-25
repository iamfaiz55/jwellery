/**
 *  * TODO: https://www.npmjs.com/package/to-words  add number to word while using price input
 * TODO: https://www.npmjs.com/package/unique-slug to genrate unique slug
 **/

import { Row, Col, Breadcrumb, Card, Form, Image, Spinner, Button, FloatingLabel, Accordion } from 'react-bootstrap'
import React, { useState, Fragment, useEffect, useRef } from 'react'
import Flatpickr from 'react-flatpickr'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import ReactQuill from 'react-quill'
import ReactTagInput from '@pathofdev/react-tag-input'
import { useAddProductMutation, useGetAdminProductGeneralSettingsQuery } from '../../../../redux/apis/adminApi'
import slug from 'slug'
import { useFieldArray, useForm } from 'react-hook-form'
import Nav from 'react-bootstrap/Nav';
import Icon from '@mdi/react'
import { mdiStar, mdiTrashCan } from '@mdi/js'
import { useFormik } from 'formik'
import * as yup from 'yup'
import "./product.css"
import { toast } from 'react-toastify'
import { useAddCartMutation, useGetReviewsQuery, useLikeMutation } from '../../../../redux/apis/userApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetTaxesQuery } from '../../../../redux/apis/publicApi'
import Slider from 'react-slick'

const AddProduct = ({ edit }) => {
    const [addProd, { isSuccess, isLoading: prodLoading }] = useAddProductMutation()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: edit || {
            name: "",
            images: [],
            varient: [],
            material: "",
            productType: "",
            mainDesc: "",
            purity: "",
            slug: "",
            // rating: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Name is required"),
            slug: yup.string(),
            images: yup.array().min(1, "At least one image is required"),
            varient: yup.array().of(
                yup.object({
                    price: yup.number().required("Enter price"),
                    mrp: yup.number().required("Enter MRP"),
                    desc: yup.string().required("Enter description"),
                    height: yup.string(),
                    width: yup.string().required("Enter width"),
                    // width: yup.string().required("Enter width"),
                    prductWeight: yup.string(),
                    quantity: yup.number().required("Enter quantity"),
                })
            ),
            material: yup.string().required("Material is required"),
            productType: yup.string().required("Product type is required"),
            mainDesc: yup.string(),
            purity: yup.string().required("Purity is required"),
            // rating: yup.number().min(1).max(5).required("Rating is required"),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData();
            // console.log(values);

            fd.append("name", values.name);
            fd.append("material", values.material);
            fd.append("productType", values.productType);
            fd.append("mainDesc", values.mainDesc);
            fd.append("purity", values.purity);
            fd.append("slug", values.slug);
            // fd.append("rating", values.rating);

            values.images.forEach(file => {
                fd.append("images", file);
            });

            values.varient.forEach((variant, index) => {
                fd.append(`varient[${index}][price]`, variant.price);
                fd.append(`varient[${index}][mrp]`, variant.mrp);
                fd.append(`varient[${index}][discount]`, variant.discount);
                fd.append(`varient[${index}][desc]`, variant.desc);
                fd.append(`varient[${index}][height]`, variant.height);
                fd.append(`varient[${index}][width]`, variant.width);
                fd.append(`varient[${index}][prductWeight]`, variant.prductWeight);
                fd.append(`varient[${index}][quantity]`, variant.quantity);
            });
            console.log(fd);

            if (edit) {
                updateProd({ ...edit, fd });
            } else {
                addProd(fd);
            }


            resetForm();
        },
    });


    // dynamic varient start
    const [tabs, setTabs] = useState([
        {
            key: 'first',
            title: 'Varient 1',
            content: <Row>
                <Col md={6}>
                    <FloatingLabel label="Product MRP" className="mb-3" controlId={`formBasicEmail-1`}>
                        <Form.Control type="number" {...formik.getFieldProps(`varient.${0}.mrp`)} placeholder="Enter Product MRP" />
                    </FloatingLabel>
                    {/* <span>{formik.values(`varient.${0}.mrp`)}</span> */}
                </Col>
                <Col md={6}>
                    <FloatingLabel label="Selling Price" className="mb-3" controlId={`formBasicPassword-1`}>
                        <Form.Control type="number"{...formik.getFieldProps(`varient.${0}.price`)} placeholder="Selling price" />
                    </FloatingLabel>
                </Col>
                <Col md={6}>
                    <FloatingLabel label="Product width" className="mb-3" controlId={`formBasicPassword-1`}>
                        <Form.Control type="number" {...formik.getFieldProps(`varient.${0}.width`)} placeholder="Product width" />
                    </FloatingLabel>
                </Col>
                <Col md={6}>
                    <FloatingLabel label="Product Hight" className="mb-3" controlId={`formBasicEmail-1`}>
                        <Form.Control type="number" {...formik.getFieldProps(`varient.${0}.hight`)} placeholder="Enter Product hight" />
                    </FloatingLabel>
                </Col>
                <Col md={6}>
                    <FloatingLabel label="Product productWeight" className="mb-3" controlId={`formBasicEmail-1`} >
                        <Form.Control type="number" {...formik.getFieldProps(`varient.${0}.productWeight`)} placeholder="Enter Product Weight" />
                    </FloatingLabel>
                </Col>
                <Col md={6}>
                    <FloatingLabel label="Available Stock quantity" className="mb-3" controlId={`formBasicEmail-1`}>
                        <Form.Control type="number" {...formik.getFieldProps(`varient.${0}.quantity`)} placeholder="Enter Available Product Stock quantity" />
                    </FloatingLabel>
                </Col>
                <Col>

                    {/* <ReactQuillEditor
                        {...register("desc", { required: true })}
                        value={getValues("desc")} // Value from form state
                        onChange={val => setValue(val)} // Update form state with new value
                    /> */}
                    <Form.Group controlId="desc" className="mb-3">
                        <Form.Label>Variant Description</Form.Label>
                        {/* <ReactQuillEditor
                            value={getValues(`varient.${0}.desc`)} 
                            name={`varient.${0}.desc`}
                            setValue={handleEditorChange}  
                        /> */}
                        <ReactQuill
                            // value={formik.values.v}
                            onChange={val => formik.setFieldValue(`varient.${0}.desc`, val)}
                        />
                    </Form.Group>
                </Col>


            </Row>,
        },
    ]);
    // console.log("tabs", tabs);

    const [activeKey, setActiveKey] = useState('first');
    const [tabCount, setTabCount] = useState(2);



    const addNewTab = () => {
        // Check if the last variant has values before adding a new one
        const lastVariantIndex = tabs.length - 1;
        const lastVariant = formik.values.varient[lastVariantIndex];

        // If the last variant fields are empty, prevent adding a new tab
        if (
            lastVariant &&
            (!lastVariant.price && !lastVariant.mrp && !lastVariant.desc && !lastVariant.height && !lastVariant.width && !lastVariant.productWeight && !lastVariant.quantity)
        ) {
            alert("Please fill out the existing variant fields before adding a new one.");
            return;
        }

        const newTabKey = `tab${tabs.length + 1}`;
        const newVariantIndex = tabs.length; // Use the current length to determine the new variant index

        // Initialize the new variant in Formik before rendering the new tab
        const newVariant = {
            price: "",
            mrp: "",
            desc: "",
            height: "",
            width: "",
            productWeight: "",
            quantity: "",
        };

        // Add the new variant object to Formik state
        formik.setFieldValue(`varient[${newVariantIndex}]`, newVariant);

        // Add the new tab with dynamic form fields
        setTabs([
            ...tabs,
            {
                key: newTabKey,
                title: `Variant ${tabs.length + 1}`,
                content: (
                    <Row>
                        <Col md={6}>
                            <FloatingLabel label="Product MRP" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Product MRP"
                                    {...formik.getFieldProps(`varient[${newVariantIndex}].mrp`)} // Access the correct variant
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel label="Selling Price" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Selling Price"
                                    {...formik.getFieldProps(`varient[${newVariantIndex}].price`)} // Access the correct variant
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel label="Product Width" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Product Width"
                                    {...formik.getFieldProps(`varient[${newVariantIndex}].width`)} // Access the correct variant
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel label="Product Height" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Product Height"
                                    {...formik.getFieldProps(`varient[${newVariantIndex}].height`)} // Access the correct variant
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel label="Product Weight" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Product Weight"
                                    {...formik.getFieldProps(`varient[${newVariantIndex}].prductWeight`)} // Access the correct variant
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel label="Available Stock Quantity" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Available Product Stock Quantity"
                                    {...formik.getFieldProps(`varient[${newVariantIndex}].quantity`)}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <Form.Group controlId="desc" className="mb-3">
                                <Form.Label>Variant Description</Form.Label>
                                <ReactQuill
                                    // value={formik.values.varient[newVariantIndex].desc} // Access the correct variant description
                                    onChange={(val) => formik.setFieldValue(`varient[${newVariantIndex}].desc`, val)} // Update the correct variant's description
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                ),
            },
        ]);

        setActiveKey(newTabKey); // Switch to the newly added tab
        setTabCount(tabCount + 1); // Increment tab count for unique keys
    };


    // dynamic varient end

    // Function to remove a nav item
    const removeNav = (key) => {
        // Filter out the tab to be removed
        const filteredTabs = tabs.filter(tab => tab.key !== key);

        // Update the tabs state
        setTabs(filteredTabs);

        // Remove the corresponding variant from the form state using `remove` from `useFieldArray`
        const indexToRemove = tabs.findIndex(tab => tab.key === key);
        remove(indexToRemove); // This will remove the variant from the form

        // If the removed tab was active, set another tab as active
        if (key === activeKey && filteredTabs.length > 0) {
            setActiveKey(filteredTabs[0].key);  // Set the first remaining tab as active
        } else if (filteredTabs.length === 0) {
            setActiveKey('');  // No tabs left
        }
    };
    const { data, isLoading } = useGetAdminProductGeneralSettingsQuery()


    const generateSlug = () => {
        const { name, material, type, purity } = formik.values;
        return [name, material, type, purity]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };
    let slugReady = generateSlug()
    const [selectedVariant, setSelectedVariant] = useState(0)
    useEffect(() => {
        if (isSuccess) {
            toast.success("Product Added Success")
            // location.reload()
            // location.resetForm()
        }
    }, [isSuccess])
    // const [addToCart, { isSuccess, isError: isAddError, error: addError }] = useAddCartMutation();
    // const { id } = useParams()
    // let addToCart
    const getFormattedPrice = amount => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(amount)
    const getFormattedDiscount = (mrp, price) => (((mrp - price) / mrp) * 100).toFixed(0)
    useEffect(() => {
        setSelectedVariant(formik.values && formik.values.varient[0])
    }, [])
    // const { user } = useSelector((state) => state.user);
    // console.log("user from redux", user);

    // const [like, { isSuccess: likeSuccesss, isError, error }] = useLikeMutation();
    // const [liked, setLiked] = useState(false);

    const handleLikeClick = async () => {
        // console.log("------------");
        // if (user) {

        //     setLiked((prevLiked) => !prevLiked);
        //     await like({ uId: user && user._id, pId: id, varientId: selectedVariant._id });
        // } else if (!user) {
        //     toast.success("Please Login First")
        // }
        // toast.success("Please Login First")
    };
    // useEffect(() => {
    //     if (likeSuccesss) {
    //         toast.success("Liked Success");
    //     }
    // }, [likeSuccesss]);
    // useEffect(() => {
    //     if (isError) {
    //         toast.error(JSON.stringify(error.data.message));
    //     }
    // }, [isError]);
    // useEffect(() => {
    //     if (isSuccess) {
    //         toast.success("Cart Added Success", {
    //             style: {
    //                 backgroundColor: 'white',
    //                 color: 'blue',
    //                 border: '1px solid blue',
    //             },
    //             icon: (
    //                 <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>
    //             ),
    //             progressStyle: {
    //                 backgroundColor: 'blue',
    //             }
    //         });
    //     }
    // }, [isSuccess]);
    return <>

        {
            prodLoading
                ? <>
                    <div className="loader-overlay">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </>
                : <>
                    <form onSubmit={formik.handleSubmit}>

                        <Row>
                            <Col lg={12} md={12} xs={12}>
                                <div className="border-bottom pb-3 mb-3 ">
                                    <div className="mb-2 mb-lg-0">
                                        <h1 className="mb-0 h2 fw-bold"> Add Product </h1>
                                        <Breadcrumb>
                                            <Breadcrumb.Item to="#">Dashboard</Breadcrumb.Item>
                                            <Breadcrumb.Item to="#">Products</Breadcrumb.Item>
                                            <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={7} xs={12}>
                                <Card className="mb-4">
                                    {/* <pre>{JSON.stringify(formik.errors, null, 2)}</pre> */}
                                    {/* <pre>{JSON.stringify(formik.values.variant && formik.values.variant[0].price && formik.values.variant[0].price, null, 2)}</pre> */}
                                    {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
                                    <Card.Header className='fw-bold'>Product Basic Info</Card.Header>
                                    <Card.Body>
                                        <div>
                                            {/* Product Title */}
                                            <Form.Group controlId="productTitle" className="mb-3">
                                                <Form.Label>Product Name</Form.Label>
                                                <Form.Control {...formik.getFieldProps("name")} type="text" placeholder="Enter Product Title" required />
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    {
                                                        isLoading
                                                            ? <Spinner></Spinner>
                                                            : <Form.Group controlId="material" className="mb-3">
                                                                <Form.Label>Product Material</Form.Label>
                                                                <Form.Select {...formik.getFieldProps("material")}>
                                                                    <option value="" disabled selected>Choose Product Material</option>
                                                                    {
                                                                        data && data.material.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
                                                                    }
                                                                </Form.Select>
                                                            </Form.Group>
                                                    }

                                                </Col>
                                                <Col>
                                                    {
                                                        isLoading
                                                            ? <Spinner></Spinner>
                                                            : <Form.Group controlId="type" className="mb-3">
                                                                <Form.Label>Product Types</Form.Label>
                                                                <Form.Select {...formik.getFieldProps("productType")}>
                                                                    <option value="" disabled selected>Choose Product Types</option>
                                                                    {
                                                                        data && data.type.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
                                                                    }
                                                                </Form.Select>
                                                            </Form.Group>
                                                    }

                                                </Col>
                                                <Col>
                                                    {
                                                        isLoading
                                                            ? <Spinner></Spinner>
                                                            : <Form.Group controlId="purity" className="mb-3">
                                                                <Form.Label>Product Purity</Form.Label>
                                                                <Form.Select {...formik.getFieldProps("purity")}>
                                                                    <option value="" disabled selected>Choose Product Purity</option>
                                                                    {
                                                                        data && data.purity.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
                                                                    }
                                                                </Form.Select>
                                                            </Form.Group>
                                                    }

                                                </Col>
                                            </Row>

                                            {/* Product Description */}
                                            <Form.Group controlId="productDescription" className="mb-3">
                                                <Form.Label>Product Description</Form.Label>
                                                {/* <ReactQuillEditor
                     initialValue="<p><br/><br/><br/><br/><br/></p>"
                     on={(value) => console.log(value)
                     }
                 /> */}
                                                <ReactQuill
                                                    // value={formik.values.v}
                                                    onChange={val => formik.setFieldValue("mainDesc", val)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="productSlug" className="mb-3">
                                                <Form.Label>Product Slug</Form.Label>
                                                <Form.Control
                                                    type="text"

                                                    placeholder="Product Slug"
                                                    value={generateSlug()}
                                                    disabled
                                                />
                                            </Form.Group>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <Card className="mb-4">
                                    <Card.Header>Product Gallery</Card.Header>
                                    <Card.Body>
                                        <div>
                                            {/* <Form.Group className="mb-4" controlId="productGallery">
                 <Form.Label className="mb-1">Product Image </Form.Label>
                 <p>Add Product main Image.</p>
                 <Form.Control type="file" />
             </Form.Group> */}

                                            <div>
                                                <h5 className="mb-1">Product Gallery</h5>
                                                <p>Add Product Gallery Images.</p>
                                                <div className="dropzone mt-4 p-4 border-dashed text-center">
                                                    <DropFiles setFieldValue={formik.setFieldValue} fieldName="images" />
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>


                                <Card className="mb-4">
                                    <Card.Header className='d-flex justify-content-between align-items-center'>
                                        <span>Product Varient</span>
                                        <Button variant='outline-primary' onClick={addNewTab} size='sm'>+ Add Varient</Button>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={12}>
                                                <Nav variant="tabs" activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                                                    {tabs.map((tab) => (
                                                        <Nav.Item key={tab.key} className="d-flex justify-content-between align-items-center ">
                                                            <Nav.Link eventKey={tab.key}>{tab.title}
                                                            </Nav.Link>

                                                        </Nav.Item>
                                                    ))}
                                                </Nav>
                                            </Col>
                                            <Col sm={12}>
                                                {/* Render the content corresponding to the active nav item */}
                                                {tabs.map((tab) =>
                                                    tab.key === activeKey && (
                                                        <div key={tab.key} className='mt-3'>
                                                            <div className='d-flex justify-content-between align-items-center mx-2'>
                                                                <h4>{tab.title}</h4>
                                                                {tab.key !== 'first' && (
                                                                    <Button variant="outline-danger" className='ms-2' size="sm" onClick={() => removeNav(tab.key)}>
                                                                        <Icon path={mdiTrashCan} size={0.7} />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                            <hr />
                                                            {tab.content}
                                                        </div>
                                                    )
                                                )}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <div className="d-grid">
                                    <Button type='submit' onClick={e => {
                                        // const values = formik.values
                                        // const fd = new FormData();
                                        // // console.log(values);

                                        // fd.append("name", values.name);
                                        // fd.append("material", values.material);
                                        // fd.append("productType", values.productType);
                                        // fd.append("mainDesc", values.mainDesc);
                                        // fd.append("purity", values.purity);
                                        // fd.append("slug", slugReady);
                                        // // fd.append("rating", values.rating);

                                        // values.images.forEach(file => {
                                        //     fd.append("images", file);
                                        // });

                                        // values.varient.forEach((variant, index) => {
                                        //     fd.append(`varient[${index}][price]`, variant.price);
                                        //     fd.append(`varient[${index}][mrp]`, variant.mrp);
                                        //     fd.append(`varient[${index}][discount]`, variant.discount);
                                        //     fd.append(`varient[${index}][desc]`, variant.desc);
                                        //     fd.append(`varient[${index}][height]`, variant.height);
                                        //     fd.append(`varient[${index}][width]`, variant.width);
                                        //     fd.append(`varient[${index}][prductWeight]`, variant.prductWeight);
                                        //     fd.append(`varient[${index}][quantity]`, variant.quantity);
                                        // });


                                        // addProd(fd)

                                    }} className="btn btn-primary">
                                        Create Product
                                    </Button>
                                </div>
                            </Col>
                            <Col lg={5}>
                                <div className="text-center">
                                    <h4 className='fw-bold'>Preview</h4>
                                </div>
                                <div className="d-flex flex-wrap justify-content-center gap-2 m-3">
                                    {
                                        formik.values.images && formik.values.images.map((img, index) => (
                                            <div key={index} className="position-relative">
                                                <img
                                                    src={img.preview}
                                                    alt={`Product image ${index + 1}`}
                                                    width={90}
                                                    height={90}
                                                    style={{
                                                        objectFit: 'cover',
                                                        borderRadius: '8px',
                                                        border: '2px solid #ddd',
                                                        transition: 'transform 0.3s ease'
                                                    }}
                                                    className="thumbnail-img"
                                                />
                                            </div>
                                        ))
                                    }
                                </div>



                                <Preview data={formik.values} />

                            </Col>


                        </Row>
                    </form>
                </>

        }
    </>
}

const FlatPickr = ({ value, placeholder = 'Select Date' }) => {
    const [picker] = useState(new Date());
    return (
        <Flatpickr
            value={value === '' ? '' : value ? value : picker}
            placeholder={placeholder}
            className="form-control"
        />
    );
}
FlatPickr.propTypes = {
    placeholder: PropTypes.string
}

const FormSelect = ({
    placeholder = '',
    defaultselected = 'Select',
    options = [],
    id = '',
    name = '',
    style = '',
    onChange,
    required = false,
}) => {
    return (
        <Fragment>
            <Form.Select
                defaultValue={defaultselected}
                id={id}
                name={name}
                onChange={onChange}
                required={required}
                style={style ? style : {}}
            >
                {placeholder ? (
                    <option value="" className="text-muted">
                        {placeholder}
                    </option>
                ) : (
                    ''
                )}
                {options.map((item, index) => {
                    return (
                        <option key={index} value={item.value} className="text-dark">
                            {item.label}
                        </option>
                    );
                })}
            </Form.Select>
        </Fragment>
    );
}
FormSelect.propTypes = {
    placeholder: PropTypes.string,
    defaultselected: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool
}

// drop files
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
    boxSizing: 'border-box'
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
const DropFiles = ({ setFieldValue, fieldName }) => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            const previewFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            );

            setFiles(previewFiles); // Update local component state
            setFieldValue(fieldName, previewFiles); // Update Formik state with files
        }
    });

    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <Image src={file.preview} style={img} alt={file.name} />
            </div>
        </div>
    ));

    useEffect(() => {
        // Cleanup to revoke data URIs to avoid memory leaks
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
    );
};


// react quill
// const ReactQuillEditor = ({ value, setValue, name }) => {
//     return (
//         <ReactQuill
//             value={value}
//             onChange={(content) => setValue(name, content)}  // Correctly pass the content to the parent onChange function
//         />
//     );
// };

// tag
const GKTagsInput = ({ defaulttags = [] }) => {
    const [tags, setTags] = React.useState(defaulttags);
    return <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />;
}




GKTagsInput.propTypes = {
    defaulttags: PropTypes.array
}



const Preview = ({ data }) => {
    // console.log(data);
    const getFormattedPrice = amount => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(amount)
    const getFormattedDiscount = (mrp, price) => (((mrp - price) / mrp) * 100).toFixed(0)

    return <>
        <Fragment>
            <div>
                <h2>{data && data.name} </h2>
                <div>
                    <span><span className="me-1 text-dark fw-semibold">{data && data.rating} <Icon path={mdiStar} size={0.6} className="text-success" />
                    </span>592 Customer Reviews</span>
                </div>
            </div>
            <hr className="my-3" />
            <div>
                {/* <h1>{data && data.mainDesc} </h1> */}
                <div>
                    <span className="me-1 ">{data && data.mainDesc}</span>
                </div>
            </div>
            <hr className="my-3" />
            <div className="mb-5">
                <h4 className="mb-1">
                    <span className="text-danger  me-2 fs-3 fw-light">-{data.varient && data.varient[0] && data.varient[0].price}%</span>
                    <span className='me-2 fs-3'>₹{data.varient && data.varient[0] && data.varient[0].price}</span>
                    {/* <pre>{JSON.stringify(data.varient && data.varient[0].price, null, 2)}</pre> */}
                    MRP <span className="text-muted text-decoration-line-through ">₹{data.variant && data.variant[0] && data.variant[0].mrp}</span>
                </h4>
                <span>inclusive of all taxes</span>

                <p className='pt-3'>Varients</p>
                <div className='d-flex gap-2 overflow-x-auto'>
                    {data && data.varient && data.varient.map((item, i) => <div onClick={e => setSelectedVariant(item)} className={`alert border border-2 ${data.variant && data.variant[0]._id === item._id && " alert-success"}`} style={{ cursor: "pointer" }}>
                        <h5 className='d-flex justify-content-between'>{data.name} {item.prductWeight}  <span className='text-danger '>-{getFormattedDiscount(item.mrp, item.price)}%</span></h5>

                        <p className='m-0'> <strong>₹{item.price}</strong> MRP: <del>₹{item.mrp}</del>

                        </p>
                    </div>)}
                </div>
            </div>

            <Accordion defaultActiveKey="0" >
                <Accordion.Item eventKey="0" className='border-end-0 border-start-0'>
                    <Accordion.Header ><span className='fw-bold'>Product Details</span></Accordion.Header>
                    <Accordion.Body>
                        {data && data.varient && data.varient[0] && data.varient[0].desc}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className='border-end-0 border-start-0'>
                    <Accordion.Header ><span className='fw-bold'>Specifications</span></Accordion.Header>
                    <Accordion.Body>
                        {/* {data && data.specification} */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className='border-end-0 border-start-0'>
                    <Accordion.Header ><span className='fw-bold'>Free Shipping Policy</span></Accordion.Header>
                    <Accordion.Body>
                        {/* {data && data.freeShippingPolicy} */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className='border-end-0 border-start-0'>
                    <Accordion.Header ><span className='fw-bold'>Refund Policy</span></Accordion.Header>
                    <Accordion.Body>
                        {/* {data && data.refundPolicy} */}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* <Row>
                                        <Col md={6}>
                                            <div className="d-grid mb-2 mb-md-0">
                                                <button onClick={e => {
                                                    // if (user) {
                                                    //     addToCart({ pId: formik.values._id, uId: user?._id, varientId: selectedVariant._id })
                                                    // }
                                                    // toast.success("Please Login First")
                                                }} className="btn btn-success"><i className="fe fe-shopping-cart me-2"></i>Add
                                                    To Cart</button>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="d-grid">
                                                <button onClick={handleLikeClick} className="btn btn-outline-secondary"><i className="fe fe-heart me-2"></i>Wishlist</button>
                                            </div>
                                        </Col>
                                    </Row> */}
        </Fragment >
    </>
}







export default AddProduct