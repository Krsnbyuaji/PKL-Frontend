import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';


function Dashboard() {
    const [jobStats, setJobStats] = useState({
        total: 30,
        completed: 20,
        proses: 5,
        hold: 2,
        return: 3
    });

    useEffect(() => {
        fetchJobStats();
    }, []);

    const fetchJobStats = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/job/stats');
            setJobStats(response.data);
        } catch (error) {
            console.error('Error fetching job stats:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <Header />
            <h1>Dashboard</h1>
            <div className="job-stats-container">
                <div className="job-stat-card total-jobs">
                    <h2>Total Job</h2>
                    <p>{jobStats.total}</p>
                </div>
                <div className="job-stat-card approve">
                    <h2>Completed</h2>
                    <p>{jobStats.completed}</p>
                </div>
                <div className="job-stat-card proses">
                    <h2>Proses</h2>
                    <p>{jobStats.proses}</p>
                </div>
                <div className="job-stat-card hold">
                    <h2>Hold</h2>
                    <p>{jobStats.hold}</p>
                </div>
                <div className="job-stat-card return">
                    <h2>Return</h2>
                    <p>{jobStats.return}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
