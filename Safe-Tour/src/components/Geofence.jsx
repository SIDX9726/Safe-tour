function Geofence({ activeZone }) {
  return (
    <div className="geofence">

      <div className="section-title">
        <div>
          <h3>Geofencing Alerts</h3>
          <p>
            Restricted & remote North-East boundaries
          </p>
        </div>

        <span className="geo-status" style={{ background: "#fee2e2", color: "#dc2626", padding: "4px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: "bold" }}>
          ACTIVE GEOFENCE
        </span>
      </div>

      {/* Area 1: Red */}
      <div className="geo-item">
        <div className="geo-icon red" style={{ background: "#fee2e2", color: "#dc2626" }}>
          !
        </div>
        <div className="geo-info">
          <h4>Shillong Peak Perimeter</h4>
          <p>
            Restricted Zone • Geofence active
          </p>
        </div>
        <span className="geo-alert" style={{ color: "#dc2626", fontWeight: "bold" }}>
          ALERT
        </span>
      </div>

      {/* Area 2: Yellow */}
      <div className="geo-item">
        <div className="geo-icon orange" style={{ background: "#fef3c7", color: "#ca8a04" }}>
          !
        </div>
        <div className="geo-info">
          <h4>Police Bazar Market</h4>
          <p>
            Crowd Advisory • 1.2 km away
          </p>
        </div>
        <span className="geo-warning" style={{ color: "#ca8a04", fontWeight: "bold" }}>
          CAUTION
        </span>
      </div>

      {/* Area 3: Green */}
      <div className="geo-item">
        <div className="geo-icon green" style={{ background: "#dcfce7", color: "#16a34a" }}>
          ✓
        </div>
        <div className="geo-info">
          <h4>Ward's Lake Safe Corridor</h4>
          <p>
            Heritage Zone • Patrol active
          </p>
        </div>
        <span className="geo-safe" style={{ color: "#16a34a", fontWeight: "bold" }}>
          SAFE
        </span>
      </div>

      <button className="geo-button" onClick={() => alert(`Currently inspecting: ${activeZone?.name || "Shillong Zone"}`)}>
        View Geofence Map →
      </button>

    </div>
  );
}

export default Geofence;