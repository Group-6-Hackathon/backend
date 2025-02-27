const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vitalsSchema = new Schema({
    time: { type: Date, required: true },
    bloodPressure: { type: String, default: '' },
    heartRate: { type: String, default: '' },
    respRate: { type: String, default: '' },
    temperature: { type: String, default: '' },
    oxygenSaturation: { type: String, default: '' },
    oxygenSource: { type: String, default: '' },
    pain: { type: String, default: '' }
});

const chartingSchema = new Schema({
    patientID: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    allergies: {
        drugAllergies: { type: String, default: '' },
        foodAllergies: { type: String, default: '' },
        latexAllergy: { type: Boolean, default: false }
    },
    gcd: {type: String, default: '' },
    pastMedicalHistory: { type: String, default: '' },
    surgicalHistory: { type: String, default: '' },
    homeMedications: { type: String, default: '' },
    admissionHistory: {
        admissionDate: { type: Date, default: Date.now },
        admittingService: { type: String, default: '' },
        reasonForAdmission: { type: String, default: '' }
    },
    currentDiagnoses: { type: String, default: '' },
    vitalSignsHistory: [vitalsSchema],
    orders: { type: String, default: '' },
    laboratoryResults: { type: String, default: '' },
    diagnosticImaging: { type: String, default: '' },
    physicianNotes: { type: String, default: '' },
    nursingNotes: { type: String, default: '' },
    consults: { type: String, default: '' },
    alliedHealth: { type: String, default: '' },
    currentPlan: { type: String, default: '' },
    triageNote: { // Only applicable if patient in ER
        triageTime: { type: Date, default: Date.now },
        chiefComplaint: { type: String, default: '' },
        triageAssessment: { type: String, default: '' },
        EDAcuity: { type: String, default: '' }
    }
});

const Charting = mongoose.model('Charting', chartingSchema);

module.exports = Charting;