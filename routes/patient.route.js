const express = require('express');
const patientController = require('../controllers/patient.controller');
const router = express.Router();

router.post('/', patientController.createPatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.put('/:id', patientController.updatePatientById);
router.delete('/:id', patientController.deletePatientById);

module.exports = router;