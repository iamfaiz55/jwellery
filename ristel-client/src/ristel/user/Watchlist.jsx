import React, { useEffect } from 'react';
// import { useDeleteLikeMutation, useGetLikedQuery } from '../redux/apis/userApi';
import { useSelector } from 'react-redux';
// import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Table, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDeleteLikeMutation, useGetLikedQuery } from '../../redux/apis/userApi';
// import useScrollRestoration from '../hooks/useScrollRestoration';
// import { useAddViewMutation, usePostHistoryMutation } from '../redux/apis/openApi';

const Watchlist = () => {
    // useScrollRestoration();
    // const [addView] = useAddViewMutation();
    const { user } = useSelector((state) => state.user);
    const { data } = useGetLikedQuery(user._id);
    // const [postHistory] = usePostHistoryMutation();

    const [deleteLiked, { isSuccess }] = useDeleteLikeMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success('Item removed from Watchlist!');
        }
    }, [isSuccess]);

    // useEffect(() => {
    //     addView({ type: "Watchlist" });
    // }, []);

    // useEffect(() => {
    //     if (user) {
    //         postHistory({ userId: user._id, type: "watchlist" });
    //     }
    // }, []);

    return (
        <Container className="min-vh-100 py-4" style={{ backgroundColor: '#f0f8ff' }}>
            <Row>
                <Col xs={12}>
                    <div className="border-bottom pb-3 mb-4">
                        <h1 className="h2 fw-bold text-primary">Your Watchlist</h1>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {data && data.length > 0 ? (
                                data.map((likedItem, index) => {
                                    const matchedVariant = likedItem.productId.varient.find(
                                        (variant) => variant._id === likedItem.varientId
                                    );

                                    return (
                                        <div className="mb-4 border-bottom pb-3" key={index}>
                                            <Row className="align-items-center justify-content-between">
                                                {/* Product Details */}
                                                <Col md={6} className="d-flex align-items-start">
                                                    <Image
                                                        src={likedItem.productId.images[0]}
                                                        alt={likedItem.productId.name}
                                                        className="rounded me-3"
                                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                    />
                                                    <div>
                                                        <h5 className="mb-1 text-dark">{likedItem.productId.name}</h5>
                                                        {matchedVariant && (
                                                            <p className="text-muted mb-0">
                                                                {matchedVariant.desc}
                                                            </p>
                                                        )}
                                                        <p className="mt-2 fw-bold text-primary">
                                                            ₹{matchedVariant?.price || 'N/A'}
                                                        </p>
                                                    </div>
                                                </Col>

                                                {/* Actions */}
                                                <Col md={6} className="d-flex flex-column align-items-start align-items-md-end">
                                                    <Button
                                                        variant="primary"
                                                        className="mb-2"
                                                        onClick={() => navigate(`/product-details/${likedItem.productId._id}`)}
                                                    >
                                                        View Details
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => deleteLiked(likedItem._id)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center text-primary fw-bold">
                                    Your Watchlist is Empty
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Watchlist;
