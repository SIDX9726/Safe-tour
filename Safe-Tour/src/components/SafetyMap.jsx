import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-map-marker",
    html: `<div style="background-color: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
};

function SafetyMap({ onSelectZone }) {
  const center = [25.5788, 91.8933];

  // 25 Detailed Shillong & North-East Safety Points with Green, Yellow, Red Tiers
  const zones = [
    { id: 1, name: "Ward's Lake & Botanical Garden", position: [25.5788, 91.8844], score: 94, color: "#16a34a", tier: "Safe" },
    { id: 2, name: "Police Bazar Central Market", position: [25.5721, 91.8831], score: 72, color: "#ca8a04", tier: "Caution" },
    { id: 3, name: "Shillong Peak Restricted Cliff", position: [25.5398, 91.8752], score: 45, color: "#dc2626", tier: "Restricted" },
    { id: 4, name: "Umiam Lake Water Sports Hub", position: [25.6603, 91.8973], score: 88, color: "#16a34a", tier: "Safe" },
    { id: 5, name: "Laitumkhrah Market Junction", position: [25.5750, 91.8960], score: 80, color: "#16a34a", tier: "Safe" },
    { id: 6, name: "Don Bosco Museum Viewpoint", position: [25.5640, 91.9120], score: 91, color: "#16a34a", tier: "Safe" },
    { id: 7, name: "Elephant Falls Tourist Plaza", position: [25.5260, 91.8580], score: 76, color: "#ca8a04", tier: "Caution" },
    { id: 8, name: "Golf Links Heritage Ground", position: [25.5890, 91.9050], score: 95, color: "#16a34a", tier: "Safe" },
    { id: 9, name: "Mawphlang Sacred Grove Trail", position: [25.4500, 91.7500], score: 68, color: "#ca8a04", tier: "Caution" },
    { id: 10, name: "Bara Bazaar Commercial Hub", position: [25.5810, 91.8760], score: 62, color: "#ca8a04", tier: "Caution" },
    { id: 11, name: "Nongthymmai Residential Zone", position: [25.5680, 91.9020], score: 89, color: "#16a34a", tier: "Safe" },
    { id: 12, name: "Pynthorumkhrah Checkpoint", position: [25.6100, 91.9000], score: 74, color: "#ca8a04", tier: "Caution" },
    { id: 13, name: "Happy Valley Cantonment", position: [25.5450, 91.9300], score: 96, color: "#16a34a", tier: "Safe" },
    { id: 14, name: "Jawaharlal Nehru Stadium", position: [25.5700, 91.8900], score: 85, color: "#16a34a", tier: "Safe" },
    { id: 15, name: "NEHU Campus Perimeter", position: [25.6130, 91.9700], score: 90, color: "#16a34a", tier: "Safe" },
    { id: 16, name: "Upper Shillong Forest Edge", position: [25.5300, 91.8650], score: 52, color: "#dc2626", tier: "Restricted" },
    { id: 17, name: "Mawkasiang High Ground", position: [25.6200, 91.9500], score: 83, color: "#16a34a", tier: "Safe" },
    { id: 18, name: "Demthring Police Post Area", position: [25.5610, 91.9090], score: 79, color: "#ca8a04", tier: "Caution" },
    { id: 19, name: "Rynjah Commercial Street", position: [25.5650, 91.9210], score: 82, color: "#16a34a", tier: "Safe" },
    { id: 20, name: "Qualapatty Cultural Zone", position: [25.5760, 91.8890], score: 87, color: "#16a34a", tier: "Safe" },
    { id: 21, name: "Mawlai Bus Terminal", position: [25.6020, 91.8880], score: 65, color: "#ca8a04", tier: "Caution" },
    { id: 22, name: "Patphatian Deep Ravine", position: [25.5150, 91.8450], score: 38, color: "#dc2626", tier: "Restricted" },
    { id: 23, name: "Cherrapunji Gorge Outskirt", position: [25.2850, 91.7100], score: 58, color: "#dc2626", tier: "Restricted" },
    { id: 24, name: "Dawki River Border Checkpoint", position: [25.1800, 92.0100], score: 71, color: "#ca8a04", tier: "Caution" },
    { id: 25, name: "Tawang Ridge Basecamp", position: [27.5850, 91.8650], score: 49, color: "#dc2626", tier: "Restricted" },
  ];

  return (
    <div className="map-section" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="map-header" style={{ marginBottom: "10px" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "16px", color: "#172033" }}>Live Tourist Safety Map — 25 Regional Zones (North-East)</h3>
          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#7b8495" }}>Click any marker to inspect its 5-year predictive safety score</p>
        </div>
        <div className="live-status" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#16a34a", fontWeight: "bold" }}>
          <span style={{ width: "8px", height: "8px", background: "#16a34a", borderRadius: "50%", display: "inline-block" }}></span>
          LIVE 25 POINTS
        </div>
      </div>

      <div className="map-container" style={{ flex: 1, minHeight: "360px", position: "relative", borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
        <MapContainer
          center={center}
          zoom={11}
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
                click: () => onSelectZone({
                  name: zone.name,
                  score: zone.score,
                  tier: zone.tier.toLowerCase(),
                  statusLabel: zone.tier.toUpperCase(),
                  description: `Monitored sector in North-East. 5-year historical rating: ${zone.score}/100.`,
                  historical: `${zone.score + 2}%`,
                  current: `${zone.score - 1}%`
                }),
              }}
            >
              <Popup>
                <div style={{ fontFamily: "Arial" }}>
                  <strong style={{ fontSize: "13px", color: "#172033" }}>{zone.name}</strong>
                  <br />
                  Safety Score: <b style={{ color: zone.color }}>{zone.score}/100</b> ({zone.tier})
                  <br />
                  <span style={{ fontSize: "11px", color: "#666" }}>Click marker to sync dashboard analytics</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="map-legend" style={{ position: "absolute", bottom: "10px", left: "10px", background: "white", padding: "8px 12px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", display: "flex", gap: "12px", zIndex: 1000, fontSize: "11px", fontWeight: "bold" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "10px", height: "10px", background: "#16a34a", borderRadius: "50%" }}></span> Safe (&gt;80)</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "10px", height: "10px", background: "#ca8a04", borderRadius: "50%" }}></span> Caution (60-79)</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "10px", height: "10px", background: "#dc2626", borderRadius: "50%" }}></span> Restricted (&lt;60)</div>
        </div>
      </div>
    </div>
  );
}

export default SafetyMap;