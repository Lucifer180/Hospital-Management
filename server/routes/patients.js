const express=require('express');
const router=express.Router();
const Patient = require('../models/Patient');

router.route('/').get((req,res)=>{
    Patient.find()
    .then(patients=>res.json(patients))
    .catch(err=>res.status(400).json({err:err.message}));
});

router.route('/add').post((req,res)=>{
    const {name,age,gender}=req.body;
    if (!name || !age || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newPatient=new Patient({name,age,gender});
    newPatient.save()
    .then(savedPatient=>res.json(savedPatient))
    .catch(err=>res.status(400).json({err:err.message}));
})
router.route('/update/:id').put((req,res)=>{
    Patient.findById(req.params.id)
    .then(patient=>{
        if(!patient){
            return res.status(404).json({message:'patient not found'});
        }
        patient.name=req.body.name;
        patient.age=req.body.age;
        patient.gender=req.body.gender;
        patient.save()
        .then(()=>res.json({message:'patient updated!'}))
        .catch(err=>res.status(404).json({err:err.message}));
    })
    .catch(err=>res.status(404).json({err:err.message}));
})

router.route('/delete/:id').delete((req,res)=>{
    Patient.findByIdAndDelete(req.params.id)
    .then(patient=>{
        if(!patient){
            return res.status(404).json({message:'patient not found'});
        }
        res.json({message:'patient deleted'});
    })
    .catch(err=>res.status(404).json({err:err.message}));
})
module.exports=router;