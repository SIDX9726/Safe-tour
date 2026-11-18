import React, { useState, useEffect } from "react";
import "./Incidents.css";

const initialIncidents = [
  {
    id: "INC-2048",
    title: "Medical Emergency",
    location: "Ward's Lake, Shillong",
    time: "2 min ago",
    status: "Responder Dispatched",
    severity: "Critical",
    description: "Tourist experienced sudden severe chest pain and breathing difficulty near the wooden bridge.",
    responderTeam: "Alpha Medical Unit (Dr. H. Lyngdoh)",
    image: "https://static.toiimg.com/thumb/101089680/Wards-Lake-in-Shillong.jpg?width=1200&height=900",
  },
  {
    id: "INC-2047",
    title: "High Crowd Density",
    location: "Police Bazar, Shillong",
    time: "8 min ago",
    status: "Monitoring",
    severity: "High",
    description: "Congestion surge near central market junction exceeding safe pedestrian flow thresholds.",
    responderTeam: "Traffic & Crowd Control Squad B",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_kkwgmPUYyrXTvGnoLGLnNgKVbXjjg9Cw0jUiX_nTcHC3Zq4yC2bGTc&s=10",
  },
  {
    id: "INC-2046",
    title: "Tourist Lost",
    location: "Laitumkhrah, Shillong",
    time: "15 min ago",
    status: "Searching",
    severity: "Medium",
    description: "Elderly tourist separated from travel group during evening market walk.",
    responderTeam: "Foot Patrol Unit 4",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStJImNlWz2DxYOZG2x3WbLpxHzafSjOGX6L0cJEskfFnG138MBaVmYPv8a&s=10",
  },
  {
    id: "INC-2045",
    title: "Suspicious Activity",
    location: "Shillong Peak",
    time: "25 min ago",
    status: "Under Investigation",
    severity: "Medium",
    description: "Unidentified restricted zone breach reported near viewpoint perimeter.",
    responderTeam: "Tourist Security Delta",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/shillong-peak-shilong2-meghalaya-attr-hero?qlt=82&ts=1742178228979",
  },
  {
    id: "INC-2044",
    title: "Minor Accident",
    location: "Elephant Falls, Shillong",
    time: "32 min ago",
    status: "Resolved",
    severity: "Low",
    description: "Slip on wet stone stairs resulting in minor scrapes. First aid administered on site.",
    responderTeam: "Emergency Rescue Team 1",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/elephant-falls-shillong-meghalaya-1-attr-hero?qlt=82&ts=1751460572862",
  },
  {
    id: "INC-2043",
    title: "Tourist Safety Alert",
    location: "Umiam Lake, Shillong",
    time: "45 min ago",
    status: "Resolved",
    severity: "Low",
    description: "Boating zone advisory issued due to gusty winds; all watercraft safely recalled to dock.",
    responderTeam: "Lake Patrol Unit",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaaCGENU3jBw2IkZiLGwTbMGk42PIJv-4luFccQL5TrqgPE1cKJ4q0--0&s=10",
  },
];

