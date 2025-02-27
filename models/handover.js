const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const handoverSchema = new Schema({
    createdAt: { type: Date, required: true, default: Date.now },
    patientID: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    handoverSummary: {
        currentVisit: { type: String, required: true },
        allergies: { type: [String], default: [] },
        medicalHistory: { type: [String], default: [] },
        surgicalHistory: { type: [String], default: [] },
        outstandingTests: { type: [String], default: [] },
        criticalResults: { type: [String], default: [] },
        treatmentPlan: { type: String, required: true }
    }
});

const Handover = mongoose.model('Handover', handoverSchema);

module.exports = Handover;
