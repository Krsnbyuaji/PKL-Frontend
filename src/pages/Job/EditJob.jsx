import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './EditJob.css';

function EditJob() {
    const [user, setUser] = useState('');
    const [file, setFile] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchUserRole();
    }, []);

    const fetchUserRole = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/datauser');
            setUser(response.data.role);
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('comment', comment);
            await axios.post('http://localhost:8000/api/job/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <Header />
            <div className="edit-job-container">
                {user.role === 'Designer' && (
                    <div className="upload-file-section">
                        <h2>Upload File</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="file" onChange={handleFileChange} />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                )}
                {(user.role === 'Koordinator' || user.role === 'QC Designer') && (
                    <div className="comment-section">
                        <h2>Add Comment</h2>
                        <textarea value={comment} onChange={handleCommentChange}></textarea>
                        <button onClick={handleSubmit}>Submit Comment</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditJob;
