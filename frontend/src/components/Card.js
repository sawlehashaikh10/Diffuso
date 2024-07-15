import React from 'react';

function Card({ product }) {
  return (
    <div className="card h-100" style={{ width: '18rem' }}>  

      {/* <img src={require(`${product.image}`).default} className="card-img-top" alt={product.name} /> */}

      <img src={product.image} className="card-img-top" alt={product.name} />
      {/* <img src={product.image} className="card-img-top" alt={product.name} /> */}
      <div className="card-body d-flex flex-column"> 
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-price mb-2">${product.price}</p>
        <button className="btn btn-dark mt-auto">Buy Now</button>
      </div>
    </div>
  );
}

export default Card;
