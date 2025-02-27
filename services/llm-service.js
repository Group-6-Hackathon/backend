const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateHandoverSummary = async (handoverData) => {
  try {
    // Prepare user message separately for readability
    const userMessage = `Given the following patient handover data in JSON format, generate a structured JSON output that follows this exact format:

### Input JSON:
${JSON.stringify(handoverData, null, 2)}

### Output JSON Format:
{
  "handoverSummary": {
    "currentVisit": "A brief summary of the patient's current medical issue or reason for hospitalization (e.g., 'Appendicitis'). This field is required.",
    "allergies": [
      "A list of known allergies (e.g., 'Latex', 'Penicillin'). If none exist, return an empty array []."
    ],
    "medicalHistory": [
      "A list of past medical conditions or significant diagnoses (e.g., 'Diabetes', 'Hypertension'). If none exist, return an empty array []."
    ],
    "surgicalHistory": [
      "A list of past surgical procedures (e.g., 'Wisdom Teeth Removal', 'Appendectomy'). If none exist, return an empty array []."
    ],
    "outstandingTests": [
      "A list of pending medical tests that have been ordered but not yet completed (e.g., 'CT Scan Pending'). If none exist, return an empty array []."
    ],
    "criticalResults": [
      "A list of urgent or abnormal test results that require immediate attention (e.g., 'WBC Elevated'). If none exist, return an empty array []."
    ],
    "treatmentPlan": "A concise summary of the current treatment plan or next steps for patient care (e.g., 'Booked for E6 Appendectomy'). This field is required."
  }
}

### Formatting Rules:
- Follow the JSON structure exactly.
- Do not include extra information.
- Replace missing list values with an empty array [].
- Ensure string fields are never empty; instead, return "None" if unknown.
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
                  currentVisit: { type: "string" },
                  allergies: { type: "array", items: { type: "string" } },
                  medicalHistory: { type: "array", items: { type: "string" } },
                  surgicalHistory: { type: "array", items: { type: "string" } },
                  outstandingTests: { type: "array", items: { type: "string" } },
                  criticalResults: { type: "array", items: { type: "string" } },
                  treatmentPlan: { type: "string" },
                },
                required: ["currentVisit", "treatmentPlan"],
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
