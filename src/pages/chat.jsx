import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch("/server/architectAiChat.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        routeKey: "general", // optional: can change per page
      }),
    });

    const data = await res.json();

    const aiMessage = {
      role: "assistant",
      content: data.reply || "No response",
    };

    setMessages((prev) => [...prev, aiMessage]);

    setInput("");
  }

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Architect AI</h1>

      <div
        style={{
          border: "1px solid #333",
          borderRadius: "8px",
          padding: "10px",
          height: "60vh",
          overflowY: "auto",
          marginBottom: "20px",
          background: "#111",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: "12px",
              textAlign: msg.role === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: "8px",
                background: msg.role === "user" ? "#4a6cff" : "#333",
                color: "white",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #444",
            background: "#222",
            color: "white",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "12px 18px",
            background: "#4a6cff",
            color: "white",
            borderRadius: "6px",
            border: "none",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
