import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Payment({ show, handleClose, totalAmount }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="Enter card number" />
          </Form.Group>
          <Form.Group controlId="formCardName">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control type="text" placeholder="Enter name on card" />
          </Form.Group>
          <Form.Group controlId="formExpiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control type="text" placeholder="MM/YY" />
          </Form.Group>
          <Form.Group controlId="formCVV">
            <Form.Label>CVV</Form.Label>
            <Form.Control type="text" placeholder="CVV" />
          </Form.Group>
          <Form.Group controlId="formAmount">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control type="text" readOnly value={`$${totalAmount}`} />
          </Form.Group>
          <Button variant="dark" type="submit" className="w-100 mt-3">
            Pay Now
          </Button>
          <Button variant="dark" type="submit" className="w-100 mt-3">
            Cash on Delivery
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Payment;
