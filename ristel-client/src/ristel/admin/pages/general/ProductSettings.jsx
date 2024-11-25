import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import { useAddAdminProductMaterialMutation, useAddAdminProductPurityMutation, useAddAdminProductTypeMutation, useDeleteAdminProductMaterialMutation, useDeleteAdminProductPurityMutation, useDeleteAdminProductTypeMutation, useGetAdminProductMaterialQuery, useGetAdminProductPurityQuery, useGetAdminProductTypeQuery, useUpdateAdminProductMaterialMutation, useUpdateAdminProductPurityMutation, useUpdateAdminProductTypeMutation } from '../../../../redux/apis/adminApi'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Icon from '@mdi/react';
import { mdiPlus, mdiPencil, mdiTrashCan } from '@mdi/js';

const ProductSettings = () => {
    return <>
        <Row>
            <Col lg={4} className='mt-3 mt-lg-0'> <ProductPurity /> </Col>
            <Col lg={4} className='mt-3 mt-lg-0'> <ProductMaterial /> </Col>
            <Col lg={4} className='mt-3 mt-lg-0'> <ProductType /> </Col>
        </Row>
    </>
}

const ProductPurity = () => {
    const [enableDelete, setEnableDelete] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState()
    const { register, handleSubmit, watch, reset, formState: { errors, } } = useForm();
    const { data } = useGetAdminProductPurityQuery()
    const [addPurity, { isLoading: isLoadingaddPurity, isSuccess: isSucessaddPurity, isError: isErroraddPurity }] = useAddAdminProductPurityMutation()
    const [updatePurity, { isLoading: isLoadingupdatePurity, isSuccess: isSucessupdatePurity, isError: isErrorupdatePurity }] = useUpdateAdminProductPurityMutation()
    const [deletePurity, { isLoading: isLoadingdeletePurity, isSuccess: isSucessdeletePurity, isError: isErrordeletePurity }] = useDeleteAdminProductPurityMutation()
    const handleAdd = data => {
        if (selectedProduct) {
            updatePurity(data)
        } else {
            addPurity(data)
        }
        reset({ name: "" })
    }

    useEffect(() => {
        if (isSucessaddPurity) {
            toast.success("Product Purity Create Success")
        }
    }, [isSucessaddPurity])
    useEffect(() => {
        if (isSucessupdatePurity) {
            toast.success("Product Purity Update Success")
            setSelectedProduct(null)
        }
    }, [isSucessupdatePurity])
    useEffect(() => {
        if (isSucessdeletePurity) {
            toast.error("Product Purity Delete Success")
        }
    }, [isSucessdeletePurity])
    useEffect(() => {
        if (selectedProduct) {
            reset(selectedProduct)
        }
    }, [selectedProduct])
    return <>
        <Card>
            <Card.Header className='d-flex justify-content-between'>
                <span>Manage Product Purity</span>
                <Form.Check
                    checked={enableDelete}
                    onChange={e => setEnableDelete(e.target.checked)}
                    type="switch"
                    id="custom-switch"
                    label="Enable Delete"
                />
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit(handleAdd)}>
                    <InputGroup>
                        <Form.Control placeholder='Enter Purity Name' {...register("name", { required: true })} />
                        {
                            selectedProduct
                                ? <>
                                    <Button variant='warning' type='submit'>Update</Button>
                                    <Button onClick={e => {
                                        reset({ name: "" })
                                        setSelectedProduct(null)
                                    }} variant='outline-dark' type="button">Cancel</Button>
                                </>
                                : <Button type='submit' variant='outline-primary d-flex align-items-center'><Icon path={mdiPlus} size={1} /> <span>Add Purity</span></Button>
                        }

                    </InputGroup>
                </form>
                <hr />
                <Table className='table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map(item => <tr className={item.isDeleted && "table-danger"}>
                                <td>{item.name}</td>
                                <td >
                                    {
                                        item.isDeleted
                                            ? <></>
                                            : <div className="d-flex gap-2">
                                                <Button onClick={e => {
                                                    setSelectedProduct(item)
                                                }} size='sm' variant='outline-warning'> <Icon path={mdiPencil} size={1} /> </Button>
                                                {
                                                    enableDelete && <Button onClick={e => deletePurity(item._id)} size='sm' variant='outline-danger'> <Icon path={mdiTrashCan} size={1} /> </Button>
                                                }
                                            </div>
                                    }

                                </td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </>
}
const ProductMaterial = () => {
    const [enableDelete, setEnableDelete] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState()
    const { register, handleSubmit, watch, reset, formState: { errors, } } = useForm();
    const { data } = useGetAdminProductMaterialQuery()
    console.log("materials", data);

    const [addPurity, { isLoading: isLoadingaddPurity, isSuccess: isSucessaddPurity, isError: isErroraddPurity }] = useAddAdminProductMaterialMutation()
    const [updatePurity, { isLoading: isLoadingupdatePurity, isSuccess: isSucessupdatePurity, isError: isErrorupdatePurity }] = useUpdateAdminProductMaterialMutation()
    const [deletePurity, { isLoading: isLoadingdeletePurity, isSuccess: isSucessdeletePurity, isError: isErrordeletePurity }] = useDeleteAdminProductMaterialMutation()
    const handleAdd = data => {
        if (selectedProduct) {
            updatePurity(data)
        } else {
            addPurity(data)
        }
        reset({ name: "" })
    }

    useEffect(() => {
        if (isSucessaddPurity) {
            toast.success("Product Purity Create Success")
        }
    }, [isSucessaddPurity])
    useEffect(() => {
        if (isSucessupdatePurity) {
            toast.success("Product Purity Update Success")
            setSelectedProduct(null)
        }
    }, [isSucessupdatePurity])
    useEffect(() => {
        if (isSucessdeletePurity) {
            toast.error("Product Purity Delete Success")
        }
    }, [isSucessdeletePurity])
    useEffect(() => {
        if (selectedProduct) {
            reset(selectedProduct)
        }
    }, [selectedProduct])
    return <>
        <Card>
            <Card.Header className='d-flex justify-content-between'>
                <span>Manage Product Material</span>
                <Form.Check
                    checked={enableDelete}
                    onChange={e => setEnableDelete(e.target.checked)}
                    type="switch"
                    id="material-switch"
                    label="Enable Delete"
                />
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit(handleAdd)}>
                    <InputGroup>
                        <Form.Control placeholder='Enter Material Name' {...register("name", { required: true })} />
                        {
                            selectedProduct
                                ? <>
                                    <Button variant='warning' type='submit'>Update</Button>
                                    <Button onClick={e => {
                                        reset({ name: "" })
                                        setSelectedProduct(null)
                                    }} variant='outline-dark' type="button">Cancel</Button>
                                </>
                                : <Button type='submit' variant='outline-primary d-flex align-items-center'><Icon path={mdiPlus} size={1} /> <span>Add Material</span></Button>
                        }

                    </InputGroup>
                </form>
                <hr />
                <Table className='table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map(item => <tr className={item.isDeleted && "table-danger"}>
                                <td>{item.name}</td>
                                <td >
                                    {
                                        item.isDeleted
                                            ? <></>
                                            : <div className="d-flex gap-2">
                                                <Button onClick={e => {
                                                    setSelectedProduct(item)
                                                }} size='sm' variant='outline-warning'> <Icon path={mdiPencil} size={1} /> </Button>
                                                {enableDelete && <Button onClick={e => deletePurity(item._id)} size='sm' variant='outline-danger'> <Icon path={mdiTrashCan} size={1} /> </Button>}
                                            </div>
                                    }

                                </td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </>
}
const ProductType = () => {
    const [enableDelete, setEnableDelete] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState()
    const { register, handleSubmit, watch, reset, formState: { errors, } } = useForm();
    const { data } = useGetAdminProductTypeQuery()
    const [addPurity, { isLoading: isLoadingaddPurity, isSuccess: isSucessaddPurity, isError: isErroraddPurity }] = useAddAdminProductTypeMutation()
    const [updatePurity, { isLoading: isLoadingupdatePurity, isSuccess: isSucessupdatePurity, isError: isErrorupdatePurity }] = useUpdateAdminProductTypeMutation()
    const [deletePurity, { isLoading: isLoadingdeletePurity, isSuccess: isSucessdeletePurity, isError: isErrordeletePurity }] = useDeleteAdminProductTypeMutation()
    const handleAdd = data => {
        if (selectedProduct) {
            updatePurity(data)
        } else {
            addPurity(data)
        }
        reset({ name: "" })
    }

    useEffect(() => {
        if (isSucessaddPurity) {
            toast.success("Product Type Create Success")
        }
    }, [isSucessaddPurity])
    useEffect(() => {
        if (isSucessupdatePurity) {
            toast.success("Product Type Update Success")
            setSelectedProduct(null)
        }
    }, [isSucessupdatePurity])
    useEffect(() => {
        if (isSucessdeletePurity) {
            toast.error("Product Type Delete Success")
        }
    }, [isSucessdeletePurity])
    useEffect(() => {
        if (selectedProduct) {
            reset(selectedProduct)
        }
    }, [selectedProduct])
    return <>
        <Card>
            <Card.Header className='d-flex justify-content-between'>
                <span>Manage Product Type</span>
                <Form.Check
                    checked={enableDelete}
                    onChange={e => setEnableDelete(e.target.checked)}
                    type="switch"
                    id="type-switch"
                    label="Enable Delete"
                />
            </Card.Header>
            <Card.Body>
                <form onSubmit={handleSubmit(handleAdd)}>
                    <InputGroup>
                        <Form.Control placeholder='Enter Type Name' {...register("name", { required: true })} />
                        {
                            selectedProduct
                                ? <>
                                    <Button variant='warning' type='submit'>Update</Button>
                                    <Button onClick={e => {
                                        reset({ name: "" })
                                        setSelectedProduct(null)
                                    }} variant='outline-dark' type="button">Cancel</Button>
                                </>
                                : <Button type='submit' variant='outline-primary d-flex align-items-center'><Icon path={mdiPlus} size={1} /> <span>Add Type</span></Button>
                        }

                    </InputGroup>
                </form>
                <hr />
                <Table className='table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map(item => <tr className={item.isDeleted && "table-danger"}>
                                <td>{item.name}</td>
                                <td >
                                    {
                                        item.isDeleted
                                            ? <></>
                                            : <div className="d-flex gap-2">
                                                <Button onClick={e => {
                                                    setSelectedProduct(item)
                                                }} size='sm' variant='outline-warning'> <Icon path={mdiPencil} size={1} /> </Button>
                                                {enableDelete && <Button onClick={e => deletePurity(item._id)} size='sm' variant='outline-danger'> <Icon path={mdiTrashCan} size={1} /> </Button>}
                                            </div>
                                    }

                                </td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </>
}

export default ProductSettings