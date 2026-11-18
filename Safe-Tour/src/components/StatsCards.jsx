import React, { useState, useEffect } from "react";

function StatsCards() {
  const [stats, setStats] = useState({
    tourists: 1248,
    incidents: 8,
    responders: 24,
    safeZones: 16
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        tourists: prev.tourists + Math.floor(Math.random() * 7) - 3,
        incidents: Math.max(5, prev.incidents + (Math.random() > 0.6 ? 1 : -1)),
        responders: Math.min(30, Math.max(20, prev.responders + (Math.random() > 0.5 ? 1 : -1))),
        safeZones: 16
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "30px" }}>
      
      <div style={cardStyle}>
        <div style={{ background: "#dbeafe", color: "#2563eb", width: "42px", height: "42px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>👥</div>
        <div>
          <span style={{ color: "#7b8495", fontSize: "12px" }}>Active Tourists (Live)</span>
          <h2 style={{ margin: "4px 0 0", fontSize: "22px", color: "#172033" }}>{stats.tourists.toLocaleString()}</h2>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ background: "#fee2e2", color: "#dc2626", width: "42px", height: "42px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>⚠️</div>
        <div>
          <span style={{ color: "#7b8495", fontSize: "12px" }}>Active Incidents</span>
          <h2 style={{ margin: "4px 0 0", fontSize: "22px", color: "#172033" }}>0{stats.incidents}</h2>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ background: "#dcfce7", color: "#16a34a", width: "42px", height: "42px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🚑</div>
        <div>
          <span style={{ color: "#7b8495", fontSize: "12px" }}>Responders Online</span>
          <h2 style={{ margin: "4px 0 0", fontSize: "22px", color: "#172033" }}>{stats.responders}</h2>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ background: "#e0e7ff", color: "#3730a3", width: "42px", height: "42px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🛡️</div>
        <div>
          <span style={{ color: "#7b8495", fontSize: "12px" }}>Safe Zones</span>
          <h2 style={{ margin: "4px 0 0", fontSize: "22px", color: "#172033" }}>{stats.safeZones} Active</h2>
        </div>
      </div>

    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "18px",
  borderRadius: "14px",
  border: "1px solid #e6eaf0",
  display: "flex",
  alignItems: "center",
  gap: "14px"
};

export default StatsCards;