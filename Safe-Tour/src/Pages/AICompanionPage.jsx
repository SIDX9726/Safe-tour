import React, { useState, useRef, useEffect } from "react";

// API configuration - using your actual API key
const API_KEY = "AIzaSyCweeWk3FqhaBxngN16kKQbxPh68683i7M";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const SYSTEM_INSTRUCTION = `You are RakshaBot, a multilingual tourist guide and safety assistant focused on Northeast India. 
Your role is to help tourists feel safe, informed, and culturally aware during their travels.

Tone & Personality:
- Be empathetic, calm, and reassuring.
- Use a friendly conversational style but keep answers professional and accurate.
- Do NOT greet the user ("Hello!", "Hi there!", "Hi, I'm RakshaBot" etc.) in every reply. Only greet once, at the very first message of a session. For every message after that, respond directly to what was asked — no re-introduction, no repeated greeting.
- Always prioritize safety and emergency guidance over general tourist advice.

Core Responsibilities:
1. Safety Awareness
   - Answer safety-related questions directly and specifically. If a tourist asks which areas, routes, or times of day carry more risk so they can avoid them, name them (known unsafe neighborhoods, isolated stretches, border-adjacent zones, etc.) based on general/commonly known travel-safety knowledge — do not deflect a safety-avoidance question with a vague non-answer, since withholding that information is itself unsafe for the tourist. Pair it with a brief note that conditions change and official advisories should be checked for the latest status, but always give the substantive answer first.
   - Provide practical safety tips: avoid isolated areas, prefer group travel, keep emergency numbers handy, etc.
   - Share verified emergency contacts (police: 100, women's helpline: 1091, ambulance: 108, tourist helpline: 1363).
   - If asked about ongoing unrest or risky travel zones, name the specific regions/areas of concern and advise checking official advisories for the current status.

2. Emergency Support
   - If the user says they feel unsafe, immediately respond with steps:
     - Suggest calling the nearest helpline.
     - Share the most relevant number (police/women's helpline/ambulance).
     - Encourage contacting local authorities or trusted contacts.
   - Always stay calm and supportive in emergencies.

3. Tourist Guidance
   - Suggest safe tourist spots, hospitals, and police stations in major cities (Shillong, Guwahati, Imphal, Gangtok, Aizawl, Kohima, Itanagar, Agartala).
   - Provide transportation tips (safe taxi services, official bus routes, airport information).
   - Share cultural etiquette (e.g., respect for local tribes, dress modestly in rural areas, asking permission before photography).
   - Offer translations of common phrases in Hindi, Assamese, Bengali, and local tribal languages when possible.

Rules & Limitations:
- Do NOT give false guarantees of safety (e.g. never say an area is "100% safe"). Instead give the honest, specific picture and note that conditions change, so travelers should confirm locally.
- Never provide political opinions. Stay neutral and factual.
- Always encourage contacting official channels during emergencies.
- Keep answers short, clear, and easy to follow — especially for stressed tourists.`;

const SUGGESTIONS = [
  { label: "Safety in Shillong", query: "Is Shillong safe at night?" },
  { label: "Emergency numbers", query: "Emergency contacts" },
  { label: "Assam attractions", query: "Best places to visit in Assam" },
  { label: "Cultural tips", query: "Cultural etiquette in Northeast India" },
];

