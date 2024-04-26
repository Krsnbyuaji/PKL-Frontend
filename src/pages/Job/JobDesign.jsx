import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './JobDesign.css';
import Swal from 'sweetalert2';

function JobDesign() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            const response = await axios.get('http://localhost:8000/api/datauser');
            setUser(response.data);
            if (response.data.role === 'Designer') {
                fetchJobsByDesigner(response.data.id);
            } else {
                fetchAllJobs();
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const fetchAllJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/job');
            setJobs(response.data.jobs);
        } catch (error) {
            console.error('Error fetching all jobs:', error);
        }
    }

    const fetchJobsByDesigner = async (designerId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/job/designer/${designerId}`);
            setJobs(response.data.jobs);
        } catch (error) {
            console.error('Error fetching jobs by designer:', error);
        }
    };

    const confirmDelete = async (id) => {
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
            await axios.delete(`http://localhost:8000/api/job/destroy/${id}`);
            Swal.fire({
                icon: "success",
                text: "Data telah dihapus."
            });
            fetchAllJobs();
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Gagal menghapus data."
            });
        }
    };

    const [filterStatus, setFilterStatus] = useState('');

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const filteredJobs = filterStatus ? jobs.filter(job => job.status == filterStatus) : jobs;

    const handleEdit = (id) => {
        console.log(`Edit job with ID ${id}`);
    };

    return (
        <div id='daftar-job'>
            <Sidebar />
            <Header />
            <div className="container">
                <div className="content">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Job Design</h1>
                        <div className="buttons">
                            <button className="btn btn-primary" onClick={() => window.location.reload()} disabled={loading}>
                                {loading ? 'Loading...' : 'Refresh'}
                            </button>
                            {user.role === 'Koordinator' && (
                                <Link to="/uploadjob" className="btn btn-success" style={{ marginTop: '15px', marginLeft: '10px' }}>New</Link>
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="filterStatus" className="form-label">Filter Status:</label>
                        <select id="filterStatus" className="form-select" value={filterStatus} onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="proses">proses</option>
                            <option value="return">return</option>
                            <option value="hold">hold</option>
                            <option value="approve">approve</option>
                        </select>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Deadline</th>
                                <th>Hari Yang Tersisa</th>
                                <th>Judul</th>
                                <th>Client</th>
                                <th>Deskripsi</th>
                                <th>PIC Designer</th>
                                <th>File Koordinator</th>
                                <th>File Designer</th>
                                <th>Komen Koordinator</th>
                                <th>Komen QC Designer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredJobs.map(job => (
                                <tr key={job.id}>
                                    <td>{job.status}</td>
                                    <td>{job.deadline}</td>
                                    <td>{job.hari}</td>
                                    <td>{job.title}</td>
                                    <td>{job.client}</td>
                                    <td>{job.description}</td>
                                    <td>{job.pic_designer.name}</td>
                                    <td><a href={`http://localhost:8000/${job.file_path}`} target="_blank" rel="noopener noreferrer">Download</a></td>
                                    <td>{job.fileDesign}</td>
                                    <td>{job.komenkoordinator}</td>
                                    <td>{job.komenqc}</td>
                                    <td>
                                        {user.role === 'Designer' && (
                                            <Link to={`/editjob/${job.id}`} className="btn btn-primary" onClick={() => handleEdit(job.id)}>Edit</Link>
                                        )}
                                       <button onClick={() => confirmDelete(job.id)} style={{ color: 'red' }}>Delete</button>
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

export default JobDesign;
