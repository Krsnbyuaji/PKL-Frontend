import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UploadJob.css';
// import Swal from 'sweetalert2';
// Swal

function UploadJob() {
    const Navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [client, setClient] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const [designers, setDesigners] = useState([]);
    const [formData, setFormData] = useState("")

    useEffect(() => {
        fetchDesigners();
    }, []);

    const fetchDesigners = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user?role=Designer');
            setDesigners(response.data);
        } catch (error) {
            console.error('Error fetching designers:', error);
        }
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const file = name === 'file' ? files[0] : null;
        setFormData({ ...formData, [name]: value, file: file });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, status: e.nativeEvent.submitter.value });
        console.log(formData);
        uploadjOb()
        
    };

    const uploadjOb = async () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            const response = await axios.post('http://localhost:8000/api/job/store', formData, {
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            });
            navigate('/jobdesign')
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        // Hitung jumlah hari tersisa setiap kali nilai deadline berubah
        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline);
            const todayDate = new Date();
            const timeDifference = deadlineDate.getTime() - todayDate.getTime();
            const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
            setFormData({ ...formData, daysRemaining: daysDifference });
        }
    }, [formData.deadline]);


    const handleCancel = () => {
        Navigate('/jobdesign');
    };


    return (
        <div>
            <Sidebar />
            <Header />
            <div className='container'>
                <div className="content">
                    <h2>Tambah Job Design</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Judul:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="client" className="form-label">Nama Client:</label>
                            <input
                                type="text"
                                id="client"
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Deskripsi:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="deadline" className="form-label">Deadline:</label>
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    value={formData.deadline || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col mb-2">
                                <label htmlFor="daysRemaining" className="form-label">Jumlah Hari Yang Tersisa:</label>
                                <input
                                    type="text"
                                    id="daysRemaining"
                                    name="daysRemaining"
                                    value={formData.daysRemaining !== '' ? `${formData.daysRemaining} hari` : 'jumlah hari yang tersisa'}
                                    className="form-control"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="picDesigner" className="form-label">Pilih PIC Designer:</label>
                            <select
                                id="pic_designer_id"
                                name="pic_designer_id"
                                value={formData.pic_designer_id}
                                onChange={handleChange}
                                className="form-control"
                                required
                            >
                                <option value="">Pilih PIC Designer</option>
                                {designers.map((designer) => (
                                    <option key={designer.id} value={designer.id}>{designer.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Pilih File:</label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                accept='.pdf'
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="btn-group">
                            <button type="submit" value={"proses"} className="btn btn-primary">Submit</button>
                            <button type="hold" value={"hold"} className="btn btn-warning">Hold</button>
                            <button type="cancel" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UploadJob;
