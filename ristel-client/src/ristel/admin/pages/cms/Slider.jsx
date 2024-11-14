import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAddCarouselMutation, useDeleteCarouselMutation, useUpdateCarouselMutation } from '../../../../redux/apis/adminApi';
import { useGetCArouselQuery } from '../../../../redux/apis/publicApi';
import { Container, Button, Modal, Table, Form, Card, Row, Col, Spinner } from 'react-bootstrap';

const Slider = () => {
    const [deleteCarousel, { isSuccess: carouselDelete, error: deleteError }] = useDeleteCarouselMutation();
    const { data, refetch } = useGetCArouselQuery();
    const [addCarousel, { isSuccess, isLoading }] = useAddCarouselMutation();
    const [updateCarousel, { isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateCarouselMutation();
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [carouselDetails, setCarouselDetails] = useState({
        mainHeading: '',
        paragraph: '',
        selectedCarousel: {}
    });

    const handleFileChange = (event) => {
        const files = event.target.files;
        const imageArray = Array.from(files);
        setSelectedImages(imageArray);
        if (imageArray.length > 0) {
            setImagePreview(URL.createObjectURL(imageArray[0]));
        }
    };

    const handleAdd = () => {
        if (selectedImages.length === 0) {
            toast.error("No images selected");
            return;
        }

        const formData = new FormData();
        formData.append('mainHeading', carouselDetails.mainHeading);
        formData.append('paragraph', carouselDetails.paragraph);
        selectedImages.forEach(image => {
            formData.append('images', image);
        });

        try {
            addCarousel(formData);
        } catch (error) {
            toast.error("Failed to add carousel");
        }
    };

    // const handleUpdate = () => ;

    useEffect(() => {
        if (isSuccess) {
            toast.success("Carousel Added Successfully");
            document.getElementById("add").close();

            setSelectedImages([]);
            setImagePreview('');
            setCarouselDetails({
                mainHeading: '',
                paragraph: '',
                selectedCarousel: {}
            });
            refetch();
        }
    }, [isSuccess]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarouselDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    useEffect(() => {

        if (isSuccess) {
            toast.success("Carousel Update success", {
                style: { backgroundColor: 'white', color: 'blue', border: '1px solid blue' },
                icon: <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>,
                progressStyle: { backgroundColor: 'blue' }
            });
            setShowUpdateModal(false)
        }
        if (carouselDelete) {
            toast.success("Carousel Deleted Successfully", {
                style: { backgroundColor: 'white', color: 'blue', border: '1px solid blue' },
                icon: <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>,
                progressStyle: { backgroundColor: 'blue' }
            });
            setShowUpdateModal(false)
        }
    }, [isSuccess, carouselDelete]);


    useEffect(() => {

        if (updateSuccess) {
            toast.success("Carousel Update success", {
                style: { backgroundColor: 'white', color: 'blue', border: '1px solid blue' },
                icon: <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>,
                progressStyle: { backgroundColor: 'blue' }
            });
            setShowUpdateModal(false)
        }
    }, [updateSuccess]);
    return <>
        <Container fluid className="bg-light">
            <div className='p-4'>
                {/* Add Carousel Button */}
                <div className="text-end mb-4">
                    <Button
                        variant="primary"
                        onClick={() => setShowAddModal(true)}
                        className="text-white"
                    >
                        Add Carousel
                    </Button>
                </div>

                {/* Add Carousel Modal */}
                <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-primary">Add Carousel Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isLoading ? (
                            <div className="text-center">
                                <Spinner animation="border" variant="primary" />
                                <div>Loading...</div>
                            </div>
                        ) : (
                            <>
                                <Form.Group>
                                    <Form.Control type="file" onChange={handleFileChange} className="mt-3" />
                                </Form.Group>
                                {selectedImages.length > 0 && (
                                    <div className="mt-3 position-relative">
                                        <img src={URL.createObjectURL(selectedImages[0])} alt="Selected" className="img-fluid rounded" />
                                    </div>
                                )}
                                <Form.Group className="mt-4">
                                    <Form.Control
                                        type="text"
                                        placeholder="Main Heading"
                                        name="mainHeading"
                                        value={carouselDetails.mainHeading}
                                        onChange={handleInputChange}
                                        className="mb-3"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Paragraph"
                                        name="paragraph"
                                        value={carouselDetails.paragraph}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                        <Button variant="primary" onClick={handleAdd}>Add</Button>
                    </Modal.Footer>
                </Modal>

                {/* Update Carousel Modal */}
                <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-primary">Update Carousel Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {updateLoading ? (
                            <div className="text-center">
                                <Spinner animation="border" variant="primary" />
                                <div>Loading...</div>
                            </div>
                        ) : (
                            <>
                                <Form.Group>
                                    <Form.Control type="file" accept="image/*" onChange={handleFileChange} className="mt-3" />
                                </Form.Group>
                                {imagePreview && (
                                    <div className="mt-3 position-relative">
                                        <img src={imagePreview} alt="Selected" className="img-fluid rounded" />
                                    </div>
                                )}
                                <Form.Group className="mt-4">
                                    <Form.Control
                                        type="text"
                                        placeholder="Main Heading"
                                        name="mainHeading"
                                        value={carouselDetails.mainHeading}
                                        onChange={handleInputChange}
                                        className="mb-3"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Paragraph"
                                        name="paragraph"
                                        value={carouselDetails.paragraph}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
                        <Button variant="primary" onClick={e => {
                            const formData = new FormData();
                            formData.append('carouselId', carouselDetails._id);
                            formData.append('mainHeading', carouselDetails.mainHeading);
                            formData.append('paragraph', carouselDetails.paragraph);
                            if (selectedImages.length > 0) {
                                formData.append('image', selectedImages[0]);
                            }

                            updateCarousel(formData);
                        }}>Update</Button>
                    </Modal.Footer>
                </Modal>

                {/* Table for larger screens */}
                <div className="d-none d-lg-block">
                    <Table bordered hover className="text-center">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Main Heading</th>
                                <th>Paragraph</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item, i) => (
                                <tr key={item.id}>
                                    <td>{i + 1}</td>
                                    <td><img src={item.image} alt="Carousel" className="img-fluid rounded" style={{ width: '100px' }} /></td>
                                    <td>{item.mainHeading}</td>
                                    <td>{item.paragraph}</td>
                                    <td>
                                        <Button variant="success" onClick={() => { setCarouselDetails(item); setImagePreview(item.image); setShowUpdateModal(true); }} className="me-2">Edit</Button>
                                        <Button variant="danger" onClick={() => deleteCarousel(item._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Cards for small screens */}
                <div className="d-lg-none">
                    <Row xs={1} className="g-4">
                        {data && data.map((item, i) => (
                            <Col key={item.id}>
                                <Card className="bg-light shadow-sm">
                                    <Card.Img variant="top" src={item.image} alt="Carousel" className="img-fluid rounded" />
                                    <Card.Body>
                                        <Card.Title>{item.mainHeading}</Card.Title>
                                        <Card.Text>{item.paragraph}</Card.Text>
                                        <Button variant="success" onClick={() => { setCarouselDetails(item); setImagePreview(item.image); setShowUpdateModal(true); }} className="me-2">Edit</Button>
                                        <Button variant="danger" onClick={() => deleteCarousel(item._id)}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </Container>
    </>
}

export default Slider