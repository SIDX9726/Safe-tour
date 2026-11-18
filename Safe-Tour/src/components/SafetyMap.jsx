import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function SafetyMap() {

  const center = [25.5788, 91.8933];

  return (
    <div className="map-section">

      {/* MAP HEADER */}

      <div className="map-header">

        <div>
          <h3>Live Tourist Safety Map</h3>

          <p>
            Real-time tourist and incident monitoring
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


          {/* Tourist */}

          <Marker position={[31.6345, 74.8720]}>

            <Popup>
              <strong>Tourist</strong>
              <br />
              Safety Status: Safe
            </Popup>

          </Marker>


          {/* Tourist */}

          <Marker position={[31.6370, 74.8750]}>

            <Popup>
              <strong>Tourist Group</strong>
              <br />
              Safety Status: Safe
            </Popup>

          </Marker>


          {/* Incident */}

          <Marker position={[31.6310, 74.8680]}>

            <Popup>
              <strong>Incident Alert</strong>
              <br />
              Priority: High
            </Popup>

          </Marker>

        </MapContainer>


        {/* MAP LEGEND */}

        <div className="map-legend">

          <div>
            <span className="legend-dot safe"></span>
            Safe
          </div>

          <div>
            <span className="legend-dot tourist"></span>
            Tourist
          </div>

          <div>
            <span className="legend-dot incident"></span>
            Incident
          </div>

        </div>

      </div>

    </div>
  );
}

export default SafetyMap;