function Incidents() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [selectedCategory, setSelectedCategory] = useState("All Incidents");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  
  // Modal states
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // New Incident Form state
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newSeverity, setNewSeverity] = useState("High");
  const [newDesc, setNewDesc] = useState("");

  // Live Stats Ticker (Every 10 seconds)
  const [stats, setStats] = useState({
    active: 6,
    highPriority: 3,
    resolvedToday: 2,
    respondersActive: 24,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats((prev) => {
        const randomFluctuation = Math.random() > 0.5 ? 1 : -1;
        const newActive = Math.max(4, Math.min(10, prev.active + (Math.random() > 0.7 ? randomFluctuation : 0)));
        const newResponders = Math.max(20, Math.min(30, prev.respondersActive + randomFluctuation));
        return {
          ...prev,
          active: newActive,
          respondersActive: newResponders,
          resolvedToday: prev.resolvedToday + (Math.random() > 0.8 ? 1 : 0),
        };
      });
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // Handle status cycling on click
  const handleToggleStatus = (id, e) => {
    e.stopPropagation();
    setIncidents(prev =>
      prev.map(inc => {
        if (inc.id === id) {
          let nextStatus = "Monitoring";
          if (inc.status === "Monitoring") nextStatus = "Responder Dispatched";
          else if (inc.status === "Responder Dispatched") nextStatus = "Searching";
          else if (inc.status === "Searching") nextStatus = "Under Investigation";
          else if (inc.status === "Under Investigation") nextStatus = "Resolved";
          else nextStatus = "Monitoring";
          return { ...inc, status: nextStatus };
        }
        return inc;
      })
    );
  };

  // Handle Report Incident Submit
  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newLocation) return;

    const newInc = {
      id: `INC-${Math.floor(2050 + Math.random() * 100)}`,
      title: newTitle,
      location: newLocation,
      time: "Just now",
      status: "Responder Dispatched",
      severity: newSeverity,
      description: newDesc || "User reported safety concern via dispatch panel.",
      responderTeam: "Rapid Response Unit Alpha",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    };

    setIncidents([newInc, ...incidents]);
    setStats(prev => ({ ...prev, active: prev.active + 1 }));
    setIsReportOpen(false);
    setNewTitle("");
    setNewLocation("");
    setNewDesc("");
  };

  // Filter logic
  const filteredIncidents = incidents.filter(inc => {
    const matchesCategory = selectedCategory === "All Incidents" || inc.title === selectedCategory;
    const matchesStatus = selectedStatus === "All Status" || inc.status.toLowerCase().includes(selectedStatus.toLowerCase());
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="incidents-page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>🚨 Live Incident Command</h1>
          <p>Real-time tourist safety monitoring & responder dispatch across Shillong</p>
        </div>

        <button className="report-btn" onClick={() => setIsReportOpen(true)}>
          + Report Incident
        </button>
      </div>

      {/* STATS (Updates every 10s) */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon red">⚠️</div>
          <div>
            <span>Active Incidents (Live)</span>
            <h2>0{stats.active}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">!</div>
          <div>
            <span>High Priority</span>
            <h2>0{stats.highPriority}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <span>Resolved Today</span>
            <h2>{stats.resolvedToday}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">🚑</div>
          <div>
            <span>Responders Active</span>
            <h2>{stats.respondersActive}</h2>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="toolbar">
        <div>
          <h2>Recent Incidents Feed</h2>
          <p>Showing live updates synchronized with ground units</p>
        </div>

        <div className="filters">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option>All Incidents</option>
            <option>Medical Emergency</option>
            <option>High Crowd Density</option>
            <option>Tourist Lost</option>
            <option>Suspicious Activity</option>
            <option>Minor Accident</option>
            <option>Tourist Safety Alert</option>
          </select>

          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option>All Status</option>
            <option>Monitoring</option>
            <option>Responder Dispatched</option>
            <option>Searching</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="incident-grid">
        {filteredIncidents.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#8992a3", padding: "40px" }}>
            No matching incidents found for selected filters.
          </p>
        ) : (
          filteredIncidents.map((incident) => (
            <div className="incident-card" key={incident.id} onClick={() => setSelectedIncident(incident)} style={{ cursor: "pointer" }}>
              <div className="image-container">
                <img src={incident.image} alt={incident.title} />
                <span className={`severity ${incident.severity.toLowerCase()}`}>
                  {incident.severity}
                </span>
              </div>

              <div className="card-body">
                <div className="title-row">
                  <h3>{incident.title}</h3>
                  <span className="incident-id">#{incident.id}</span>
                </div>

                <p className="location">📍 {incident.location}</p>
                <p className="time">🕒 {incident.time}</p>

                <div className="card-footer">
                  <span
                    className={`status ${incident.status.toLowerCase().replaceAll(" ", "-")}`}
                    title="Click to cycle status"
                    onClick={(e) => handleToggleStatus(incident.id, e)}
                    style={{ cursor: "pointer", padding: "4px 8px", background: "#f1f5f9", borderRadius: "6px" }}
                  >
                    ● {incident.status} (Click)
                  </span>

                  <button className="view-btn" onClick={() => setSelectedIncident(incident)}>
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedIncident && (
        <div style={modalOverlayStyle} onClick={() => setSelectedIncident(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h2 style={{ margin: 0, color: "#172033" }}>{selectedIncident.title} (#{selectedIncident.id})</h2>
              <button onClick={() => setSelectedIncident(null)} style={closeBtnStyle}>✕</button>
            </div>
            <img src={selectedIncident.image} alt="" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "15px" }} />
            <p><strong>📍 Location:</strong> {selectedIncident.location}</p>
            <p><strong>🕒 Timestamp:</strong> {selectedIncident.time}</p>
            <p><strong>⚡ Status:</strong> {selectedIncident.status}</p>
            <p><strong>🚨 Severity:</strong> {selectedIncident.severity}</p>
            <p><strong>📝 Description:</strong> {selectedIncident.description}</p>
            <p><strong>🚑 Assigned Responder:</strong> {selectedIncident.responderTeam}</p>
            
            <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button 
                style={{ background: "#2563eb", color: "white", border: "none", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
                onClick={() => {
                  alert(`Dispatch command broadcasted for ${selectedIncident.id}! Unit notified.`);
                  setSelectedIncident(null);
                }}
              >
                Dispatch Backup Unit
              </button>
              <button 
                style={{ background: "#e53935", color: "white", border: "none", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
                onClick={() => {
                  setIncidents(incidents.map(i => i.id === selectedIncident.id ? {...i, status: "Resolved"} : i));
                  setSelectedIncident(null);
                }}
              >
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT INCIDENT MODAL */}
      {isReportOpen && (
        <div style={modalOverlayStyle} onClick={() => setIsReportOpen(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h2 style={{ margin: 0, color: "#172033" }}>Report New Tourist Incident</h2>
              <button onClick={() => setIsReportOpen(false)} style={closeBtnStyle}>✕</button>
            </div>
            
            <form onSubmit={handleReportSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4b5563" }}>
                Incident Type / Title:
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="e.g. Medical Emergency, Lost Tourist" 
                  required
                  style={inputStyle}
                />
              </label>

              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4b5563" }}>
                Location in Shillong:
                <input 
                  type="text" 
                  value={newLocation} 
                  onChange={(e) => setNewLocation(e.target.value)} 
                  placeholder="e.g. Police Bazar, Umiam Lake" 
                  required
                  style={inputStyle}
                />
              </label>

              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4b5563" }}>
                Severity Level:
                <select value={newSeverity} onChange={(e) => setNewSeverity(e.target.value)} style={inputStyle}>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </label>

              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4b5563" }}>
                Incident Description:
                <textarea 
                  value={newDesc} 
                  onChange={(e) => setNewDesc(e.target.value)} 
                  placeholder="Provide brief details..." 
                  rows="3"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </label>

              <button type="submit" className="report-btn" style={{ marginTop: "10px", width: "100%" }}>
                Submit & Dispatch Unit
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Modal Styling helper objects
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "20px"
};

const modalContentStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  width: "100%",
  maxWidth: "500px",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  maxHeight: "90vh",
  overflowY: "auto"
};

const closeBtnStyle = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  color: "#6b7280"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  border: "1px solid #dce1e8",
  borderRadius: "8px",
  outline: "none",
  fontSize: "14px"
};

export default Incidents;