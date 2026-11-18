
import { NavLink } from "react-router-dom";

function Sidebar({ user, onLogout }) {

  return (

    <aside className="sidebar">

      {/* ================= LOGO ================= */}

      <div className="sidebar-logo">

        <div className="shield-logo">
          ★
        </div>

        <div className="logo-text">
          <h2>SafeTour</h2>
          <p>Smart Tourism Safety</p>
        </div>

      </div>


      {/* ================= MENU ================= */}

      <nav className="sidebar-menu">

        {/* Dashboard */}

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">▦</span>
          <span>Dashboard</span>
        </NavLink>


        {/* Live Map */}

        <NavLink
          to="/live-map"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">⌖</span>
          <span>Live Map</span>
        </NavLink>


        {/* Incidents */}

        <NavLink
          to="/incidents"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">△</span>
          <span>Incidents</span>
        </NavLink>


        {/* Emergency Response */}

        <NavLink
          to="/emergency-response"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">♧</span>
          <span>Emergency Response</span>
        </NavLink>


        {/* Report a Missing Person */}

        <NavLink
          to="/missing-person-report"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">♙</span>
          <span>Report a Missing Person</span>
        </NavLink>


        {/* AI Missing Person Assistant - NEW */}

        <NavLink
          to="/ai-missing-person-assistant"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">▣</span>
          <span>AI Missing Person Assistant</span>
        </NavLink>


        {/* AI Community Connector */}

        <NavLink
          to="/community-connector"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">♧</span>
          <span>AI Community Connector</span>
        </NavLink>


        {/* AI Tourist Companion */}

        <NavLink
          to="/ai-companion"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">▣</span>
          <span>AI Tourist Companion</span>
        </NavLink>


        {/* Virtual Tours */}

        <NavLink
          to="/virtual-tours"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">◎</span>
          <span>Virtual Tours (360°)</span>
        </NavLink>


        {/* Smart Ticketing */}

        <NavLink
          to="/smart-ticketing"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">◇</span>
          <span>Smart Ticketing</span>
        </NavLink>


        {/* Tourist Profile */}

        <NavLink
          to="/tourist-profile"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">♙</span>
          <span>Tourist Profile</span>
        </NavLink>

      </nav>


      {/* ================= EMERGENCY BUTTON ================= */}

      <button className="emergency-button">

        <span className="emergency-icon">
          ♟
        </span>

        <div>
          <strong>EMERGENCY</strong>
          <small>Get Help Now</small>
        </div>

      </button>


      {/* ================= USER PROFILE ================= */}

      <div className="sidebar-profile">

        <div className="profile-avatar">
          👤
        </div>

        <div className="profile-info">

          <h4>
            {user?.name || "Tourist"}
          </h4>

          <p>
            {user?.email || "Not logged in"}
          </p>

          <span>
            <i></i>
            Online
          </span>

        </div>

      </div>

    </aside>

  );
}

export default Sidebar;
