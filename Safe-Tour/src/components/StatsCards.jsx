function StatsCards() {
  return (
    <div className="stats-container">

      {/* Active Tourists */}

      <div className="stat-card">

        <div className="stat-top">

          <div className="stat-icon blue">
            👥
          </div>

          <span className="stat-label">
            Active Tourists
          </span>

        </div>

        <h2>1,248</h2>

        <p className="stat-success">
          ↑ 12% from yesterday
        </p>

      </div>


      {/* Active Incidents */}

      <div className="stat-card">

        <div className="stat-top">

          <div className="stat-icon red">
            ⚠
          </div>

          <span className="stat-label">
            Active Incidents
          </span>

        </div>

        <h2>08</h2>

        <p className="stat-danger">
          ↑ 3 new today
        </p>

      </div>


      {/* Responders Online */}

      <div className="stat-card">

        <div className="stat-top">

          <div className="stat-icon green">
            🚑
          </div>

          <span className="stat-label">
            Responders Online
          </span>

        </div>

        <h2>24</h2>

        <p className="stat-success">
          ● All systems active
        </p>

      </div>


      {/* Safe Zones */}

      <div className="stat-card">

        <div className="stat-top">

          <div className="stat-icon purple">
            🛡️
          </div>

          <span className="stat-label">
            Safe Zones
          </span>

        </div>

        <h2>16</h2>

        <p className="stat-success">
          ● All safe
        </p>

      </div>

    </div>
  );
}

export default StatsCards;