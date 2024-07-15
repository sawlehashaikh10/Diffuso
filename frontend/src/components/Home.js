import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from './Card';
import productsData from './products.json';

function Home() {
  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const cardWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '15px',
    flex: '1 1 calc(25% - 30px)',
    boxSizing: 'border-box',
  };

  const mediaQuery768 = '@media (max-width: 768px) { .card-wrapper { flex: 1 1 calc(50% - 30px); } }';
  const mediaQuery576 = '@media (max-width: 576px) { .card-wrapper { flex: 1 1 calc(100% - 30px); } }';

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="./images/hero_image.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Shop Now!!! Get The Best Deals!!!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="./images/hero_image2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>More great products await you.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="./images/hero_image3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>More great products await you.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row" style={cardContainerStyle}>
          {productsData.products.map(product => (
            <div className="col-sm-12 col-md-6 col-lg-3 mb-4 card-wrapper" style={cardWrapperStyle} key={product.id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>

      <style>
        {mediaQuery768}
        {mediaQuery576}
      </style>
    </div>
  );
}

export default Home;
