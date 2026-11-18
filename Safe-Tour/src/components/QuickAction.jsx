function QuickActions() {
  return (
    <div className="quick-actions">

      <h3>Quick Actions</h3>

      <div className="quick-action-list">

        {/* Report Incident */}
        <div className="action-card">

          <div className="action-icon red">
            ⚠
          </div>

          <div>
            <h4>Report Incident</h4>

            <p>Report any emergency</p>
          </div>

        </div>


        {/* Share Location */}
        <div className="action-card">

          <div className="action-icon blue">
            📍
          </div>

          <div>
            <h4>Share Location</h4>

            <p>Share live location</p>
          </div>

        </div>


        {/* Find Hospitals */}
        <div className="action-card">

          <div className="action-icon green">
            🏥
          </div>

          <div>
            <h4>Find Hospitals</h4>

            <p>Nearby medical help</p>
          </div>

        </div>


        {/* Emergency Contacts */}
        <div className="action-card">

          <div className="action-icon purple">
            ☎
          </div>

          <div>
            <h4>Emergency Contacts</h4>

            <p>Call for immediate help</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default QuickActions;