import React, { useState } from 'react';
import axios from 'axios';
import './Reporting.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Reporting() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDesigner, setFilterDesigner] = useState('');
    const [filterClient, setFilterClient] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = async () => {
        // Lakukan penanganan logika untuk mengirim data ke backend sesuai dengan kebutuhan
        // Contoh:
        const response = await axios.post('http://localhost:8000/api/reporting', {
            startDate,
            endDate,
            filterStatus,
            filterDesigner,
            filterClient,
            searchQuery
        });
        // Lakukan logika untuk menangani hasil dari respons backend
        console.log(response.data);
    };

    const handleExportPDF = async () => {
        // Lakukan logika untuk mengekspor data ke PDF
        // Contoh:
        const response = await axios.post('http://localhost:8000/api/export-pdf', {
            startDate,
            endDate,
            filterStatus,
            filterDesigner,
            filterClient,
            searchQuery
        });
        // Lakukan logika untuk menangani hasil dari respons backend
        console.log(response.data);
    };

    return (
        <div>
            <Sidebar />
            <Header />
            <div className="reporting-container">
                <div className="reporting-filters">
                    <div className="date-filters">
                        <label htmlFor="startDate">Start Date:</label>
                        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <label htmlFor="endDate">End Date:</label>
                        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className="other-filters">
                        <label htmlFor="filterStatus">Filter:</label>
                        <select id="filterStatus" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="">All</option>
                            <option value="On Progress">Status</option>
                            <option value="Return">Designer</option>
                            <option value="Hold">Client</option>
                        </select>
                    </div>
                    <div className="search-section">
                        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className="export-section">
                    <button className="export-pdf-btn" onClick={handleExportPDF}>Export to PDF</button>
                </div>
            </div>
        </div>
    );
}

export default Reporting;
