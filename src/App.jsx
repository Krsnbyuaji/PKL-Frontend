import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import LoginForm from './pages/LoginForm';
import JobDesign from './pages/Job/JobDesign';
import UploadJob from './pages/Job/UploadJob';
import EditJob from './pages/Job/EditJob';
import DaftarUser from './pages/User/DaftarUser';
import EditUser from './pages/User/EditUser';
import AddUser from './pages/User/AddUser';
import Reporting from './pages/Reporting';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/jobdesign' element={<JobDesign />}/>
        <Route path='/uploadjob' element={<UploadJob />}/>
        <Route path='/editjob' element={<EditJob />}/>
        <Route path='/daftaruser' element={<DaftarUser/>}/>
        <Route path='/adduser' element={<AddUser/>}/>
        <Route path='/edituser/:id' element={<EditUser/>}/>
        <Route path='/reporting' element={<Reporting/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App
