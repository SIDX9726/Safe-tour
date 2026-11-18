import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function SafetyMap({ onSelectZone }) {
  // Shillong, Meghalaya center coordinates
  const center = [25.5788, 91.8933];

  const zones = [
    {
      id: "z1",
      name: "Ward's Lake & Botanical Garden",
      position: [25.5788, 91.8844],
      score: 92,
      tier: "green",
      statusLabel: "LOW RISK",
      description: "Excellent safety corridor with high patrol density.",
      historical: "94%",
      current: "91%"
    },
    {
      id: "z2",
      name: "Police Bazar Central Market",
      position: [25.5721, 91.8831],
      score: 72,
      tier: "yellow",
      statusLabel: "MODERATE CAUTION",
      description: "Crowded market area; exercise caution with personal belongings.",
      historical: "70%",
      current: "74%"
    },
    {
      id: "z3",
      name: "Shillong Peak Restricted Zone",
      position: [25.5398, 91.8752],
      score: 48,
      tier: "red",
      statusLabel: "HIGH RISK",
      description: "Steep terrain and restricted perimeter. Geofence active.",
      historical: "45%",
      current: "51%"
    },
    {
      id: "z4",
      name: "Umiam Lake Waterfront",
      position: [25.6603, 91.8973],
      score: 88,
      tier: "green",
      statusLabel: "SAFE ZONE",
      description: "Secure water sports zone with lifejacket compliance protocols.",
      historical: "86%",
      current: "90%"
    }
  ];

  return (
    <div className="map-section">

      {/* MAP HEADER */}
      <div className="map-header">
        <div>
          <h3>Live Tourist Safety Map (North-East)</h3>
          <p>
            Real-time color-coded zones & geofenced boundaries
          </p>
        </div>

        <div className="live-status">
          <span></span>
          LIVE
        </div>
      </div>

      {/* MAP */}
      <div className="map-container">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{
            height: "100%",
            width: "100%"
          }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {zones.map((zone) => (
            <Marker 
              key={zone.id} 
              position={zone.position}
              eventHandlers={{
                click: () => onSelectZone(zone),
              }}
            >
              <Popup>
                <strong>{zone.name}</strong>
                <br />
                Safety Score: <b>{zone.score}/100</b> ({zone.statusLabel})
                <br />
                <span style={{ fontSize: "11px", color: "#666" }}>Click pin to inspect zone metrics</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* MAP LEGEND */}
        <div className="map-legend">
          <div>
            <span className="legend-dot safe" style={{ background: "#16a34a" }}></span>
            Green (Safe &gt;80)
          </div>
          <div>
            <span className="legend-dot tourist" style={{ background: "#ca8a04" }}></span>
            Yellow (Caution 60-79)
          </div>
          <div>
            <span className="legend-dot incident" style={{ background: "#dc2626" }}></span>
            Red (Restricted &lt;60)
          </div>
        </div>

      </div>

    </div>
  );
}

export default SafetyMap;