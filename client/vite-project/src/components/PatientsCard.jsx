import React, { useState } from 'react';

const PatientsCard = ({ patient, OnEdit, OnDelete }) => {
  // State to track if the card is marked as completed
  const [isCompleted, setIsCompleted] = useState(false);

  // Function to toggle the completion state
  const toggleCompletion = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div 
      className='patient-card' 
      onClick={toggleCompletion} 
      style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
    >
      <h4>{patient.name}</h4>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <div className='btn-container' style={{ width: "100%" }}>
      <button onClick={() => OnEdit(patient)}>Edit</button>
      <button onClick={() => OnDelete(patient)}>Delete</button>
      </div>
    </div>
  )
}

export default PatientsCard
