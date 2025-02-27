const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateHandoverSummary = async (healthData) => {
  try {
    // Prepare user message separately for readability
    const userMessage = `Given the following patient handover data in JSON format, generate a structured JSON output that follows this exact format:

### Input JSON:
${JSON.stringify(healthData, null, 2)}

### Output JSON Format:
{
  "handoverSummary": {
    "medicalHistory": "Relevant past medical history, including chronic conditions.",
    "medications": "Current medications the patient is prescribed.",
    "surgicalHistory": "List of past surgeries or procedures (e.g., 'Appendectomy').",
    "allergies": "Known allergies to medications, foods, or other substances.",
    "presentingHistory": "Details from the emergency triage note or emergency doctor note summarizing the patient's initial presentation.",
    "gcd": "Goals of Care Designation – Patient's wishes regarding resuscitation, ICU admission, intubation, etc.",
    "workingDiagnosis": "Suspected diagnosis based on current findings.",
    "confirmedDiagnosis": "Confirmed final diagnosis based on test results and clinical findings.",
    "pertinentLabResults": "Lab results relevant to the patient's condition.",
    "criticalLabResults": "Urgent or life-threatening lab results requiring immediate attention.",
    "pertinentImagingResults": "Relevant imaging findings from CT scans, X-rays, ultrasounds, etc.",
    "abnormalImagingResults": "Abnormal imaging findings that require follow-up.",
    "consults": "Consultations requested from other specialties (e.g., Neurology, Cardiology).",
    "vitals": {
      "bloodPressure": "Most recent blood pressure reading.",
      "heartRate": "Most recent heart rate.",
      "respRate": "Most recent respiratory rate.",
      "oxygenSaturation": "Most recent oxygen saturation level.",
      "temperature": "Most recent body temperature."
    },
    "assessmentFindings": "Findings from nursing assessments and progress notes.",
    "currentTreatmentPlan": "Current treatment plan as outlined by healthcare teams' progress notes.",
    "outstandingTasks": "Pending nursing tasks that need to be completed during the shift.",
    "alliedHealthInvolvement": "Notes from allied health professionals (e.g., physiotherapy, occupational therapy)."
  }
}

### Formatting Rules:
- Follow the JSON structure exactly.
- Ensure all fields are present in the output.
- **Keep responses concise**: Use brief, clear, and medically relevant phrases without unnecessary details.
- **Summarize where possible**: Avoid long sentences; use keywords instead of full explanations.
- **Do not include excessive context**: Only provide the necessary information for the handover.
- If any field has no value, return an empty string ("").
- Do not add extra information beyond what is provided in the input.
- **Do not repeat similar information**: If a detail is mentioned in another section, do not duplicate it.
- **Return only valid JSON with no additional text.**`;

    // Send request to OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that generates structured, concise, and accurate patient handover summaries in JSON format. The output must match the given schema exactly.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: 500,

      // JSON schema enforcement
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "handover_summary",
          schema: {
            type: "object",
            properties: {
              handoverSummary: {
                type: "object",
                properties: {
                  medicalHistory: { type: "string", default: "" },
                  medications: { type: "string", default: "" },
                  surgicalHistory: { type: "string", default: "" },
                  allergies: { type: "string", default: "" },
                  presentingHistory: { type: "string", default: "" },
                  gcd: { type: "string", default: "" },
                  workingDiagnosis: { type: "string", default: "" },
                  confirmedDiagnosis: { type: "string", default: "" },
                  pertinentLabResults: { type: "string", default: "" },
                  criticalLabResults: { type: "string", default: "" },
                  pertinentImagingResults: { type: "string", default: "" },
                  abnormalImagingResults: { type: "string", default: "" },
                  consults: { type: "string", default: "" },
                  vitals: {
                    type: "object",
                    properties: {
                      bloodPressure: { type: "string", default: "" },
                      heartRate: { type: "string", default: "" },
                      respRate: { type: "string", default: "" },
                      oxygenSaturation: { type: "string", default: "" },
                      temperature: { type: "string", default: "" },
                    },
                    required: [
                      "bloodPressure",
                      "heartRate",
                      "respRate",
                      "oxygenSaturation",
                      "temperature",
                    ],
                  },
                  assessmentFindings: { type: "string", default: "" },
                  currentTreatmentPlan: { type: "string", default: "" },
                  outstandingTasks: { type: "string", default: "" },
                  alliedHealthInvolvement: { type: "string", default: "" },
                },
                required: [
                  "medicalHistory",
                  "medications",
                  "surgicalHistory",
                  "allergies",
                  "presentingHistory",
                  "gcd",
                  "workingDiagnosis",
                  "confirmedDiagnosis",
                  "pertinentLabResults",
                  "criticalLabResults",
                  "pertinentImagingResults",
                  "abnormalImagingResults",
                  "consults",
                  "vitals",
                  "assessmentFindings",
                  "currentTreatmentPlan",
                  "outstandingTasks",
                  "alliedHealthInvolvement",
                ],
              },
            },
            required: ["handoverSummary"],
          },
        },
      },
    });

    // Ensure safe response handling
    if (!response.choices || !response.choices[0]?.message?.content) {
      throw new Error("Invalid response from OpenAI API");
    }

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error);
    throw new Error("Failed to generate handover summary");
  }
};

module.exports = { generateHandoverSummary };
