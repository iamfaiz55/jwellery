import React from 'react'
import { useGetAllContactsQuery } from '../../../../redux/apis/adminApi';
import { Table, Card, Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
const Contact = () => {
    const { data, isLoading, error } = useGetAllContactsQuery();
    console.log(data);

    return <>
        <div className="min-vh-100 bg-light py-6 sm:py-12" style={{ backgroundColor: '#f3f4f6' }}>
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                    <h2 className="text-2xl font-bold text-royal-blue p-6 border-bottom" style={{ borderBottom: '2px solid #4169E1' }}>
                        Contact List
                    </h2>

                    <div className="d-none d-md-block">
                        <Table striped bordered responsive variant="" className="bg-light">
                            <thead className="bg-royal-blue text-white">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((contact, index) => (
                                    <tr key={index}>
                                        <td>{contact.phone}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.subject}</td>
                                        <td>{contact.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    {/* Card layout for sm screens */}
                    <div className="d-block d-md-none">
                        {data?.map((contact, index) => (
                            <Card key={index} className="mb-4">
                                <Card.Body>
                                    <Card.Title className="text-royal-blue font-weight-bold">{contact.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Email:</strong> {contact.email}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Subject:</strong> {contact.subject}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Message:</strong> {contact.message}
                                    </Card.Text>
                                    <Button variant="outline-primary" onClick={() => { /* Add Edit functionality here */ }}>Edit</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </div>
    </>
}

export default Contact