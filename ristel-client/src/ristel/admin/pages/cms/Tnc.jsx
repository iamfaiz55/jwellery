import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const Tnc = () => {
    const [tncContent, setTncContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tncContent.trim()) {
            alert('Please enter the terms and conditions content before submitting!');
            return;
        }
        console.log('TnC Submitted:', tncContent);
        alert('Terms and Conditions have been updated!');
        setTncContent('');
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
            <h3 className="mb-4 text-center">Edit Terms and Conditions</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Terms and Conditions Content</Form.Label>
                    <ReactQuill
                        theme="snow"
                        value={tncContent}
                        onChange={setTncContent}
                        placeholder="Write or paste the terms and conditions content here..."
                        style={{ height: '250px' }}
                    />
                </Form.Group>
                <div className="d-flex justify-content-center my-4">
                    <Button type="submit" variant="primary" size="lg">
                        Save Terms and Conditions
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Tnc;
