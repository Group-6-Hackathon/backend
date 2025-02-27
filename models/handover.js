const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const handoverSchema = new Schema({
    createdAt: { type: Date, required: true, default: Date.now },
    patientID: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    handoverSummary: {
        medicalHistory: { type: String, default: '' },
        medications: { type: String, default: '' },
        surgicalHistory: { type: String, default: '' },
        allergies: { type: String, default: '' },
        presentingHistory: { type: String, default: '' },
        gcd: { type: String, default: '' },
        workingDiagnosis: { type: String, default: '' },
        confirmedDiagnosis: { type: String, default: '' },
        pertinentLabResults: { type: String, default: '' },
        criticalLabResults: { type: String, default: '' },
        pertinentImagingResults: { type: String, default: '' },
        abnormalImagingResults: { type: String, default: '' },
        consults: { type: String, default: '' },
        vitals: {
            bloodPressure: { type: String, default: '' },
            heartRate: { type: String, default: '' },
            respRate: { type: String, default: '' },
            oxygenSaturation: { type: String, default: '' },
            temperature: { type: String, default: '' }
        },
        assessmentFindings: { type: String, default: '' },
        currentTreatmentPlan: { type: String, default: '' },
        outstandingTasks: { type: String, default: '' },
        alliedHealthInvolvement: { type: String, default: '' }
    }
});

const Handover = mongoose.model('Handover', handoverSchema);

module.exports = Handover;
