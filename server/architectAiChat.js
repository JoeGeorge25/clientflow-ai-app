import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleArchitectChat(systemPrompt, userMessage) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    });

    return {
      success: true,
      message: response.choices[0].message.content,
    };
  } catch (error) {
    console.error("Architect AI chat error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
