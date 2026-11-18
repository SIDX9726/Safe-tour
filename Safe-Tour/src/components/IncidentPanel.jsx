function IncidentPanel() {

  return (
    <div className="incident-panel">

      {/* Header */}

      <div className="incident-heading">

        <div>

          <h3>Active Incidents</h3>

          <p>
            Requires attention
          </p>

        </div>

        <span className="incident-count">
          08
        </span>

      </div>


      {/* Incident 1 */}

      <div className="incident-card high">

        <div className="incident-icon">
          !
        </div>

        <div className="incident-info">

          <h4>Restricted Area Alert</h4>

          <p>
            Remote Zone • 2 min ago
          </p>

          <span className="high-label">
            HIGH PRIORITY
          </span>

        </div>

      </div>


      {/* Incident 2 */}

      <div className="incident-card medium">

        <div className="incident-icon">
          !
        </div>

        <div className="incident-info">

          <h4>Tourist Assistance</h4>

          <p>
            Heritage Area • 8 min ago
          </p>

          <span className="medium-label">
            MEDIUM
          </span>

        </div>

      </div>


      {/* Incident 3 */}

      <div className="incident-card low">

        <div className="incident-icon">
          i
        </div>

        <div className="incident-info">

          <h4>Medical Assistance</h4>

          <p>
            Temple Area • 15 min ago
          </p>

          <span className="low-label">
            LOW
          </span>

        </div>

      </div>


      {/* Button */}

      <button className="view-incidents">
        View All Incidents →
      </button>

    </div>
  );
}

export default IncidentPanel;