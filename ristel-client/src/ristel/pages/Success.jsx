
// npm install framer-motion
//npm install animate.css

import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { MdOutlineBorderColor } from "react-icons/md";
import { motion } from 'framer-motion';
// import 'animate.css';

const PaymentSuccess = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center my-5" >
      <Card className="text-center p-3 shadow-lg" style={{ maxWidth: '500px', borderRadius: '15px', background: 'linear-gradient(to bottom, #ffffff, #e8f5e9)' }}>
        <Card.Body>
          <div className="d-flex justify-content-center mb-1">
            <motion.div
              className="d-flex justify-content-center mb-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
            >
              <FaCheckCircle size={80} className="text-success mb-4" />
            </motion.div>

          </div>
          <h2 className="mb-2 text-success">Payment Successful!</h2>
          <p className="text-muted">Your payment was processed successfully. Thank you for your purchase!</p>

          <Card className=" bg-light border-0">
            <Card.Body>
              <p><strong>Order Number:</strong> <span className="text-primary">123456789</span></p>
              <p><strong>Payment Method:</strong> <span className="text-primary">Visa ending in 1234</span></p>
              <p><strong>Total Amount:</strong> <span className="text-primary">₹99.99</span></p>
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-center gap-3 ">
            <Button className="bg-success text-white border-0" style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '5px',
            }}> <MdOutlineBorderColor size={20} /> Order Summary</Button>
            <Button variant="success" size="lg" className="px-3 d-flex align-items-center justify-content-center" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '0.75rem 2rem',
              fontSize: '1.1rem',
            }}>
              <FaArrowLeft size={20} /> Shop More
            </Button>
          </div>



          {/* <Card.Text className="text-muted mt-5"><h5>Share your experience:</h5></Card.Text>
          <div className="d-flex justify-content-center">
            <a href="#" className="text-decoration-none me-3">
              <FaFacebook size={30} className="text-primary" />
            </a>
            <a href="#" className="text-decoration-none me-3">
              <FaTwitter size={30} className="text-info" />
            </a>
            <a href="#" className="text-decoration-none">
              <FaInstagram size={30} className="text-danger" />
            </a>
          </div> */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
