import AICompanion from "./AICompanion";
import Geofence from "./Geofence";
import IncidentPanel from "./IncidentPanel";
import QuickActions from "./QuickAction";
import SafetyMap from "./SafetyMap";
import SafetyScore from "./SafetyScore";
import StatsCards from "./StatsCards";
import SystemOverview from "./SystemOverview";

function Dashboard() {
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

      <StatsCards/>

      {/* MAP + INCIDENTS */}

      <div className="map-row">

        <SafetyMap/>

        <IncidentPanel />

      </div>
      {/* AI + SAFETY + GEOFENCING */}

<div className="smart-row">

  <AICompanion />

  <div className="smart-right">

    <SafetyScore/>

    <Geofence />



  </div>

</div>

<QuickActions/>

<SystemOverview/>

    </div>
  );
}

export default Dashboard;