function SafetyScore({ activeZone }) {
  const zone = activeZone || {
    name: "Ward's Lake",
    score: 92,
    statusLabel: "LOW RISK",
    description: "Current conditions are favorable for tourists in this area.",
    historical: "94%",
    current: "91%"
  };

  const badgeColor = 
    zone.tier === "red" ? "#dc2626" : 
    zone.tier === "yellow" ? "#ca8a04" : "#16a34a";

  return (
    <div className="safety-score">

      <div className="section-title">
        <div>
          <h3>Tourist Safety Score</h3>
          <p>
            AI prediction based on past 5 years data ({zone.name})
          </p>
        </div>

        <span className="score-badge" style={{ background: badgeColor, color: "white", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold" }}>
          {zone.statusLabel}
        </span>
      </div>

      {/* Score */}
      <div className="score-content">
        <div className="score-circle">
          <div>
            <strong style={{ color: badgeColor }}>{zone.score}</strong>
            <span>/100</span>
          </div>
        </div>

        <div className="score-details">
          <h4 style={{ color: badgeColor }}>{zone.statusLabel}</h4>
          <p>
            {zone.description}
          </p>

          <div className="score-row">
            <span>Historical Safety (5 Yr)</span>
            <b>{zone.historical}</b>
          </div>

          <div className="score-row">
            <span>Current Conditions</span>
            <b>{zone.current}</b>
          </div>
        </div>
      </div>

      {/* Data Info */}
      <div className="score-footer">
        <span>📊</span>
        <p>
          Prediction uses the last 5 years of aggregated safety data across Shillong corridors[cite: 8].
        </p>
      </div>

    </div>
  );
}

export default SafetyScore;