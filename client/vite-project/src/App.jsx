import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Appointments from '../src/Appointments';
import Patients from '../src/Patients';
import Doctors from './Doctors';
import './app.css';
const App = () => {
  const isLinkActive=(path)=>window.location.pathname===path;

  return (
    <Router>
      <div className="container">
        <h1 style={{color:"green"}}>
          Hospital management App
        </h1>
        <nav>
          <ul>
            <li className={isLinkActive('/appoinments')?'active':''}><Link to='/appointments'>Appointment</Link></li>
            <li className={isLinkActive('/appointments')?'active':''}><Link to='/doctors'>Doctors</Link></li>
            <li className={isLinkActive('/patients')?'active':''}><Link to='/patients'>Patients</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/appointments" element={<Appointments/>}></Route>
          <Route path='/' element={<Appointments/>}></Route>
          <Route path='/doctors' element={<Doctors/>}></Route>
          <Route path='/patients' element={<Patients/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App