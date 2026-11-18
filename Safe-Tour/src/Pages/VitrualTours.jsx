import React, { useState } from "react";

const northEastTours = [
  {
    id: "VT-01",
    title: "Umiam Lake Panoramic View",
    state: "Meghalaya",
    location: "Barapani, Shillong Outskirts",
    description: "Immersive 360 view of the vast reservoir surrounded by pine-covered hills. Known for water sports and tourist safety checkpoints.",
    safetyStatus: "🟢 Safe & Monitored",
    embedUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=1",
    previewImage: "https://s7ap1.scene7.com/is/image/incredibleindia/umiam-lake-shillong-meghalaya-1-hero?$1920X700$",
  },
  {
    id: "VT-02",
    title: "Tawang Monastery Grounds",
    state: "Arunachal Pradesh",
    location: "Tawang Valley (10,000 ft)",
    description: "Explore India's largest Buddhist monastery nestled in the Himalayas. Virtual tour covers the grand prayer hall and mountain ridge views.",
    safetyStatus: "🟢 Weather Clear",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1",
    previewImage: "https://s7ap1.scene7.com/is/image/incredibleindia/tawang-monastery-arunachal-pradesh-attr-hero?$1920X700$",
  },
  {
    id: "VT-03",
    title: "Double Decker Living Root Bridge",
    state: "Meghalaya",
    location: "Nongriat Village, Cherrapunji",
    description: "Witness the engineering marvel of bio-engineered bridges grown from rubber tree roots across crystal-clear forest streams.",
    safetyStatus: "🟡 Trekking Advisory Active",
    embedUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=1",
    previewImage: "https://s7ap1.scene7.com/is/image/incredibleindia/living-root-bridge-meghalaya-attr-hero?$1920X700$",
  },
  {
    id: "VT-04",
    title: "Kaziranga National Park Wetland",
    state: "Assam",
    location: "Kohora Range, Golaghat",
    description: "Virtual safari view of World Heritage wildlife sanctuary, home to the endangered one-horned rhinoceros and lush grasslands.",
    safetyStatus: "🟢 Ranger Escort Active",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1",
    previewImage: "https://s7ap1.scene7.com/is/image/incredibleindia/kaziranga-national-park-assam-attr-hero?$1920X700$",
  }
];

function VirtualTours() {
  const [activeModalTour, setActiveModalTour] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);

  const handleAudioGuide = (tourTitle) => {
    setPlayingAudio(tourTitle);
    alert(`🎧 Audio Guide Started: Playing immersive narration and safety tips for "${tourTitle}".`);
  };

  return (
    <div style={pageStyle}>
      {/* HEADER */}
      <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: "30px", color: "#172033" }}>🌐 360° Virtual Tours — North-East India</h1>
        <p style={{ marginTop: "6px", color: "#7b8495", fontSize: "14px" }}>
          Explore breathtaking destinations, tourist landmarks, and safety zones across the Seven Sister States in immersive 360°
        </p>
      </div>

      {/* TOURS GRID */}
      <div style={gridStyle}>
        {northEastTours.map((tour) => (
          <div key={tour.id} style={cardStyle}>
            <div style={viewerContainerStyle}>
              <img 
                src={tour.previewImage} 
                alt={tour.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
              <span style={badgeStyle}>{tour.safetyStatus}</span>
            </div>

            <div style={bodyStyle}>
              <div style={titleRowStyle}>
                <h3 style={{ margin: 0, fontSize: "18px", color: "#172033" }}>{tour.title}</h3>
                <span style={stateStyle}>{tour.state}</span>
              </div>

              <p style={{ fontSize: "13px", color: "#697386", margin: "0 0 12px 0" }}>📍 {tour.location}</p>
              <p style={{ fontSize: "13.5px", color: "#4b5563", lineHeight: "1.5", marginBottom: "20px", flexGrow: 1 }}>
                {tour.description}
              </p>

              <div style={footerStyle}>
                <button 
                  style={audioBtnStyle} 
                  onClick={() => handleAudioGuide(tour.title)}
                >
                  🎧 {playingAudio === tour.title ? "Playing..." : "Play Audio Guide"}
                </button>

                <button 
                  style={tourBtnStyle}
                  onClick={() => setActiveModalTour(tour)}
                >
                  Launch 360° View ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* IMMERSIVE 360 MODAL */}
      {activeModalTour && (
        <div style={modalOverlayStyle} onClick={() => setActiveModalTour(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h2 style={{ margin: 0, color: "#172033" }}>{activeModalTour.title} ({activeModalTour.state})</h2>
              <button onClick={() => setActiveModalTour(null)} style={closeBtnStyle}>✕</button>
            </div>

            <div style={{ width: "100%", height: "380px", background: "#000", borderRadius: "10px", overflow: "hidden" }}>
              <iframe 
                src={activeModalTour.embedUrl} 
                title={activeModalTour.title}
                style={{ width: "100%", height: "100%", border: "none" }}
                allowFullScreen
              />
            </div>

            <p style={{ marginTop: "15px", color: "#4b5563", fontSize: "14px" }}>
              <strong>📍 Location details:</strong> {activeModalTour.location} — Connected with local SafeTour dispatch and emergency guides. Drag or use mouse inside player to pan around 360 degrees.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
              <button 
                style={{ background: "#2563eb", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
                onClick={() => setActiveModalTour(null)}
              >
                Close 360° Explorer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline Styles
const pageStyle = {
  padding: "30px",
  background: "#f6f8fb",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif"
};

const headerStyle = {
  marginBottom: "25px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
  gap: "25px"
};

const cardStyle = {
  background: "white",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #e6eaf0",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
};

const viewerContainerStyle = {
  height: "220px",
  position: "relative",
  background: "#000"
};

const badgeStyle = {
  position: "absolute",
  top: "12px",
  right: "12px",
  background: "rgba(22, 163, 74, 0.9)",
  color: "white",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "11px",
  fontWeight: "bold"
};

const bodyStyle = {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1
};

const titleRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px"
};

const stateStyle = {
  fontSize: "12px",
  background: "#e0e7ff",
  color: "#3730a3",
  padding: "4px 8px",
  borderRadius: "6px",
  fontWeight: "600"
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid #edf0f4",
  paddingTop: "15px"
};

const audioBtnStyle = {
  background: "#f1f5f9",
  border: "1px solid #cbd5e1",
  color: "#334155",
  padding: "8px 14px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer"
};

const tourBtnStyle = {
  background: "#2563eb",
  border: "none",
  color: "white",
  padding: "9px 18px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer"
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "20px"
};

const modalContentStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "750px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  maxHeight: "95vh",
  overflowY: "auto"
};

const closeBtnStyle = {
  background: "none",
  border: "none",
  fontSize: "22px",
  cursor: "pointer",
  color: "#6b7280"
};

export default VirtualTours;