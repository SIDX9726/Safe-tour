import "./TouristProfile.css";

function TouristProfile() {

  return (
    <div className="tourist-profile-page">

      {/* ================= HEADER ================= */}

      <div className="profile-header">

        <div>
          <h1>Tourist Profile</h1>

          <p>
            Manage tourist information and safety details
          </p>
        </div>

        <button className="edit-profile-btn">
          ✎ Edit Profile
        </button>

      </div>


      {/* ================= PROFILE CARD ================= */}

      <div className="profile-main-card">

        <div className="profile-avatar-large">
          👨🏻
        </div>

        <div className="profile-main-info">

          <h2>Rahul Sharma</h2>

          <p className="profile-id">
            Tourist ID: ST-2025-1048
          </p>

          <p className="profile-location">
            📍 New Delhi, India
          </p>

          <span className="profile-online">
            ● Online
          </span>

        </div>

        <div className="safety-score-small">

          <span>Safety Score</span>

          <strong>92</strong>

          <small>Excellent</small>

        </div>

      </div>


      {/* ================= INFORMATION CARDS ================= */}

      <div className="profile-grid">


        {/* PERSONAL INFORMATION */}

        <div className="profile-card">

          <h3>Personal Information</h3>

          <div className="info-row">
            <span>Full Name</span>
            <strong>Rahul Sharma</strong>
          </div>

          <div className="info-row">
            <span>Age</span>
            <strong>28</strong>
          </div>

          <div className="info-row">
            <span>Nationality</span>
            <strong>Indian</strong>
          </div>

          <div className="info-row">
            <span>Language</span>
            <strong>English, Hindi</strong>
          </div>

        </div>


        {/* CONTACT INFORMATION */}

        <div className="profile-card">

          <h3>Contact Information</h3>

          <div className="info-row">
            <span>Phone</span>
            <strong>+91 98XXXXXX45</strong>
          </div>

          <div className="info-row">
            <span>Email</span>
            <strong>rahul@example.com</strong>
          </div>

          <div className="info-row">
            <span>Emergency Contact</span>
            <strong>Priya Sharma</strong>
          </div>

          <div className="info-row">
            <span>Emergency Phone</span>
            <strong>+91 97XXXXXX21</strong>
          </div>

        </div>


        {/* TRIP INFORMATION */}

        <div className="profile-card">

          <h3>Current Trip</h3>

          <div className="info-row">
            <span>Destination</span>
            <strong>Shillong, Meghalaya</strong>
          </div>

          <div className="info-row">
            <span>Trip Started</span>
            <strong>20 May 2025</strong>
          </div>

          <div className="info-row">
            <span>Trip Ends</span>
            <strong>27 May 2025</strong>
          </div>

          <div className="info-row">
            <span>Travel Type</span>
            <strong>Solo Travel</strong>
          </div>

        </div>


        {/* SAFETY INFORMATION */}

        <div className="profile-card">

          <h3>Safety Information</h3>

          <div className="info-row">
            <span>Safety Score</span>
            <strong className="green-text">92 / 100</strong>
          </div>

          <div className="info-row">
            <span>Safe Zones Visited</span>
            <strong>8</strong>
          </div>

          <div className="info-row">
            <span>Incidents</span>
            <strong>0</strong>
          </div>

          <div className="info-row">
            <span>Geofence Status</span>
            <strong className="green-text">
              Safe
            </strong>
          </div>

        </div>

      </div>


      {/* ================= RECENT ACTIVITY ================= */}

      <div className="activity-card">

        <div className="activity-header">

          <h3>Recent Activity</h3>

          <span>View All</span>

        </div>


        <div className="activity-item">

          <div className="activity-icon">
            📍
          </div>

          <div>
            <strong>Entered Shillong Safe Zone</strong>
            <p>Today, 10:30 AM</p>
          </div>

          <span className="activity-safe">
            Safe
          </span>

        </div>


        <div className="activity-item">

          <div className="activity-icon">
            🎟️
          </div>

          <div>
            <strong>Ticket booked for Umiam Lake</strong>
            <p>Yesterday, 04:15 PM</p>
          </div>

          <span className="activity-safe">
            Completed
          </span>

        </div>


        <div className="activity-item">

          <div className="activity-icon">
            🗺️
          </div>

          <div>
            <strong>Visited Elephant Falls</strong>
            <p>20 May 2025, 02:40 PM</p>
          </div>

          <span className="activity-safe">
            Safe
          </span>

        </div>

      </div>


      {/* ================= EMERGENCY CONTACT ================= */}

      <div className="emergency-contact-card">

        <div className="emergency-contact-icon">
          🛡️
        </div>

        <div>

          <h3>Emergency Contact Ready</h3>

          <p>
            Your emergency contact information is available
            to SafeTour response teams.
          </p>

        </div>

        <button>
          View Contact
        </button>

      </div>

    </div>
  );
}

export default TouristProfile;