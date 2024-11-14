import React, { useEffect, useState } from 'react'
import { useAddGalleryImagesMutation, useDeleteGalleryImageMutation } from '../../../../redux/apis/adminApi';
import { useGetAllGalleryImagesQuery } from '../../../../redux/apis/publicApi';
import { Button, Modal, Table, Spinner } from "react-bootstrap";
import { toast } from 'react-toastify';

const Gallery = () => {
    const { data, refetch } = useGetAllGalleryImagesQuery();
    const [deleteAddImage, { isSuccess: deleteSuccess, isLoading: deleteLoading }] = useDeleteGalleryImageMutation()
    // console.log(data);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [addImage, { isSuccess, isLoading }] = useAddGalleryImagesMutation();



    const [showModal, setShowModal] = useState(false);

    // Handle image change (for preview)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    // Handle modal close
    const closeModal = () => {

        setImagePreview(null);
        setImage(null);
    };
    useEffect(() => {

        if (isSuccess) {
            toast.success("Image Added Successfully", {
                style: { backgroundColor: 'white', color: 'blue', border: '1px solid blue' },
                icon: <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>,
                progressStyle: { backgroundColor: 'blue' }
            });
            setShowModal(false);
            refetch()
        }
    }, [isSuccess]);
    useEffect(() => {

        if (deleteSuccess) {
            toast.success("Image Deleted Successfully", {
                style: { backgroundColor: 'white', color: 'blue', border: '1px solid blue' },
                icon: <span style={{ color: 'blue', fontSize: '1.5em' }}>✔️</span>,
                progressStyle: { backgroundColor: 'blue' }
            });
            refetch()
        }
    }, [deleteSuccess]);

    return <>
        <div>
            {/* Add Image Button */}
            <div className="text-end mb-4">
                <Button
                    variant="warning"
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2"
                >
                    Add Image
                </Button>
            </div>

            {/* Add Image Modal */}
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">Add Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        <div>
                            {/* Image Upload Input */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="form-control mb-3"
                            />

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="text-center mb-3">
                                    <img
                                        src={imagePreview}
                                        alt="Image Preview"
                                        width={200}
                                        className="rounded"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            const fd = new FormData();
                            fd.append("images", image);
                            addImage(fd);
                            closeModal();
                        }}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Display Uploaded Images */}
            <div className="mt-4 overflow-auto">
                <h2 className="text-primary mb-4">Uploaded Images</h2>
                <Table variant="light">
                    <thead className="text-primary">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={item._id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">
                                        <img
                                            src={item.image}
                                            alt={`Uploaded ${item._id}`}
                                            className="img-thumbnail"
                                            width={100}
                                            height={100}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteAddImage(item._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No images found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div >
    </>
}

export default Gallery