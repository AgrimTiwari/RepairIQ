
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body || {};

    if (typeof message !== "string" ||
        !message.trim() ||
        message.length > 4000) {
      return res.status(400).json({
        error: "Enter a valid message (up to 4000 characters)."
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          instructions:
            "You are RepairIQ, a helpful device troubleshooting assistant. Give clear, numbered, safe repair diagnosis steps. Never advise opening dangerous electrical equipment or handling batteries that are swollen, hot, or damaged. Recommend a qualified technician for risky repairs.",
          input: message,
          max_output_tokens: 500
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI request failed:", response.status);
      return res.status(502).json({
        error: "RepairIQ AI is temporarily unavailable."
      });
    }

    const answer = (data.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === "output_text")
      .map(item => item.text)
      .join("\n");

    return res.status(200).json({
      answer: answer || "Please try asking again."
    });
  } catch (error) {
    console.error("RepairIQ backend error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again."
    });
  }
}
