
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, ArrowDown, RotateCcw } from "lucide-react";
import "./AIMissingPersonAssistance.css";

const FAQ_DATA = [
  {
    id: 1,
    question: "How do I report a missing person?",
    answer:
      "Navigate to the 'Report Missing Person' section from the main menu, fill out the incident form with the person's details, upload a recent clear photo, and click 'Submit Report' to generate an instant alert and tracking PDF.",
  },
  {
    id: 2,
    question: "What information should I provide?",
    answer:
      "Provide their full name, approximate age, height, build, clothing worn at the time of disappearance, the exact venue zone or gate where they were last seen, the time last seen, and your active mobile contact number.",
  },
  {
    id: 3,
    question: "How do I upload a person's photograph?",
    answer:
      "In the reporting form, click on the 'Upload Photo' box. Select a clear image in JPG or PNG format.",
  },
  {
    id: 4,
    question: "What happens after submitting the report?",
    answer:
      "Your report is saved in the SafeTour system and assigned a unique Report ID. Authorized event staff can use this ID to verify the case and record updates.",
  },
  {
    id: 5,
    question: "What is a Report ID?",
    answer:
      "A Report ID is a unique tracking code generated upon submission. It helps identify and track a missing-person report.",
  },
  {
    id: 6,
    question: "What should I do after generating the PDF?",
    answer:
      "Save the PDF and share it with the nearest authorized SafeTour Help Desk or police outpost.",
  },
  {
    id: 7,
    question: "How can I check the live status of my report?",
    answer:
      "Open the Track Report section and enter your Report ID to check available updates.",
  },
  {
    id: 8,
    question: "Where are the nearest SafeTour Help Desks located?",
    answer:
      "Help Desks can be located at main entry gates, medical tents and lost-and-found kiosks. Check the event map for their locations.",
  },
  {
    id: 9,
    question: "What if the missing person is a child or elderly individual?",
    answer:
      "Inform event security or police immediately and mark the report as high priority if that option is available.",
  },
  {
    id: 10,
    question: "How do I close a report if the person is found?",
    answer:
      "Once the person is safely reunited, contact the nearest Help Desk and request that the report be marked as found.",
  },
];

const AIMissingPersonAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle scrolling
  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = chatContainerRef.current;

    const isNearBottom =
      scrollHeight - scrollTop - clientHeight < 80;

    setShowScrollBtn(!isNearBottom);
  };

  // Select FAQ question
  const handleSelectQuestion = (faq) => {
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: faq.question,
    };

    const botMsg = {
      id: Date.now() + 1,
      sender: "bot",
      text: faq.answer,
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
      botMsg,
    ]);
  };

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();

    const trimmed = inputValue.trim();

    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    const lower = trimmed.toLowerCase();

    const matchedFaq = FAQ_DATA.find((item) => {
      const keywords = item.question
        .toLowerCase()
        .replace(/[?]/g, "")
        .split(" ")
        .filter((word) => word.length > 3);

      return keywords.some((keyword) =>
        lower.includes(keyword)
      );
    });

    const botMsg = {
      id: Date.now() + 1,
      sender: "bot",
      text: matchedFaq
        ? matchedFaq.answer
        : "I can help with reporting a missing person, required details, photo uploads, Report IDs, PDF sharing and Help Desk information. Please select one of the questions above or ask about these topics.",
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
      botMsg,
    ]);

    setInputValue("");
  };

  // Reset conversation
  const handleReset = () => {
    setMessages([]);
    setInputValue("");
    setShowScrollBtn(false);
  };

  return (
    <div className="ai-assistant-page">

      <div className="ai-chat-container">

        {/* Header */}

        <div className="ai-chat-header">

          <div className="ai-header-left">

            <div className="ai-bot-icon">
              <Bot size={25} />
            </div>

            <div className="ai-header-title">

              <h1>SafeTour Assistant</h1>

              <p>
                <span className="online-dot"></span>
                Online assistance
              </p>

            </div>

          </div>

          {messages.length > 0 && (
            <button
              onClick={handleReset}
              className="ai-reset-btn"
              title="Clear conversation"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}

        </div>

        {/* Chat Body */}

        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="ai-chat-body"
        >

          {/* Welcome Message */}

          <div className="ai-welcome">

            <p>
              Hello! Welcome to SafeTour. I can help you
              report a missing person during a mega event.
            </p>

            <p>
              What would you like help with?
            </p>

          </div>

          {/* FAQ Questions */}

          <div className="ai-faq-list">

            {FAQ_DATA.map((item) => (

              <button
                key={item.id}
                onClick={() => handleSelectQuestion(item)}
                className="ai-faq-button"
              >

                <span className="ai-faq-number">
                  {item.id}.
                </span>

                <span className="ai-faq-question">
                  {item.question}
                </span>

              </button>

            ))}

          </div>

          {/* Chat Messages */}

          {messages.length > 0 && (

            <div className="ai-conversation">

              {messages.map((msg) => (

                <div
                  key={msg.id}
                  className={`ai-message-row ${
                    msg.sender === "user"
                      ? "user"
                      : "bot"
                  }`}
                >

                  <div
                    className={`ai-message ${
                      msg.sender === "user"
                        ? "user"
                        : "bot"
                    }`}
                  >
                    {msg.text}
                  </div>

                </div>

              ))}

            </div>

          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Scroll Down Button */}

        {showScrollBtn && (

          <button
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
            className="ai-scroll-btn"
          >
            <ArrowDown size={17} />
          </button>

        )}

        {/* Input Section */}

        <form
          onSubmit={handleSendMessage}
          className="ai-input-form"
        >

          <input
            type="text"
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value)
            }
            placeholder="Ask a question about reporting a missing person..."
            className="ai-chat-input"
          />

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="ai-send-btn"
          >

            <span>Send</span>
            <Send size={15} />

          </button>

        </form>

      </div>

    </div>
  );
};

export default AIMissingPersonAssistant;
