import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import './DaftarUser.css';
import Header from '../../components/Header';

function DaftarUser() {
    const [datauser, setDataUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDataUser();
    }, []);

    const fetchDataUser = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:8000/api/user`);
            // Mengurutkan data berdasarkan peran (role)
            const sortedData = data.sort((a, b) => {
                if (b.role < a.role) return -1;
                if (b.role > a.role) return 1;
                return 0;
            });
            setDataUser(sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        const isConfirmed = await Swal.fire({
            title: "Yakin Untuk Menghapus?",
            text: "Setelah Data Dihapus Maka, Datanya Akan Menghilang!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus Saja!"
        });

        if (!isConfirmed.value) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/api/user/destroy/${id}`);
            Swal.fire({
                icon: "success",
                text: "Data telah dihapus."
            });
            fetchDataUser();
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Gagal menghapus data."
            });
        }
    };

    const handleEdit = (id) => {
        // Implementasi navigasi ke halaman edituser
        console.log(`Edit user dengan ID ${id}`);
    };

    return (
        <div id="daftar-user">
            <Sidebar />
            <Header />
            <div className="container">
                <div className="content">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Daftar User</h1>
                        <div className="buttons">
                            <button className="btn btn-primary" onClick={fetchDataUser} disabled={loading}>
                                {loading ? 'Loading...' : 'Refresh'}
                            </button>
                            <Link to="/adduser" className="btn btn-success" style={{ marginTop: '15px', marginLeft: '10px' }}>Add User</Link>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datauser.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="text-justify mt-5">{index + 1}</td>
                                    <td className="text-justify mt-5">{user.name}</td>
                                    <td className="text-justify mt-5">{user.email}</td>
                                    <td className="text-justify mt-5">{user.role}</td>
                                    <td className="text-justify mt-5">
                                        <Link to={`/edituser/${user.id}`} className="btn btn-primary" onClick={() => handleEdit(user.id)}>Edit</Link>
                                        <button className="btn btn-danger" onClick={() => deleteUser(user.id)} style={{ marginBottom: '1px', marginTop: '1px', marginLeft: '1px' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DaftarUser;