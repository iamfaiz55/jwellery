
import React from 'react';
import { Card, Container, Navbar, Nav, Row, Col, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import Avatar3 from './../../assets/images/avatar/avatar-3.jpg';


const DeleteProfile = () => {
    const location = useLocation();

    return (
        <>
            <Card className="border-2">
                <Card.Header>
                    <div className="mb-3 mb-lg-0">
                        <h3 className="mb-0">Delete your account</h3>
                        <p className="mb-0">Delete or close your account permanently.</p>
                    </div>
                </Card.Header>
                <Card.Body>
                    <span className="text-danger h4">Warning</span>
                    <p>
                        If you close your account, you will be unsubscribed from all your
                        courses and lose access forever.
                    </p>
                    <Link to="/" className="btn btn-danger">
                        Close My Account
                    </Link>
                </Card.Body>
            </Card>
        </>
    );
};

export default DeleteProfile;
