import React, { useState } from "react";
import SafetyMap from "../components/SafetyMap";
import "./LiveMap.css";

function LiveMap() {
  const [selectedZone, setSelectedZone] = useState(null);

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

      {/* SELECTED ZONE BANNER (Shows when a user clicks any of the 25 markers) */}
      {selectedZone && (
        <div
          style={{
            background: "white",
            padding: "14px 20px",
            borderRadius: "12px",
            marginBottom: "18px",
            borderLeft: `5px solid ${
              selectedZone.tier === "red"
                ? "#dc2626"
                : selectedZone.tier === "yellow"
                ? "#ca8a04"
                : "#16a34a"
            }`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong style={{ color: "#172033", fontSize: "15px" }}>
              📍 {selectedZone.name} — Safety Score: {selectedZone.score}/100 ({selectedZone.statusLabel})
            </strong>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "13px" }}>
              {selectedZone.description}
            </p>
          </div>
          <button
            onClick={() => setSelectedZone(null)}
            style={{
              background: "#f1f5f9",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              color: "#475569",
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* MAP WITH EXPLICIT HEIGHT */}
      <div
        style={{
          height: "520px",
          width: "100%",
          background: "white",
          padding: "18px",
          borderRadius: "16px",
          border: "1px solid #e6eaf0",
          marginBottom: "24px",
        }}
      >
        <SafetyMap onSelectZone={setSelectedZone} />
      </div>

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
            <strong>25</strong>
            <p>Geofenced Points</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LiveMap;