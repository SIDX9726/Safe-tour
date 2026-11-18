function SafetyScore() {

  return (
    <div className="safety-score">

      <div className="section-title">

        <div>
          <h3>Tourist Safety Score</h3>

          <p>
            AI prediction based on historical data
          </p>
        </div>

        <span className="score-badge">
          LOW RISK
        </span>

      </div>


      {/* Score */}

      <div className="score-content">

        <div className="score-circle">

          <div>
            <strong>92</strong>

            <span>/100</span>
          </div>

        </div>


        <div className="score-details">

          <h4>Excellent Safety</h4>

          <p>
            Current conditions are favorable
            for tourists in this area.
          </p>

          <div className="score-row">
            <span>Historical Safety</span>
            <b>94%</b>
          </div>

          <div className="score-row">
            <span>Current Conditions</span>
            <b>91%</b>
          </div>

        </div>

      </div>


      {/* Data Info */}

      <div className="score-footer">

        <span>📊</span>

        <p>
          Prediction uses the last 5 years of
          aggregated safety data.
        </p>

      </div>

    </div>
  );
}

export default SafetyScore;