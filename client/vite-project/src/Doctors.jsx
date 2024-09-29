import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Doctors.css';
import DoctorsCard from './components/DoctorsCard';
const Doctors = () => {
  const [doctors,setDoctors]=useState([]);
  const [newDoctor,setNewDoctor]=useState({name:'',speciality:''});
  const [selectedDoctor,setSelectedDoctor]=useState(null);
  const [isEditMode,setIsEditMode]=useState(false);
  useEffect(()=>{
    axios.get('http://localhost:5001/doctors')
    .then(response=>setDoctors(response.data))
    .catch(error=>console.log("error fethcing",error));
  },[])

const handleAddDoctor=(e)=>{
  e.preventDefault();
  axios.post('http://localhost:5001/doctors/add',newDoctor)
  .then(response=>{
    console.log("Added doctor",response.data);
    setDoctors([...doctors,response.data]);
    setNewDoctor({name:'',speciality:''});
  })
  .catch(error=>console.error('Error adding doctor',error))
};
const handleupdateDoctor=(id,e)=>{
     e.preventDefault();
     axios.post(`http://localhost:5001/doctors/update/${id}`,selectedDoctor)
     .then(()=>{
      const updateDoc={...selectedDoctor,_id:id};
      console.log('update doc',updateDoc);
      setDoctors(doctors.map(doctor=>(doctor._id===id?updateDoc:doctor)))
      setSelectedDoctor(null)
      setIsEditMode(false);
     })
     .catch(error=>console.error('error deleting doctor',error));
}
const handleEditDoctor=(doctor)=>{
  setSelectedDoctor(doctor);
  setIsEditMode(true);
}
const handleDeleteDoctor=(id)=>{
  axios.delete(`http://localhost:5001/doctors/delete/${id}`)
  .then(response=>{
    console.log(response.data);
    setDoctors(doctors.filter(doctor=>doctor._id!==id));
  })
  .catch(error=>console.log('error deleting doctor',error))
}
  return (
    <div className='main-doc-container'>
      <div className="form-sections">
        <h4>{isEditMode?'Edit Doctor':'Add New Doctor'}</h4>
        <form onSubmit={isEditMode?(e)=>
          handleupdateDoctor(selectedDoctor._id,e):handleAddDoctor
        }>
        <label>Doctor Name:</label>
        <input type="text" value={isEditMode?selectedDoctor.name:newDoctor.name} 
                           onChange={(e)=>isEditMode?
                            setSelectedDoctor({
                              ...selectedDoctor,name:e.target.value
                            }):setNewDoctor({...newDoctor,name:e.target.value})
                           }
        />
        <br />
         <label >
          speciality:
         </label>
         <input type="text" 
         value={isEditMode?
          selectedDoctor.speciality:newDoctor.speciality
         }
         onChange={(e)=>isEditMode?
          setSelectedDoctor({
            ...selectedDoctor,speciality:e.target.value
          }):
          setNewDoctor({...newDoctor,speciality:e.target.value})
         }
         />
         <br />
         <button type='submit'>
          {isEditMode?'update Doctor':'Add Doctor'}
         </button>
</form>
      </div>
    <div className="doctors-section">
      <h3>
        Doctors({doctors.length})
      </h3>
      <div className="doctor-list">
        {doctors.map(doctor=>(
          <DoctorsCard
          key={doctor._id}
          doctor={doctor}
          onEdit={handleEditDoctor}
          onDelete={handleDeleteDoctor}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Doctors