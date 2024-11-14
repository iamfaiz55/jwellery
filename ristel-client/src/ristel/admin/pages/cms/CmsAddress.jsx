import React, { useEffect, useState } from 'react'
import { useLazyGetCompanyAddressQuery, useUpdateTaxMutation, useUpdtaeCompanyAddressMutation } from '../../../../redux/apis/adminApi'
import { useLazyGetTaxesQuery } from '../../../../redux/apis/publicApi'
import { Table, Modal, Button, Form, Spinner, Container } from 'react-bootstrap';

const CmsAddress = () => {
    const [getAddresses, { data }] = useLazyGetCompanyAddressQuery()
    // console.log(data);

    const [getTax, { data: taxes }] = useLazyGetTaxesQuery()
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showTaxModal, setShowTaxModal] = useState(false);

    const [updateTax, { isSuccess: taxUpdateSuccess }] = useUpdateTaxMutation()
    const [updateAddress, { isSuccess, isLoading }] = useUpdtaeCompanyAddressMutation()
    const [addressData, setAddressData] = useState({})
    const [taxData, setTaxData] = useState({})

    useEffect(() => {
        if (isSuccess) {
            toast.success("Address Update Success")
            location.reload()
            setAddressData({})
            setShowAddressModal(false)
            // document.getElementById("edit").close()
        }
    }, [isSuccess])
    useEffect(() => {
        if (taxUpdateSuccess) {
            toast.success("Tax Update Success")
            // location.reload()
            setTaxData({})
            setShowTaxModal(false)
            // document.getElementById("editTax").close()
        }
    }, [taxUpdateSuccess])

    useEffect(() => {
        getTax()
        getAddresses()
    }, [isSuccess, taxUpdateSuccess])
    return <>
        <Container className="mt-5 p-4 rounded bg-white shadow-lg border border-royal-blue">
            <div className="mb-4 text-center">
                <h1 className="display-6 text-royal-blue">Address Details</h1>
            </div>

            {/* Address Table */}
            <Table striped bordered hover responsive className="bg-light border-royal-blue  rounded-lg">
                <thead style={{ backgroundColor: '#002366', color: 'white' }}>
                    <tr>
                        <th className='text-light'>Building No</th>
                        <th className='text-light'>City</th>
                        <th className='text-light'>State</th>
                        <th className='text-light'>Country</th>
                        <th className='text-light'>Pincode</th>
                        <th className='text-light'>GST No</th>
                        <th className='text-light'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.buildingNo}</td>
                            <td>{item.city}</td>
                            <td>{item.state}</td>
                            <td>{item.country}</td>
                            <td>{item.pincode}</td>
                            <td>{item.gst}</td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => {
                                        setAddressData(item);
                                        setShowAddressModal(true);
                                    }}
                                >
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Taxes and Charges Section */}
            <div className="mb-4 text-center">
                <h2 className="display-6 text-royal-blue">Taxes and Charges</h2>
            </div>

            {/* Taxes Table */}
            <Table striped bordered hover responsive className="bg-light border-royal-blue">
                <thead style={{ backgroundColor: '#002366', color: 'white' }}>
                    <tr>
                        <th className='text-light'>No.</th>
                        <th className='text-light'>Name</th>
                        <th className='text-light'>Percent</th>
                        <th className='text-light'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {taxes && taxes.map((item, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.taxName}</td>
                            <td>{item.percent}%</td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => {
                                        setTaxData(item);
                                        setShowTaxModal(true);
                                    }}
                                >
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Address Modal */}
            <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#002366', color: 'white' }}>
                    <Modal.Title className='text-light'>Edit Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <Spinner animation="border" variant="primary" className="d-block mx-auto" />
                    ) : (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Building No</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={addressData.buildingNo || ''}
                                    onChange={(e) => setAddressData({ ...addressData, buildingNo: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={addressData.city || ''}
                                    onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={addressData.state || ''}
                                    onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={addressData.country || ''}
                                    onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={addressData.pincode || ''}
                                    onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>GST No</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={addressData.gst || ''}
                                    onChange={(e) => setAddressData({ ...addressData, gst: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            updateAddress(addressData);
                            setShowAddressModal(false);
                        }}
                    >
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => setShowAddressModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Tax Modal */}
            <Modal show={showTaxModal} onHide={() => setShowTaxModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#002366', color: 'white' }}>
                    <Modal.Title className='text-light'>Edit Tax</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Percent</Form.Label>
                            <Form.Control
                                type="text"
                                value={taxData.percent || ''}
                                onChange={(e) => setTaxData({ ...taxData, percent: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            updateTax(taxData);
                            setShowTaxModal(false);
                        }}
                    >
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => setShowTaxModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    </>
}

export default CmsAddress