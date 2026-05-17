const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateMeetingSummary = async (transcript) => {
  try {
    const prompt = `
You are an advanced AI meeting assistant.

Analyze the following meeting transcript carefully.

Generate a PROFESSIONAL and DETAILED response in STRICT JSON format.

IMPORTANT:
- Make summaries detailed and executive-level
- Clearly identify action items
- Detect owners and due dates
- Include blockers and next steps
- Keep the tone professional

Return ONLY valid JSON.

JSON FORMAT:

{
  "summary": "Detailed executive summary here",

  "keyPoints": [
    "Point 1",
    "Point 2",
    "Point 3"
  ],

  "decisions": [
    "Decision 1",
    "Decision 2"
  ],

  "blockers": [
    "Blocker 1"
  ],

  "nextSteps": [
    "Next step 1"
  ],

  "tasks": [
    {
      "task": "Task title",
      "owner": "Person name",
      "priority": "High",
      "dueDate": "2026-06-01"
    }
  ]
}

MEETING TRANSCRIPT:

${transcript}
`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("Groq Error:", error);
    return null;
  }
};

module.exports = {
  generateMeetingSummary,
};