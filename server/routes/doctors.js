const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.route('/').get((req, res) => {
    Doctor.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Add a new doctor
router.route('/add').post((req, res) => {
    const { name, speciality } = req.body;

    // Basic validation
    if (!name || !speciality) {
        return res.status(400).json({ error: 'Name and speciality are required.' });
    }

    const newDoctor = new Doctor({ name, speciality });
    newDoctor.save()
        .then(savedDoctor => res.status(201).json(savedDoctor))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a doctor
router.route('/update/:id').put((req, res) => {
    const { name, speciality } = req.body;

    Doctor.findById(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            doctor.name = name || doctor.name; // Only update if provided
            doctor.speciality = speciality || doctor.speciality;

            doctor.save()
                .then(() => res.json({ message: 'Doctor updated!' }))
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a doctor
router.route('/delete/:id').delete((req, res) => {
    Doctor.findByIdAndDelete(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            res.json({ message: 'Doctor deleted!' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
