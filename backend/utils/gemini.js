const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
        responseMimeType: "application/json",
    }
});

const generateMeetingSummary = async (transcript) => {
    try {
        const prompt = `
You are an AI Meeting Assistant.

Your job is ONLY to analyze business meeting transcripts.

Do NOT answer unrelated questions.

Analyze the meeting transcript and generate a JSON response with the following structure:
{
  "summary": "SHORT SUMMARY - Write a professional concise summary.",
  "keyPoints": [
    "Important discussion point 1",
    "Important discussion point 2"
  ],
  "tasks": [
    {
      "task": "Task description",
      "owner": "Person responsible or 'Not Assigned'",
      "priority": "Low, Medium, or High",
      "dueDate": "YYYY-MM-DD or null if not mentioned"
    }
  ]
}

IMPORTANT RULES:
- Only analyze meeting-related content.
- Return ONLY valid JSON.
- If transcript is not meeting-related, return an empty object: {}

Meeting Transcript:
${transcript}
`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        
        return JSON.parse(response);
    } catch (error) {
        console.error("Gemini Error:", error);
        return null;
    }
};

module.exports = {
    generateMeetingSummary,
};