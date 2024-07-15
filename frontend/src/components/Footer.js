import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <Container>
                <Row>
                    <Col md={true} className="text-center">
                        <h4>Company</h4>
                        <ul className="list-unstyled">
                            <li><a className="nav-link" href="/">About Us</a></li>
                            <li><a className="nav-link" href="/">Careers</a></li>
                            <li><a className="nav-link" href="/">Contact</a></li>
                        </ul>
                    </Col>
                    <Col md={true} className="text-center">
                        <h4>Support</h4>
                        <ul className="list-unstyled">
                            <li><a className="nav-link" href="/">FAQ</a></li>
                            <li><a className="nav-link" href="/">Support Center</a></li>
                            <li><a className="nav-link" href="/">Terms of Service</a></li>
                        </ul>
                    </Col>
                    <Col md={true} className="text-center">
                        <h4>Legal</h4>
                        <ul className="list-unstyled">
                            <li><a className="nav-link" href="/">Privacy Policy</a></li>
                            <li><a className="nav-link" href="/">Cookie Policy</a></li>
                            <li><a className="nav-link" href="/">Disclaimer</a></li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p className="text-muted small">© {new Date().getFullYear()} Created by Shaikh Sawleha Ibrahim for SHOPPERS</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
