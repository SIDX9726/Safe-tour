
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./components/Login";

import Dashboard from "./components/Dasboard";

// Pages

import "./App.css";

import LiveMap from "./Pages/LiveMap";
import Incidents from "./Pages/Incidents";
import EmergencyResponse from "./Pages/EmergencyResponse";
import AICompanionPage from "./Pages/AICompanionPage";
import VitrualTours from "./Pages/VitrualTours";
import DigitalArchives from "./Pages/DigitalArchives";
import SmartTicketing from "./Pages/SmartTicketing";
import ARExperience from "./Pages/ARExperience";
import EcoTourism from "./Pages/EcoTourism";
import TouristProfile from "./Pages/TouristProfile";
import AdminSettings from "./Pages/AdminSettings";
import MissingPersonReport from "./Pages/MissingPersonReport";
import CommunityConnector from "./Pages/CommunityConnector";

// NEW: AI Missing Person Assistant
import AIMissingPersonAssistant from "./Pages/AIMissingPersonAssistant";


function App() {

  // LOGIN STATUS
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // USER DATA
  const [user, setUser] = useState(null);


  // ================= LOGIN =================

  const handleLogin = (userData) => {

    setUser(userData);

    setIsLoggedIn(true);

  };


  // ================= LOGOUT =================

  const handleLogout = () => {

    setUser(null);

    setIsLoggedIn(false);

  };


  // ================= LOGIN PAGE =================

  if (!isLoggedIn) {

    return (
      <Login onLogin={handleLogin} />
    );

  }


  // ================= AFTER LOGIN =================

  return (

    <BrowserRouter>

      <div className="app">


        {/* ================= SIDEBAR ================= */}

        <Sidebar
          user={user}
          onLogout={handleLogout}
        />


        {/* ================= MAIN AREA ================= */}

        <div className="main">


          {/* ================= HEADER ================= */}

          <Header
            onLogout={handleLogout}
          />


          {/* ================= PAGE CONTENT ================= */}

          <div className="content">

            <Routes>


              {/* ================= DASHBOARD ================= */}

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/missing-person-report"
                element={<MissingPersonReport />}
              />


              {/* ================= AI MISSING PERSON ASSISTANT - NEW ================= */}

              <Route
                path="/ai-missing-person-assistant"
                element={<AIMissingPersonAssistant />}
              />


              {/* ================= AI COMMUNITY CONNECTOR ================= */}

              <Route
                path="/community-connector"
                element={<CommunityConnector />}
              />


              <Route
                path="/dashboard"
                element={<Dashboard />}
              />


              {/* ================= LIVE MAP ================= */}

              <Route
                path="/live-map"
                element={<LiveMap />}
              />


              {/* ================= INCIDENTS ================= */}

              <Route
                path="/incidents"
                element={<Incidents />}
              />


              {/* ================= EMERGENCY RESPONSE ================= */}

              <Route
                path="/emergency-response"
                element={<EmergencyResponse />}
              />


              {/* ================= AI COMPANION ================= */}

              <Route
                path="/ai-companion"
                element={<AICompanionPage />}
              />


              {/* ================= VIRTUAL TOURS ================= */}

              <Route
                path="/virtual-tours"
                element={<VitrualTours />}
              />


              {/* ================= DIGITAL ARCHIVES ================= */}

              <Route
                path="/digital-archives"
                element={<DigitalArchives />}
              />


              {/* ================= SMART TICKETING ================= */}

              <Route
                path="/smart-ticketing"
                element={<SmartTicketing />}
              />


              {/* ================= AR EXPERIENCE ================= */}

              <Route
                path="/ar-experience"
                element={<ARExperience />}
              />


              {/* ================= ECO TOURISM ================= */}

              <Route
                path="/eco-tourism"
                element={<EcoTourism />}
              />


              {/* ================= TOURIST PROFILE ================= */}

              <Route
                path="/tourist-profile"
                element={<TouristProfile />}
              />


              {/* ================= ADMIN SETTINGS ================= */}

              <Route
                path="/admin-settings"
                element={<AdminSettings />}
              />


            </Routes>

          </div>

        </div>

      </div>

    </BrowserRouter>

  );

}


export default App;

