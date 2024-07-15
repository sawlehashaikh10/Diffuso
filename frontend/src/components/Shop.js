import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext'; // Import useCart
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Shop() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch('http://localhost:5000/api/getProducts')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {products.map((product, index) => (
                <Card key={`${product.id}-${index}`} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={product.image} alt={product.itemName} />
                    <Card.Body>
                        <Card.Title>{product.itemName}</Card.Title>
                        <Card.Text>
                            {product.description}
                            <br />
                            Price: ${product.price}
                        </Card.Text>
                        <Button variant="dark" className="w-100 mt-1" onClick={() => addToCart(product)}>Add To Cart</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Shop;
