const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  dateOfBirth: { type: Date, required: true },
  visitReason: { type: String, required: true },
  typeAndScreen: {
    bloodType: { type: String, enum: ["A", "B", "AB", "O"] },
    rhFactor: { type: String, enum: ["+", "-"] },
    preScreening: { type: Boolean, required: true },
  },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },

  // This is undefined until we get more information
  labResults: { type: Map, of: String },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
