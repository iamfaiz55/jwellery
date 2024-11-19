import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const About = () => {
    const [aboutContent, setAboutContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!aboutContent.trim()) {
            alert('Please enter content before submitting!');
            return;
        }
        console.log('About Content Submitted:', aboutContent);
        alert('About Content has been updated!');
        setAboutContent('');
    };

    return (
        <Container fluid style={{ maxWidth: '900px', marginTop: '50px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="mb-4 text-center">Edit About Section</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">About Content</Form.Label>
                    <ReactQuill
                        theme="snow"
                        value={aboutContent}
                        onChange={setAboutContent}
                        placeholder="Write or paste the about content here..."
                        style={{ height: '250px' }}
                    />
                </Form.Group>
                <div className="d-flex justify-content-center my-4">
                    <Button type="submit" variant="primary" size="lg">
                        Save About Content
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default About;
