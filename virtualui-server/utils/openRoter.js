import axios from "axios";

export const askAI = async (messages) => {
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is empty.");
    }

    console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY ? "Loaded" : "Missing");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages,
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-OpenRouter-Title": "Component Generator"
        }
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content;

    if (!content?.trim()) {
      throw new Error("AI returned empty response.");
    }

    return content;

  } catch (error) {
    console.error("========== OPENROUTER ERROR ==========");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    console.error("=====================================");

    throw error;
  }
};