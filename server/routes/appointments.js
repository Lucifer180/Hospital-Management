const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');


router.route('/').get(async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.route('/add').post(async (req, res) => {
    const { patientName, doctorName, date } = req.body;

    if (!patientName || !doctorName || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newAppointment = new Appointment({ patientName, doctorName, date });

    try {
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.route('/update/:id').put(async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        const { patientName, doctorName, date } = req.body;
        if (patientName) appointment.patientName = patientName;
        if (doctorName) appointment.doctorName = doctorName;
        if (date) appointment.date = date;

        await appointment.save();
        res.json({ message: 'Appointment updated!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.route('/delete/:id').delete(async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
