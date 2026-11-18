function AICompanion() {
  return (
    <div className="ai-companion">

      {/* Header */}

      <div className="ai-header">

        <div className="ai-title">

          <div className="ai-icon">
            ✦
          </div>

          <div>
            <h3>AI Tourist Companion</h3>

            <p>
              Your smart travel assistant
            </p>
          </div>

        </div>

        <span className="ai-online">
          ● Online
        </span>

      </div>


      {/* Chat */}

      <div className="chat-area">

        <div className="ai-message">
          <div className="message-icon">✦</div>

          <div>
            <p>
              Hello! How can I help you today?
            </p>

            <span>AI Assistant • Just now</span>
          </div>
        </div>


        <div className="user-message">
          <p>
            Show me safe places to visit nearby.
          </p>
        </div>


        <div className="ai-message">

          <div className="message-icon">✦</div>

          <div>
            <p>
              I can help you find nearby safe tourist
              attractions and plan your route.
            </p>

            <span>AI Assistant • Just now</span>
          </div>

        </div>

      </div>


      {/* Quick Questions */}

      <div className="quick-questions">

        <button>📍 Safe places nearby</button>

        <button>🗺️ Plan my itinerary</button>

        <button>🌐 Change language</button>

      </div>


      {/* Input */}

      <div className="ai-input">

        <input
          type="text"
          placeholder="Ask your AI companion..."
        />

        <button>
          ➤
        </button>

      </div>

    </div>
  );
}

export default AICompanion;