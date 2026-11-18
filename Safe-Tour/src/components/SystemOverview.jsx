function SystemOverview() {
  return (
    <div className="system-overview">

      <h3>System Overview</h3>


      <div className="overview-list">

        {/* Response Time */}

        <div className="overview-item">

          <div className="overview-icon blue">
            ◷
          </div>

          <div className="overview-info">

            <span>Response Time (Avg)</span>

            <strong>
              3.2 <small>min</small>
            </strong>

          </div>

          <div className="overview-change green-text">
            ↑ 15%
          </div>

        </div>


        {/* Incidents Resolved */}

        <div className="overview-item">

          <div className="overview-icon blue">
            ✓
          </div>

          <div className="overview-info">

            <span>Incidents Resolved</span>

            <strong>
              125
            </strong>

          </div>

          <div className="overview-change green-text">
            ↑ 18%
          </div>

        </div>


        {/* Safety Score */}

        <div className="overview-item">

          <div className="overview-icon orange">
            🛡
          </div>

          <div className="overview-info">

            <span>Safety Score</span>

            <strong>
              92%
            </strong>

          </div>

          <div className="overview-change green-text">
            ↑ 8%
          </div>

        </div>


        {/* Network */}

        <div className="overview-item">

          <div className="overview-icon green">
            ◉
          </div>

          <div className="overview-info">

            <span>Network Status</span>

            <strong className="excellent">
              Excellent
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SystemOverview;