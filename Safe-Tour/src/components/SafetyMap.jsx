import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Create custom colored HTML icon markers so they never disappear
const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-map-marker",
    html: `<div style="background-color: ${color}; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
};

function SafetyMap({ onSelectZone }) {
  const center = [25.5788, 91.8933];

  const zones = [
    {
      id: "z1",
      name: "Ward's Lake & Botanical Garden",
      position: [25.5788, 91.8844],
      score: 92,
      tier: "green",
      statusLabel: "LOW RISK",
      color: "#16a34a",
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
      color: "#ca8a04",
      description: "Crowded market area; exercise caution.",
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
      color: "#dc2626",
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
      color: "#16a34a",
      description: "Secure water sports zone with lifejacket protocols.",
      historical: "86%",
      current: "90%"
    }
  ];

  return (
    <div className="map-section" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="map-header" style={{ marginBottom: "10px" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "16px", color: "#172033" }}>Live Tourist Safety Map (Shillong)</h3>
          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#7b8495" }}>Click markers to inspect 5-year safety scores</p>
        </div>
        <div className="live-status" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#16a34a", fontWeight: "bold" }}>
          <span style={{ width: "8px", height: "8px", background: "#16a34a", borderRadius: "50%", display: "inline-block" }}></span>
          LIVE
        </div>
      </div>

      <div className="map-container" style={{ flex: 1, minHeight: "340px", position: "relative", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {zones.map((zone) => (
            <Marker 
              key={zone.id} 
              position={zone.position}
              icon={createCustomIcon(zone.color)}
              eventHandlers={{
                click: () => onSelectZone(zone),
              }}
            >
              <Popup>
                <div style={{ fontFamily: "Arial" }}>
                  <strong style={{ fontSize: "14px", color: "#172033" }}>{zone.name}</strong>
                  <br />
                  Score: <b style={{ color: zone.color }}>{zone.score}/100</b> ({zone.statusLabel})
                  <br />
                  <span style={{ fontSize: "11px", color: "#666" }}>{zone.description}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="map-legend" style={{ position: "absolute", bottom: "10px", left: "10px", background: "white", padding: "8px 12px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", display: "flex", gap: "12px", zIndex: 1000, fontSize: "11px", fontWeight: "bold" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "10px", height: "10px", background: "#16a34a", borderRadius: "50%" }}></span> Safe (&gt;80)</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "10px", height: "10px", background: "#ca8a04", borderRadius: "50%" }}></span> Caution</div>
          <div style={{ display: "flex", alignItems: "0", gap: "4px" }}><span style={{ width: "10px", height: "10px", background: "#dc2626", borderRadius: "50%" }}></span> Restricted</div>
        </div>
      </div>
    </div>
  );
}

export default SafetyMap;