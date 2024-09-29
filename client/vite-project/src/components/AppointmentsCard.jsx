import React from 'react';

const AppointmentsCard = ({appointment,onEdit,onDelete}) => {
  const formattedDate = appointment.date
    ? new Date(appointment.date).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : 'Invalid date';

  return (
    <div>
        <div className="appointment-card">
            <p>
              <span>Patient:</span>
              {appointment.patientName}
            </p>
            <p>
              <span>Date</span>
              {formattedDate}
            </p>
            <div className="btn-container">
              <button onClick={()=>onEdit(appointment)}>Edit</button>
              <button onClick={()=>onDelete(appointment._id)}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default AppointmentsCard