import React, { useState } from "react";
import AICompanion from "./AICompanion";
import Geofence from "./Geofence";
import IncidentPanel from "./IncidentPanel";
import QuickActions from "./QuickAction";
import SafetyMap from "./SafetyMap";
import SafetyScore from "./SafetyScore";
import StatsCards from "./StatsCards";
import SystemOverview from "./SystemOverview";

function Dashboard() {
  // Shared state for regional safety scores, color tiers, and geofence alerts
  const [selectedZone, setSelectedZone] = useState({
    name: "Shillong Peak Restricted Perimeter",
    score: 42,
    tier: "red", // red, yellow, green
    message: "Restricted boundary: Geofence active. Past 5-year data indicates high hazard risk."
  });

  const [geofenceAlerts, setGeofenceAlerts] = useState([
    { id: 1, zone: "Shillong Peak", status: "Breach Warning", color: "#dc2626" },
    { id: 2, zone: "Police Bazar", status: "Moderate Crowd Caution", color: "#ca8a04" }
  ]);

  return (
    <div className="dashboard">

      {/* ================= DASHBOARD TITLE ================= */}
      <div className="dashboard-heading">
        <div>
          <h1>Dashboard</h1>
          <p>
            Smart Tourist Safety Monitoring & Incident Response System
          </p>
        </div>

        {/* DATE */}
        <div className="dashboard-date">
          <span className="calendar-icon">
            ▣
          </span>
          <span>
            22 May 2025, 10:30 AM
          </span>
        </div>
      </div>

      <StatsCards />

      {/* ================= GEOFENCE & SAFETY ALERTS BAR ================= */}
      <div className="geofence-alert-banner" style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "12px 20px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "20px" }}>🛡️</span>
          <div>
            <h4 style={{ margin: 0, color: "#991b1b", fontSize: "14px" }}>Geofencing & Safety Status Active</h4>
            <p style={{ margin: "2px 0 0", color: "#b91c1c", fontSize: "12px" }}>
              Monitoring 16 regional zones using 5-year historical safety prediction models. Selected zone: <strong>{selectedZone.name}</strong> ({selectedZone.score}/100)
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {geofenceAlerts.map(alert => (
            <span key={alert.id} style={{ background: alert.color, color: "white", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold" }}>
              ● {alert.zone}: {alert.status}
            </span>
          ))}
        </div>
      </div>

      {/* MAP + INCIDENTS */}
      <div className="map-row">
        {/* Pass down zone selector handler so SafetyMap can trigger different scores & color badges */}
        <SafetyMap onSelectZone={setSelectedZone} />
        <IncidentPanel />
      </div>

      {/* AI + SAFETY + GEOFENCING */}
      <div className="smart-row">
        <AICompanion />
        <div className="smart-right">
          {/* Pass active zone metrics into SafetyScore and Geofence */}
          <SafetyScore currentZone={selectedZone} />
          <Geofence currentAlerts={geofenceAlerts} />
        </div>
      </div>

      <QuickActions />
      <SystemOverview />

    </div>
  );
}

export default Dashboard;