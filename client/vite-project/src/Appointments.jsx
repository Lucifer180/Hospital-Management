import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AppointmentCard from '../src/components/AppointmentsCard';
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ patientName: '', doctorName: '', date: '' });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/appointments')
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5001/appointments/add', newAppointment)
      .then(response => {
        console.log(response.data);
        setAppointments([...appointments, response.data]); // Fixed: changed Appointments to appointments
        setNewAppointment({ patientName: '', doctorName: '', date: '' });
      })
      .catch(error => console.error('Error adding appointment:', error.message));
  };

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault();
    axios.put(`http://localhost:5001/appointments/update/${id}`, selectedAppointment) // Changed: post to put
      .then(response => {
        console.log(response.data);
        const updatedApp = { ...selectedAppointment, _id: id };
        setAppointments(appointments.map(appointment => (appointment._id === id ? updatedApp : appointment)));
        setSelectedAppointment(null);
        setIsEditMode(false);
      })
      .catch(error => console.error('Error updating appointment:', error));
  };

  const handleDeleteAppointment = (id) => {
    axios.delete(`http://localhost:5001/appointments/delete/${id}`)
      .then(response => {
        console.log(response.data);
        setAppointments(appointments.filter(appointment => appointment._id !== id));
      })
      .catch(error => console.error('Error deleting appointment:', error));
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditMode(true);
  };

  return (
    <div className="flex-row">
      <div className='flex-column'>
        <div className="add-form">
          <h4>
            {isEditMode ? 'Edit Appointment' : 'Add New Appointment'}
          </h4>
          <form className='appointment-form' onSubmit={isEditMode ? (e) => handleUpdateAppointment(selectedAppointment._id, e) : handleAddAppointment}>
            <label>Patient Name: </label>
            <input
              type="text"
              value={isEditMode ? selectedAppointment.patientName : newAppointment.patientName}
              onChange={e => isEditMode ?
                setSelectedAppointment({
                  ...selectedAppointment, patientName: e.target.value
                }) : setNewAppointment({
                  ...newAppointment, patientName: e.target.value
                })
              }
            />
            <label>Doctor Name</label>
            <input
              type="text"
              value={isEditMode ? selectedAppointment.doctorName : newAppointment.doctorName}
              onChange={e => isEditMode ?
                setSelectedAppointment({
                  ...selectedAppointment, doctorName: e.target.value
                }) : setNewAppointment({
                  ...newAppointment, doctorName: e.target.value
                })
              }
            />
            <label>Date:</label>
            <input
              type='date'
              value={isEditMode ?
                selectedAppointment.date : newAppointment.date
              }
              onChange={e => isEditMode ?
                setSelectedAppointment({ ...selectedAppointment, date: e.target.value }) : setNewAppointment({
                  ...newAppointment, date: e.target.value
                })
              }
            />
            <button type='submit'>
              {isEditMode ? 'Update Appointment' : 'Add Appointment'}
            </button>
          </form>
        </div>
      </div>
      <div className="appointments">
        <h3>Appointments ({appointments.length})</h3>
        <div className="appointment-list">
          {appointments.map(appointment => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;