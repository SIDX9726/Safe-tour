import React from "react";
import "./Incidents.css";

const incidents = [
  {
    id: "INC-2048",
    title: "Medical Emergency",
    location: "Ward's Lake, Shillong",
    time: "2 min ago",
    status: "Responder Dispatched",
    image:
"https://static.toiimg.com/thumb/101089680/Wards-Lake-in-Shillong.jpg?width=1200&height=900" , },
  {
    id: "INC-2047",
    title: "High Crowd Density",
    location: "Police Bazar, Shillong",
    time: "8 min ago",
    status: "Monitoring",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_kkwgmPUYyrXTvGnoLGLnNgKVbXjjg9Cw0jUiX_nTcHC3Zq4yC2bGTc&s=10",
  },
  {
    id: "INC-2046",
    title: "Tourist Lost",
    location: "Laitumkhrah, Shillong",
    time: "15 min ago",
    status: "Searching",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStJImNlWz2DxYOZG2x3WbLpxHzafSjOGX6L0cJEskfFnG138MBaVmYPv8a&s=10",
  },
  {
    id: "INC-2045",
    title: "Suspicious Activity",
    location: "Shillong Peak",
    time: "25 min ago",
    status: "Under Investigation",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/shillong-peak-shilong2-meghalaya-attr-hero?qlt=82&ts=1742178228979",
  },
  {
    id: "INC-2044",
    title: "Minor Accident",
    location: "Elephant Falls, Shillong",
    time: "32 min ago",
    status: "Resolved",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/elephant-falls-shillong-meghalaya-1-attr-hero?qlt=82&ts=1751460572862",
  },
  {
    id: "INC-2043",
    title: "Tourist Safety Alert",
    location: "Umiam Lake, Shillong",
    time: "45 min ago",
    status: "Resolved",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaaCGENU3jBw2IkZiLGwTbMGk42PIJv-4luFccQL5TrqgPE1cKJ4q0--0&s=10",
  },
];

function Incidents() {
  return (
    <div className="incidents-page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>🚨 Incidents</h1>
          <p>
            Monitor and manage tourist safety incidents across Shillong
          </p>
        </div>

        <button className="report-btn">
          + Report Incident
        </button>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon red">⚠️</div>
          <div>
            <span>Active Incidents</span>
            <h2>06</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">!</div>
          <div>
            <span>High Priority</span>
            <h2>03</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <span>Resolved Today</span>
            <h2>2</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">🚑</div>
          <div>
            <span>Responders Active</span>
            <h2>24</h2>
          </div>
        </div>

      </div>

      {/* FILTER BAR */}
      <div className="toolbar">

        <div>
          <h2>Recent Incidents</h2>
          <p>Latest safety alerts from tourist locations</p>
        </div>

        <div className="filters">

          <select>
            <option>All Incidents</option>
            <option>Medical Emergency</option>
            <option>Tourist Lost</option>
            <option>Accident</option>
            <option>Safety Alert</option>
          </select>

          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Monitoring</option>
            <option>Searching</option>
            <option>Resolved</option>
          </select>

        </div>

      </div>

      {/* CARDS */}
      <div className="incident-grid">

        {incidents.map((incident) => (

          <div className="incident-card" key={incident.id}>

            <div className="image-container">

              <img
                src={incident.image}
                alt={incident.title}
              />


            </div>

            <div className="card-body">

              <div className="title-row">
                <h3>{incident.title}</h3>

                <span className="incident-id">
                  #{incident.id}
                </span>
              </div>

              <p className="location">
                📍 {incident.location}
              </p>

              <p className="time">
                🕒 {incident.time}
              </p>

              <div className="card-footer">

                <span
                  className={`status ${incident.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  ● {incident.status}
                </span>

                <button className="view-btn">
                  View Details →
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Incidents;