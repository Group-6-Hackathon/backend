const patientService = require('../services/patient.service');

const createPatient = async (req, res) => {
    try {
        const patient = await patientService.createPatient(req.body);
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await patientService.getPatientById(req.params.id);
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const updatePatientById = async (req, res) => {
    try {
        const patient = await patientService.updatePatientById(req.params.id, req.body);
        if (!patient){
            res.status(404).json({message: `Patient ${req.params.id} not found.`});
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const deletePatientById = async (req, res) => {
    try {
        const patient = await patientService.deletePatientById(req.params.id);
        if (!patient){
            res.status(404).json({message: `Patient ${req.params.id} not found.`});
        }
        res.status(204).json({message: "Patient deleted."});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatientById,
    deletePatientById
};