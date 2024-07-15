import React, { useState } from 'react';
import { useCart } from '../CartContext'; // Import useCart
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Payment from './Payment'; // Import Payment modal

function Cart() {
  const { cartItems, removeFromCart } = useCart(); // Use cartItems and removeFromCart from the context
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleClosePaymentModal = () => setShowPaymentModal(false);
  const handleShowPaymentModal = () => setShowPaymentModal(true);

  // Calculate the total amount by converting prices to integers first
  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

  return (
    <div className="container mt-5">
      <h1 className="d-flex justify-content-center">Your Cart</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {cartItems.map((item, index) => (
          <Card key={index} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.itemName}</Card.Title>
              <Card.Text>
                {item.description}
                <br />
                Price: ${parseFloat(item.price).toFixed(2)}
              </Card.Text>
              <Button variant="dark" className="w-100 mt-1" onClick={() => removeFromCart(index)}>
                Remove from Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-2 mb-4">   
      <Button variant="dark" onClick={handleShowPaymentModal} className="mt-4">
        Proceed to Payment
      </Button>
      </div> 

      <Payment show={showPaymentModal} handleClose={handleClosePaymentModal} totalAmount={totalAmount} />
    </div>
  );
}

export default Cart;
