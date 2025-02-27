const Patient = require('../models/patient');

const createPatient = async (patientBody) => {
    try {
        const patient = await Patient.create(patientBody);
        return patient;
    } catch (error) {
        throw new Error(`Patient creation error: ${error.message}`);
    }
};

const getAllPatients = async () => {
    try {
        const patient = await Patient.find();
        return patient;
    } catch (error) {
        throw new Error(`Get all patients error: ${error.message}`);
    }
};

const getPatientById = async (id) => {
    try {
        const patient = await Patient.findById(id);
        return patient;
    } catch (error) {
        throw new Error(`Get patient by id error: ${error.message}`);
    }
};

const updatePatientById = async (id, handoverBody) => {
    try {
        const patient = await Patient.findByIdAndUpdate(id, handoverBody, {new: true});
        return patient;
    } catch (error) {
        throw new Error(`Update patient by id error: ${error.message}`);
    }
};

const deletePatientById = async (id) => {
    try {
        const patient = await Patient.findByIdAndDelete(id);
        return patient;
    } catch (error) {
        throw new Error(`Delete patient by id error: ${error.message}`);
    }
};

module.exports = {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatientById,
    deletePatientById
};