import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Add from './Add';
import Cart from './Cart';
import logo from '../assets/images/logo.png';

function Navbar() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleLoginClick = (e) => {
        e.preventDefault();
        setShowLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleSignupClick = (e) => {
        e.preventDefault();
        setShowSignupModal(true);
    };

    const handleCloseSignupModal = () => {
        setShowSignupModal(false);
    };

    const handleLogoutClick = (e) => {
        e.preventDefault();
        setLoggedIn(false);
        setUserEmail('');
    };

    const handleAddClick = () => {
        setShowAdd(true);
    };

    const handleCloseAdd = () => {
        setShowAdd(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" width="50" height="30" className="d-inline-block align-top ml-5" />
                </a>
                <ul type="none">
                    <li className="nav-item">
                        <NavLink className="nav-link bold-italic mt-2 ml-0" to="/">SHOPPERS</NavLink>
                    </li>
                </ul>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-dark" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={loggedIn ? handleLogoutClick : handleLoginClick}>
                                {loggedIn ? 'Log-out' : 'Log-in'}
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={handleSignupClick}>Sign-up</button>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Shop">Shop</NavLink>
                        </li>
                        {loggedIn && !userEmail.toLowerCase().includes('administrator') && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Cart">Cart</NavLink>
                            </li>
                        )}
                        {loggedIn && userEmail.toLowerCase().includes('administrator') && (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleAddClick}>
                                    Add
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <Add show={showAdd} handleClose={handleCloseAdd} />
            <Login show={showLoginModal} handleClose={handleCloseLoginModal} setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />
            <Signup show={showSignupModal} handleClose={handleCloseSignupModal} />
        </nav>
    );
}

export default Navbar;
