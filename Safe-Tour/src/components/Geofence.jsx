function Geofence() {

  return (
    <div className="geofence">

      <div className="section-title">

        <div>

          <h3>Geofencing Alerts</h3>

          <p>
            Restricted & remote areas
          </p>

        </div>

        <span className="geo-status">
          ACTIVE
        </span>

      </div>


      {/* Area 1 */}

      <div className="geo-item">

        <div className="geo-icon red">
          !
        </div>

        <div className="geo-info">

          <h4>Restricted Zone</h4>

          <p>
            Mountain Trail • 1.2 km away
          </p>

        </div>

        <span className="geo-alert">
          ALERT
        </span>

      </div>


      {/* Area 2 */}

      <div className="geo-item">

        <div className="geo-icon orange">
          !
        </div>

        <div className="geo-info">

          <h4>Remote Area</h4>

          <p>
            Forest Route • 2.8 km away
          </p>

        </div>

        <span className="geo-warning">
          CAUTION
        </span>

      </div>


      {/* Area 3 */}

      <div className="geo-item">

        <div className="geo-icon green">
          ✓
        </div>

        <div className="geo-info">

          <h4>Safe Zone</h4>

          <p>
            Heritage Center • 0.5 km away
          </p>

        </div>

        <span className="geo-safe">
          SAFE
        </span>

      </div>


      <button className="geo-button">
        View Geofence Map →
      </button>

    </div>
  );
}

export default Geofence;