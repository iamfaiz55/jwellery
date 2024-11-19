import React from 'react';
import { Container, ListGroup, Row, Col, Button } from 'react-bootstrap';

const Coupon = () => {
    const coupons = [
        {
            id: 1,
            title: "Flat ₹500 OFF",
            description: "Get ₹500 off on orders above ₹5000.",
            code: "RISTEL500",
            expiry: "Expires on: 25th Nov 2024"
        },
        {
            id: 2,
            title: "20% Discount",
            description: "Save 20% on all gold jewelry.",
            code: "GOLD20",
            expiry: "Expires on: 30th Nov 2024"
        },
        {
            id: 3,
            title: "₹200 Cashback",
            description: "Get ₹200 cashback on purchases over ₹2000.",
            code: "CASHBACK200",
            expiry: "Expires on: 1st Dec 2024"
        },
        {
            id: 4,
            title: "Festive Special: ₹1000 OFF",
            description: "₹1000 off on orders above ₹10,000. Limited Time Offer!",
            code: "FESTIVE1000",
            expiry: "Expires on: 28th Nov 2024"
        }
    ];

    return (
        <Container className="py-4">
            <h1 className="mb-4 text-center text-primary fw-bold">Exclusive Coupons</h1>
            <ListGroup>
                {coupons.map((coupon) => (
                    <ListGroup.Item
                        key={coupon.id}
                        className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 p-3 border rounded shadow-sm"
                    >
                        <div>
                            <h5 className="fw-bold text-primary">{coupon.title}</h5>
                            <p className="mb-1 text-muted">{coupon.description}</p>
                            <small className="text-muted">{coupon.expiry}</small>
                        </div>
                        <div className="mt-3 mt-md-0 d-flex flex-column align-items-md-end">
                            <span className="fw-bold text-success mb-2">Code: {coupon.code}</span>
                            <Button variant="primary">Apply Coupon</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Coupon;
