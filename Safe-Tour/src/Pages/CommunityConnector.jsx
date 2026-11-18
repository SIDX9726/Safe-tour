

import React, { useEffect, useState } from "react";
import "./CommunityConnector.css";

const REPORT_KEY = "safetour_reports";
const SIGHTING_KEY = "safetour_sightings";

function CommunityConnect() {

  const [reports, setReports] = useState([]);
  const [sightings, setSightings] = useState([]);

  const [selectedReport, setSelectedReport] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");

  // Success popup states
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [latestSubmission, setLatestSubmission] = useState(null);

  const [formData, setFormData] = useState({
    location: "",
    time: "",
    description: ""
  });

  // Load reports and sightings
  const loadData = () => {
    try {
      const savedReports = JSON.parse(
        localStorage.getItem(REPORT_KEY) || "[]"
      );

      const savedSightings = JSON.parse(
        localStorage.getItem(SIGHTING_KEY) || "[]"
      );

      setReports(Array.isArray(savedReports) ? savedReports : []);
      setSightings(Array.isArray(savedSightings) ? savedSightings : []);

    } catch (error) {
      console.error("Error loading community data:", error);
    }
  };

  useEffect(() => {

    loadData();

    const handleUpdate = () => loadData();

    window.addEventListener("storage", handleUpdate);
    window.addEventListener(
      "safetour-sightings-updated",
      handleUpdate
    );
    window.addEventListener(
      "safetour-reports-updated",
      handleUpdate
    );

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener(
        "safetour-sightings-updated",
        handleUpdate
      );
      window.removeEventListener(
        "safetour-reports-updated",
        handleUpdate
      );
    };

  }, []);

  // Active community-shared reports
  const activeReports = reports.filter(
    (report) =>
      report.status === "Active" &&
      report.communityShared === true
  );

  // Search reports
  const filteredReports = activeReports.filter((report) => {

    const searchText = search.toLowerCase();

    return (
      String(report.reportId || "").toLowerCase().includes(searchText) ||
      String(report.eventZone || "").toLowerCase().includes(searchText) ||
      String(report.lastSeenLocation || "").toLowerCase().includes(searchText)
    );

  });

  // Get sightings for a report
  const getReportSightings = (reportId) => {
    return sightings.filter(
      (item) => item.reportId === reportId
    );
  };

  // Generate community alert
  const generateAIAlert = (report) => {

    return `COMMUNITY ASSISTANCE REQUEST

Report ID: ${report.reportId}

Last Seen Location: ${report.lastSeenLocation || "Not provided"}

Event Zone: ${report.eventZone || "Not provided"}

Last Seen Date: ${report.lastSeenDate || "Not provided"}

Last Seen Time: ${report.lastSeenTime || "Not provided"}

Description: ${report.publicDescription || "Contact authorised responders for details."}

If you have relevant information, please submit a sighting through SafeTour.

Please do not share personal information publicly.
All information will be reviewed by authorised responders.`;

  };

  // Submit sighting
  const handleSubmitSighting = (e) => {

    e.preventDefault();

    if (!selectedReport) {
      setNotification("Please select a community alert.");
      return;
    }

    if (
      !formData.location.trim() ||
      !formData.time ||
      !formData.description.trim()
    ) {
      setNotification("Please complete all fields.");
      return;
    }

    const newSighting = {

      responseId: `ST-SG-${Date.now()}`,

      reportId: selectedReport,

      location: formData.location.trim(),

      time: formData.time,

      description: formData.description.trim(),

      verificationStatus: "Pending",

      submittedAt: new Date().toISOString()

    };

    // Save sighting
    const updatedSightings = [
      ...sightings,
      newSighting
    ];

    localStorage.setItem(
      SIGHTING_KEY,
      JSON.stringify(updatedSightings)
    );

    setSightings(updatedSightings);

    // Store latest submission for popup
    setLatestSubmission(newSighting);

    // Open popup automatically
    setShowSuccessPopup(true);

    // Notify other components
    window.dispatchEvent(
      new Event("safetour-sightings-updated")
    );

    // Reset form
    setFormData({
      location: "",
      time: "",
      description: ""
    });

    setSelectedReport("");
    setShowForm(false);
    setNotification("");

  };

  // Close success popup
  const closeSuccessPopup = () => {

    setShowSuccessPopup(false);
    setLatestSubmission(null);

  };

  // Update verification status
  const updateSightingStatus = (responseId, status) => {

    const updatedSightings = sightings.map((item) => {

      if (item.responseId === responseId) {

        return {
          ...item,
          verificationStatus: status,
          reviewedAt: new Date().toISOString()
        };

      }

      return item;

    });

    localStorage.setItem(
      SIGHTING_KEY,
      JSON.stringify(updatedSightings)
    );

    setSightings(updatedSightings);

    window.dispatchEvent(
      new Event("safetour-sightings-updated")
    );

  };

  // Statistics
  const totalSightings = sightings.length;

  const pendingSightings = sightings.filter(
    (item) => item.verificationStatus === "Pending"
  ).length;

  const verifiedSightings = sightings.filter(
    (item) => item.verificationStatus === "Verified"
  ).length;

  const rejectedSightings = sightings.filter(
    (item) => item.verificationStatus === "Rejected"
  ).length;

  // AI-style insights
  const getAIInsights = () => {

    if (activeReports.length === 0) {
      return "There are currently no active community assistance requests. New approved requests will appear here.";
    }

    if (totalSightings === 0) {
      return `${activeReports.length} active community assistance request(s) are available. Attendees can submit relevant information through the sighting form.`;
    }

    return `${activeReports.length} active assistance request(s) and ${totalSightings} sighting(s) have been recorded. ${pendingSightings} are awaiting verification, ${verifiedSightings} have been verified and ${rejectedSightings} have been rejected.`;
  };

  // Date formatting
  const formatDate = (date) => {

    if (!date) return "Not provided";

    return new Date(date).toLocaleString();

  };

  return (

    <div className="community-page">

      {/* HEADER */}

      <div className="community-header">

        <div>
          <h1>AI Community Connect</h1>

          <p>
            Connecting families, visitors and communities
            to support missing-person assistance.
          </p>
        </div>

        <span className="community-status">
          ● Community Active
        </span>

      </div>


      {/* NOTIFICATION */}

      {notification && (

        <div className="community-notification">

          {notification}

          <button onClick={() => setNotification("")}>
            ×
          </button>

        </div>

      )}


      {/* STATISTICS */}

      <div className="community-stats">

        <div className="community-stat-card">
          <div className="stat-icon purple">📢</div>

          <div>
            <h2>{activeReports.length}</h2>
            <p>Active Community Alerts</p>
          </div>
        </div>

        <div className="community-stat-card">
          <div className="stat-icon blue">👁️</div>

          <div>
            <h2>{totalSightings}</h2>
            <p>Total Sightings</p>
          </div>
        </div>

        <div className="community-stat-card">
          <div className="stat-icon orange">⏳</div>

          <div>
            <h2>{pendingSightings}</h2>
            <p>Pending Verification</p>
          </div>
        </div>

        <div className="community-stat-card">
          <div className="stat-icon green">✓</div>

          <div>
            <h2>{verifiedSightings}</h2>
            <p>Verified Sightings</p>
          </div>
        </div>

      </div>


      {/* AI COMMUNITY INSIGHTS */}

      <div className="ai-insights-card">

        <div className="ai-insights-heading">

          <div className="ai-icon">✦</div>

          <div>
            <h2>AI Community Insights</h2>
            <p>Community activity overview</p>
          </div>

        </div>

        <p className="ai-insight-text">
          {getAIInsights()}
        </p>

        <span className="ai-demo-label">
          Rule-based demonstration · AI integration ready
        </span>

      </div>


      {/* SEARCH AND SUBMIT BUTTON */}

      <div className="community-toolbar">

        <div className="community-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search by Report ID or event zone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <button
          className="sighting-action-btn"
          onClick={() => {
            setNotification("");
            setShowForm(!showForm);
          }}
        >
          + Submit Sighting
        </button>

      </div>


      {/* SIGHTING FORM */}

      {showForm && (

        <div className="sighting-form-card">

          <h2>Submit Community Sighting</h2>

          <p>
            Share relevant information about a community
            assistance request.
          </p>

          <form onSubmit={handleSubmitSighting}>

            <label>Select Report ID</label>

            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              required
            >

              <option value="">Select a Report</option>

              {activeReports.map((report) => (

                <option
                  key={report.reportId}
                  value={report.reportId}
                >
                  {report.reportId} - {report.eventZone}
                </option>

              ))}

            </select>


            <label>Where did you notice something relevant?</label>

            <input
              type="text"
              placeholder="Enter location or event zone"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value
                })
              }
              required
            />


            <label>Date and time of sighting</label>

            <input
              type="datetime-local"
              value={formData.time}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  time: e.target.value
                })
              }
              required
            />


            <label>Describe the information you observed</label>

            <textarea
              placeholder="Provide relevant details..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value
                })
              }
              rows="4"
              required
            />


            <div className="sighting-form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-sighting-btn"
              >
                Submit Information
              </button>

            </div>

          </form>

        </div>

      )}


      {/* ACTIVE COMMUNITY ALERTS */}

      <div className="community-section-heading">

        <div>
          <h2>Active Community Assistance Requests</h2>
          <p>Approved requests shared with the community</p>
        </div>

        <span>{filteredReports.length} Requests</span>

      </div>


      <div className="community-alert-list">

        {filteredReports.length === 0 ? (

          <div className="community-empty">

            <div>📭</div>

            <h3>No Community Alerts Found</h3>

            <p>
              Active reports approved for community sharing
              will appear here.
            </p>

          </div>

        ) : (

          filteredReports.map((report) => {

            const reportSightings = getReportSightings(
              report.reportId
            );

            return (

              <div
                className="community-alert-card"
                key={report.reportId}
              >

                <div className="alert-card-top">

                  <div>

                    <span className="active-tag">
                      ● Active Request
                    </span>

                    <h3>Community Assistance Required</h3>

                    <p className="report-id">
                      Report ID: {report.reportId}
                    </p>

                  </div>

                  <span className="alert-bell">🔔</span>

                </div>


                <div className="alert-details-grid">

                  <div>
                    <small>Last Seen Location</small>
                    <strong>
                      {report.lastSeenLocation || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <small>Event Zone</small>
                    <strong>
                      {report.eventZone || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <small>Last Seen Date</small>
                    <strong>
                      {report.lastSeenDate || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <small>Last Seen Time</small>
                    <strong>
                      {report.lastSeenTime || "Not provided"}
                    </strong>
                  </div>

                </div>


                <div className="public-description">

                  <small>Approved Public Description</small>

                  <p>
                    {report.publicDescription ||
                      "Contact authorised responders for details."}
                  </p>

                </div>


                {/* AI ALERT */}

                <details className="ai-alert-details">

                  <summary>✦ View AI Community Alert</summary>

                  <pre>
                    {generateAIAlert(report)}
                  </pre>

                </details>


                <div className="alert-card-footer">

                  <span>
                    {reportSightings.length} Sightings Received
                  </span>

                  <button
                    onClick={() => {
                      setSelectedReport(report.reportId);
                      setShowForm(true);
                      setNotification("");

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                      });
                    }}
                  >
                    Submit Sighting
                  </button>

                </div>


                <div className="alert-created-date">
                  Created: {formatDate(report.createdAt)}
                </div>

              </div>

            );

          })

        )}

      </div>


      {/* SIGHTING MANAGEMENT */}

      <div className="sighting-management-section">

        <div className="community-section-heading">

          <div>
            <h2>Sighting Submission & Tracking</h2>

            <p>
              Track all sightings linked to their original reports.
            </p>
          </div>

          <span>{sightings.length} Submissions</span>

        </div>


        {sightings.length === 0 ? (

          <div className="community-empty">

            <div>📋</div>

            <h3>No Sightings Submitted Yet</h3>

            <p>
              Submitted community sightings will appear here.
            </p>

          </div>

        ) : (

          sightings.map((item) => (

            <div
              className="sighting-tracking-card"
              key={item.responseId}
            >

              <div className="tracking-header">

                <div>
                  <h3>{item.responseId}</h3>

                  <p>
                    Linked Report: {item.reportId}
                  </p>
                </div>

                <span
                  className={`verification-status ${item.verificationStatus.toLowerCase()}`}
                >
                  {item.verificationStatus}
                </span>

              </div>


              <div className="tracking-details">

                <p>
                  <strong>Location:</strong> {item.location}
                </p>

                <p>
                  <strong>Sighting Date & Time:</strong>{" "}
                  {formatDate(item.time)}
                </p>

                <p>
                  <strong>Observation:</strong> {item.description}
                </p>

                <p>
                  <strong>Submitted:</strong>{" "}
                  {formatDate(item.submittedAt)}
                </p>

                {item.reviewedAt && (
                  <p>
                    <strong>Reviewed:</strong>{" "}
                    {formatDate(item.reviewedAt)}
                  </p>
                )}

              </div>


              {/* DEMO REVIEW BUTTONS */}

              {item.verificationStatus === "Pending" && (

                <div className="tracking-actions">

                  <button
                    className="verify-btn"
                    onClick={() =>
                      updateSightingStatus(
                        item.responseId,
                        "Verified"
                      )
                    }
                  >
                    ✓ Mark Verified
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      updateSightingStatus(
                        item.responseId,
                        "Rejected"
                      )
                    }
                  >
                    Reject
                  </button>

                </div>

              )}

            </div>

          ))

        )}

      </div>


      {/* PRIVACY NOTE */}

      <div className="community-privacy">

        <strong>🔒 Community Safety & Privacy</strong>

        <p>
          Only approved public information is displayed.
          Sightings remain pending until reviewed by
          authorised personnel. Do not share personal
          contact details or approach anyone based on
          an unverified report.
        </p>

      </div>


      {/* AUTOMATIC SIGHTING SUCCESS POPUP */}

      {showSuccessPopup && latestSubmission && (

        <div className="success-popup-overlay">

          <div
            className="success-popup-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-popup-title"
          >

            <div className="success-popup-icon">
              ✓
            </div>

            <h2 id="success-popup-title">
              Sighting Submitted Successfully!
            </h2>

            <p className="success-popup-message">
              Thank you for helping the SafeTour community.
              Your information has been recorded successfully.
            </p>


            <div className="success-popup-details">

              <h3>Submission Details</h3>

              <p>
                <strong>Response ID:</strong>
                <span>{latestSubmission.responseId}</span>
              </p>

              <p>
                <strong>Report ID:</strong>
                <span>{latestSubmission.reportId}</span>
              </p>

              <p>
                <strong>Location:</strong>
                <span>{latestSubmission.location}</span>
              </p>

              <p>
                <strong>Date & Time:</strong>
                <span>{formatDate(latestSubmission.time)}</span>
              </p>

              <p>
                <strong>Status:</strong>
                <span className="pending-label">
                  Pending Review
                </span>
              </p>

            </div>


            <div className="success-next-step">

              <strong>What happens next?</strong>

              <p>
                Your information will be reviewed by
                authorised event safety personnel.
                You can track the verification status
                in Sighting Management.
              </p>

            </div>


            <button
              className="success-done-btn"
              onClick={closeSuccessPopup}
            >
              Done – Back to Community Connect
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default CommunityConnect;
