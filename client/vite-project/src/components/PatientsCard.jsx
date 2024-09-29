import React from 'react'

const PatientsCard = ({patient,OnEdit,OnDelete}) => {
    
  return (
    <div className='patient-card'>
      <h4>{patient.name}</h4>
      <p>Age:{patient.age}</p>
      <p>Gender:{patient.gender}</p>
      <div className='btn-container' style={{ width: "100%" }}>
</div>
<button onClick={()=>OnEdit(patient)}>Edit</button>
    </div>
  )
}

export default PatientsCard