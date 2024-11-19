import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const PrivacyPolicy = () => {
    const [policyContent, setPolicyContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!policyContent.trim()) {
            alert('Please enter the privacy policy content before submitting!');
            return;
        }
        console.log('Privacy Policy Submitted:', policyContent);
        alert('Privacy Policy has been updated!');
        setPolicyContent('');
    };

    return (
        <Container
            fluid
            style={{
                maxWidth: '900px',
                marginTop: '50px',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h3 className="mb-4 text-center">Edit Privacy Policy</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Privacy Policy Content</Form.Label>
                    <ReactQuill
                        theme="snow"
                        value={policyContent}
                        onChange={setPolicyContent}
                        placeholder="Write or paste the privacy policy content here..."
                        style={{ height: '250px' }}
                    />
                </Form.Group>
                <div className="d-flex justify-content-center my-4">
                    <Button type="submit" variant="primary" size="lg">
                        Save Privacy Policy
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default PrivacyPolicy;
