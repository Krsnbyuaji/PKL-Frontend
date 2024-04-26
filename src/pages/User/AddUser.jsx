import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddUser.css';
import Form from 'react-bootstrap/Form';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [validationError, setValidationError] = useState({})

    const createUser = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('role', role)

        await axios.post(`http://localhost:8000/api/user/store`, formData).then(({data}) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate('/daftaruser');
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors)
            } else {
                Swal.fire({
                    icon: "error",
                    text: response.data.message
                })
            }
        })
    }


    return (
        <div id="add-user">
            <Sidebar />
            <Header />
            <div className="container">
                <div className="content">
                    <div className="col-md-9 offset-md-1 mt-2">
                        <h1 className='mb-4'>Add User</h1>
                        {
                            Object.keys(validationError).length > 0 && (

                                <div className='row'>
                                    <div className='col-12'>
                                        <div className='alert alert-danger'>
                                            <ul className='mb-0'>
                                                {
                                                    Object.entries(validationError).map(([key,value])=>(
                                                        <li key={key}>{value}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                        <form onSubmit={createUser}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" value={name} onChange={(event)=>{setName(event.target.value)}} required/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" value={email} onChange={(event)=>{setEmail(event.target.value)}} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" value={password} onChange={(event)=>{setPassword(event.target.value)}} required />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <Form.Select className="form-control" value={role} onChange={(event)=>{setRole(event.target.value)}}>
                                    <option hidden>Pilih Role</option>
                                    <option value="Koordinator">Koordinator</option>
                                    <option value="Designer">Designer</option>
                                    <option value="QC">QC</option>
                                </Form.Select>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUser;
