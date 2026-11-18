import SafetyMap from "../components/SafetyMap";
import "./LiveMap.css";

function LiveMap() {
  return (
    <div className="live-map-page">

      {/* PAGE HEADER */}

      <div className="live-map-title">

        <div>
          <h1>Live Tourist Safety Map</h1>

          <p>
            Real-time monitoring of tourists, incidents and
            restricted areas in Shillong
          </p>
        </div>

        <div className="live-badge">
          <span></span>
          LIVE MONITORING
        </div>

      </div>


      {/* MAP */}

      <SafetyMap />


      {/* INFORMATION CARDS */}

      <div className="map-info-cards">

        <div className="map-info-card">

          <span className="info-icon">👥</span>

          <div>
            <strong>128</strong>
            <p>Active Tourists</p>
          </div>

        </div>


        <div className="map-info-card">

          <span className="info-icon">🚨</span>

          <div>
            <strong>04</strong>
            <p>Active Incidents</p>
          </div>

        </div>


        <div className="map-info-card">

          <span className="info-icon">🛡️</span>

          <div>
            <strong>92%</strong>
            <p>Safe Zones</p>
          </div>

        </div>


        <div className="map-info-card">

          <span className="info-icon">📍</span>

          <div>
            <strong>06</strong>
            <p>Geofenced Areas</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default LiveMap;