export default function AICompanionPage() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm RakshaBot, your safety guide for Northeast India. How can I assist you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const getTimeString = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const clearMemory = () => {
    setHistory([]);
    setMessages([
      {
        sender: "bot",
        text: "Memory cleared. Starting a fresh conversation!",
        time: getTimeString(),
      },
    ]);
  };

  const handleSend = async (queryText) => {
    const messageToSend = (queryText || input).trim();
    if (!messageToSend || loading) return;

    if (messageToSend.toLowerCase() === "forget") {
      clearMemory();
      setInput("");
      return;
    }

    const currentTime = getTimeString();

    // Add user message to state
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: messageToSend, time: currentTime },
    ]);
    if (!queryText) setInput("");
    setLoading(true);

    // Multi-turn context
    const updatedHistory = [
      ...history,
      { role: "user", parts: [{ text: messageToSend }] },
    ].slice(-20);

    const requestBody = {
      contents: updatedHistory,
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const botResponseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't generate a response right now.";

      // Add bot message
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponseText, time: getTimeString() },
      ]);

      // Save turn to history
      setHistory([
        ...updatedHistory,
        { role: "model", parts: [{ text: botResponseText }] },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm sorry, I'm experiencing technical difficulties right now. Please try again later.",
          time: getTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const showEmergencyInfo = () => {
    const emergencyMessage = `🚨 Emergency Contacts:\n\n🚓 Police: 100\n🚑 Ambulance: 108\n👮 Women's Helpline: 1091\n🧳 Tourist Helpline: 1363\n\nPlease contact local authorities immediately if you're in danger.`;
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: emergencyMessage, time: getTimeString() },
    ]);
  };

  return (
    <>
      <style>{`
        .ai-page-wrapper {
          max-width: 700px;
          margin: 0 auto;
          padding: 24px 16px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          box-sizing: border-box;
        }
        .ai-page-wrapper * {
          box-sizing: border-box;
        }
        .ai-page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 16px;
        }
        .ai-header-content h1 {
          font-size: 1.5rem;
          margin: 0 0 4px 0;
          color: #1a2a6c;
        }
        .ai-header-content p {
          font-size: 0.9rem;
          margin: 0;
          color: #666;
        }
        .ai-emergency-btn {
          background-color: #ff4d4d;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 10px 18px;
          font-size: 0.85rem;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 2px 10px rgba(255, 77, 77, 0.4);
          transition: all 0.3s;
          font-weight: 600;
        }
        .ai-emergency-btn:hover {
          background-color: #e60000;
          transform: scale(1.03);
        }
        .raksha-chat {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 540px;
        }
        .raksha-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: linear-gradient(to right, #1a2a6c, #3556c9);
          color: white;
        }
        .raksha-avatar {
          font-size: 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .raksha-header h2 {
          font-size: 1.2rem;
          margin: 0;
        }
        .raksha-status {
          font-size: 0.75rem;
          opacity: 0.9;
        }
        .raksha-messages {
          flex: 1;
          overflow-y: auto;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background-color: #fcfcfc;
        }
        .raksha-message-row {
          display: flex;
          width: 100%;
        }
        .raksha-message-row.user {
          justify-content: flex-end;
        }
        .raksha-message-row.bot {
          justify-content: flex-start;
        }
        .raksha-message {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 0.92rem;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .raksha-message.user {
          background-color: #e3f2fd;
          border-bottom-right-radius: 5px;
          color: #0d47a1;
        }
        .raksha-message.bot {
          background-color: #f5f5f5;
          border-bottom-left-radius: 5px;
          color: #333;
        }
        .message-time {
          font-size: 0.7rem;
          color: #888;
          margin-top: 5px;
          text-align: right;
        }
        .quick-replies-container {
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 12px 14px;
          margin-top: 6px;
        }
        .quick-reply-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #3556c9;
          margin: 0 0 8px 0;
        }
        .quick-replies {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .quick-reply-btn {
          background-color: #e3f2fd;
          border: 1px solid #bbdefb;
          border-radius: 16px;
          padding: 6px 12px;
          font-size: 0.82rem;
          color: #1565c0;
          cursor: pointer;
          transition: all 0.2s;
        }
        .quick-reply-btn:hover {
          background-color: #bbdefb;
          transform: translateY(-2px);
        }
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background-color: #9e9ea1;
          border-radius: 50%;
          display: inline-block;
          animation: typing 1s infinite;
        }
        .typing-indicator span:nth-of-type(2) {
          animation-delay: 0.33s;
        }
        .typing-indicator span:nth-of-type(3) {
          animation-delay: 0.66s;
        }
        @keyframes typing {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }
        .raksha-input {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background-color: white;
          border-top: 1px solid #eee;
        }
        .raksha-input input {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 25px;
          outline: none;
          font-size: 0.95rem;
          transition: border-color 0.3s;
        }
        .raksha-input input:focus {
          border-color: #3556c9;
          box-shadow: 0 0 0 2px rgba(53, 86, 201, 0.2);
        }
        .raksha-send-btn {
          background-color: #3556c9;
          color: white;
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
          font-size: 1rem;
        }
        .raksha-send-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .raksha-send-btn:not(:disabled):hover {
          background-color: #1a2a6c;
          transform: scale(1.05);
        }
        .ai-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 18px;
        }
        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 8px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #475569;
          text-align: center;
          gap: 4px;
        }
        .feature-icon {
          font-size: 1.2rem;
        }
        @media (max-width: 600px) {
          .ai-page-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .ai-emergency-btn {
            align-self: flex-start;
          }
          .ai-features {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="ai-page-wrapper">
        <div className="ai-page-header">
          <div className="ai-header-content">
            <h1>AI Tourist Companion</h1>
            <p>Your multilingual tourist guide and safety assistant for Northeast India</p>
          </div>
          <button className="ai-emergency-btn" onClick={showEmergencyInfo}>
            🚨 Emergency Help
          </button>
        </div>

        <div className="raksha-chat">
          <div className="raksha-header">
            <div className="raksha-avatar">🛡️</div>
            <div>
              <h2>RakshaBot</h2>
              <span className="raksha-status">🟢 Online • Safety Assistant</span>
            </div>
          </div>

          <div className="raksha-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`raksha-message-row ${msg.sender}`}>
                <div className={`raksha-message ${msg.sender}`}>
                  <div>{msg.text}</div>
                  <div className="message-time">{msg.time}</div>
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="quick-replies-container">
                <p className="quick-reply-title">💡 Suggested topics:</p>
                <div className="quick-replies">
                  {SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="quick-reply-btn"
                      onClick={() => handleSend(item.query)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="raksha-message-row bot">
                <div className="raksha-message bot typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="raksha-input">
            <input
              type="text"
              value={input}
              placeholder="Type your message here (or 'forget' to reset)..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              type="button"
              className="raksha-send-btn"
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>
        </div>

        <div className="ai-features">
          <div className="feature-item">
            <span className="feature-icon">🌐</span>
            <span>Multilingual</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <span>Safety Guidance</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📍</span>
            <span>Tourist Assistance</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚨</span>
            <span>Emergency Support</span>
          </div>
        </div>
      </div>
    </>
  );
} 