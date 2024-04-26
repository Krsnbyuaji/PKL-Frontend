import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../img/logo_pura.png'

function Sidebar() {

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const fetchData = async () => {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.get('http://localhost:8000/api/datauser')
            .then((response) => {

                setUser(response.data);
            })
    }

    useEffect(() => {

        if (!token) {

            navigate('/');
        }

        fetchData();
    }, []);

    const logoutHanlder = async () => {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://localhost:8000/api/logout')
            .then(() => {

                localStorage.removeItem("token");
                navigate('/');
            });
    };


    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <div className='user-panel d-flex'>
                    <div className='image'>
                        <img src={logo} className='brand-image img-circle elevation-2' style={{ marginLeft:'10px', width: '160px', height: '90px' }}/>
                    </div>
                </div>

            </div>
            <ul className="list-unstyled components">
                <li className='nav-item'>
                    <a href='/dashboard'>Dashboard</a>
                </li>

                
                <li className='nav-item'>
                    <a href="/jobdesign">Job Design</a>
                </li>
                

                {(() => {if (user.role === 'Koordinator') {return (
                <li className='nav-item'>
                    <a href="/daftaruser">Daftar User</a>
                </li>
                );}})()}

                <li className='nav-item'>
                    <a href="/reporting">Reporting</a>
                </li>

                <li>
                    <Link onClick={logoutHanlder} className='logout'>
                        Log Out
                    </Link>
                </li>
            </ul>
        </nav>
    );

}

export default Sidebar;
