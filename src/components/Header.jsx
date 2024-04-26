import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.get('http://localhost:8000/api/datauser')
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setUser(null);
                });
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const logoutHandler = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.post('http://localhost:8000/api/logout')
                .then(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error logging out:', error);
                });
        }
    };

    return (
        <Navbar expand="lg" variant="dark" className="navbar">
            <div className='me-5'>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <ul className="navbar-nav ml-auto">
                    {user ? (
                        <NavDropdown title={user.name} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <li className="nav-item">
                            {/* Tambahkan tautan untuk login */}
                        </li>
                    )}
                </ul>
            </Navbar.Collapse>
                </div>
        </Navbar>
    );
}

export default Header;
