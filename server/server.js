const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const patientRouter=require('./routes/patients');
const doctorsRouter=require('./routes/doctors');
const appointmentRouter=require('./routes/appointments');
const app=express();
const PORT=5001;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/');
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Connected to MongoDB');
});
 app.use('/patients',patientRouter);
app.use('/doctors',doctorsRouter);
app.use('/appointments',appointmentRouter);
app.listen(PORT,()=>
{
    console.log(`server is running on port ${PORT}`);
});