import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./LoginForm.css";

function LoginForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        name,
        password
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');

      // Menampilkan SweetAlert tanpa tombol dan menghilang setelah satu detik
      Swal.fire({
        icon: 'info',
        title: 'LOGIN SUKSES!!!',
        showConfirmButton: false
      });

      setTimeout(() => {
        Swal.close();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while logging in');
      }
    }
  };

  return (
    <div id="login-form">
      <img src='./img/logo_pura_landscape.png' className='brand-image img-circle elevation-2' style={{ marginLeft:'30px', width: '330px', height: '70px' }} />
      <form onSubmit={loginHandler}>
        <label htmlFor="name">Username:</label>
        <input
          type="username"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LoginForm;
