export async function sendToLLM(conversation) {
  const API_KEY = import.meta.env.VITE_LLM_API_KEY;
  const API_URL = import.meta.env.VITE_LLM_API_URL;

  const userAndAssistantText = conversation
    .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.text}`)
    .join("\n");

  const body = {
    contents: [
      {
        parts: [{ text: userAndAssistantText }],
      },
    ],
  };

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log("API RESPONSE:", data);

  if (!res.ok) {
    throw new Error(
      data.error?.message || "Gemini API Request Failed"
    );
  }

  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response received."
  );
}
