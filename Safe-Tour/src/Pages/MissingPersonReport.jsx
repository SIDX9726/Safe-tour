

import React, { useState, useEffect } from "react";
import "./MissingPersonReport.css";

import { jsPDF } from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MissingPersonReport() {

  const initialFormData = {
    fullName: "",
    age: "",
    gender: "",
    description: "",
    clothing: "",
    lastSeenLocation: "",
    eventZone: "",
    lastSeenDate: "",
    lastSeenTime: "",
    reporterName: "",
    relationship: "",
    phone: "",
    email: "",
    additionalInfo: "",
    consent: false,
    communityConsent: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NEW STATES
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedReportId, setSavedReportId] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);

  // Clean up photo preview URL
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload only JPG or PNG images.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // Remove uploaded photo
  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview("");

    const fileInput = document.getElementById("personPhoto");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Generate unique report ID
  const generateReportId = () => {
    const date = new Date();

    const datePart =
      date.getFullYear().toString() +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0");

    const randomPart = crypto.randomUUID()
      .replace(/-/g, "")
      .substring(0, 8)
      .toUpperCase();

    return `ST-MP-${datePart}-${randomPart}`;
  };

  // Convert photo to Base64
  const convertPhotoToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);

      reader.onerror = () =>
        reject(new Error("Unable to read uploaded photo."));

      reader.readAsDataURL(file);
    });
  };

  // Generate professional PDF
  const generatePDF = async (reportId) => {

    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;

    let y = 38;

    const purple = [91, 59, 171];
    const dark = [38, 45, 61];
    const grey = [105, 112, 128];
    const light = [245, 243, 252];

    const generatedDate = new Date().toLocaleString("en-IN");

    // Header
    const addPageHeader = () => {

      doc.setFillColor(...purple);
      doc.rect(0, 0, pageWidth, 5, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(...purple);
      doc.text("SAFETOUR", margin, 19);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...grey);
      doc.text("MISSING PERSON ASSISTANCE SYSTEM", margin, 25);

      doc.setDrawColor(225, 222, 235);
      doc.line(margin, 30, pageWidth - margin, 30);
    };

    // Footer
    const addPageFooter = () => {

      doc.setDrawColor(225, 222, 235);
      doc.line(margin, 282, pageWidth - margin, 282);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...grey);

      doc.text(
        "SAFETOUR | MISSING PERSON ASSISTANCE",
        margin,
        289
      );

      doc.text(
        `Page ${doc.internal.getNumberOfPages()}`,
        pageWidth - margin,
        289,
        { align: "right" }
      );
    };

    // Check available space
    const checkSpace = (height) => {

      if (y + height > 270) {

        doc.addPage();

        addPageHeader();

        y = 40;
      }
    };

    // Section heading
    const addSection = (title) => {

      checkSpace(18);

      doc.setFillColor(...light);

      doc.roundedRect(
        margin,
        y,
        contentWidth,
        10,
        2,
        2,
        "F"
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...purple);

      doc.text(title, margin + 4, y + 6.7);

      y += 16;
    };

    // Add one field
    const addField = (label, value, fullWidth = false) => {

      const width = fullWidth ? contentWidth : 82;

      const text = String(value || "Not provided");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...grey);

      const labelLines = doc.splitTextToSize(label, width);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...dark);

      const valueLines = doc.splitTextToSize(text, width);

      const height =
        labelLines.length * 4 +
        valueLines.length * 5 +
        6;

      checkSpace(height);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...grey);

      doc.text(labelLines, margin, y);

      y += labelLines.length * 4;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...dark);

      doc.text(valueLines, margin, y);

      y += valueLines.length * 5 + 6;
    };

    // Add two-column fields
    const addTwoColumns = (fields) => {

      for (let i = 0; i < fields.length; i += 2) {

        const left = fields[i];
        const right = fields[i + 1];

        const columnWidth = (contentWidth - 12) / 2;

        const getLines = (value, width) => {

          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);

          return doc.splitTextToSize(
            String(value || "Not provided"),
            width
          );
        };

        const leftLines = getLines(left.value, columnWidth);

        const rightLines = right
          ? getLines(right.value, columnWidth)
          : [];

        const rowHeight =
          Math.max(leftLines.length, rightLines.length) * 5 + 14;

        checkSpace(rowHeight);

        const addColumn = (field, x) => {

          if (!field) return;

          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.setTextColor(...grey);

          doc.text(field.label, x, y);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(...dark);

          const lines = getLines(field.value, columnWidth);

          doc.text(lines, x, y + 6);
        };

        addColumn(left, margin);

        addColumn(right, margin + columnWidth + 12);

        y += rowHeight;
      }
    };

    // Start first page
    addPageHeader();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.setTextColor(...dark);

    doc.text("MISSING PERSON REPORT", margin, y);

    y += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...grey);

    doc.text(
      "Generated report copy for authorized review",
      margin,
      y
    );

    y += 12;

    // Report ID box
    doc.setFillColor(...light);

    doc.roundedRect(
      margin,
      y,
      contentWidth,
      18,
      3,
      3,
      "F"
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...grey);

    doc.text("REPORT ID", margin + 5, y + 6);

    doc.setFontSize(11);
    doc.setTextColor(...purple);

    doc.text(reportId, margin + 5, y + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...grey);

    doc.text(
      `Generated: ${generatedDate}`,
      pageWidth - margin - 5,
      y + 10,
      { align: "right" }
    );

    y += 25;

    // Uploaded photograph
    if (photo) {

      const photoBase64 = await convertPhotoToBase64(photo);

      const imageType =
        photo.type === "image/png" ? "PNG" : "JPEG";

      const imageProperties = doc.getImageProperties(photoBase64);

      const maxWidth = 35;
      const maxHeight = 40;

      const ratio = Math.min(
        maxWidth / imageProperties.width,
        maxHeight / imageProperties.height
      );

      const imageWidth = imageProperties.width * ratio;
      const imageHeight = imageProperties.height * ratio;

      checkSpace(imageHeight + 12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...grey);

      doc.text("UPLOADED PHOTOGRAPH", margin, y);

      y += 4;

      doc.addImage(
        photoBase64,
        imageType,
        margin,
        y,
        imageWidth,
        imageHeight
      );

      y += imageHeight + 10;
    }

    // Section 1
    addSection("01  MISSING PERSON INFORMATION");

    addTwoColumns([
      { label: "Full Name", value: formData.fullName },
      { label: "Age", value: formData.age },
      { label: "Gender", value: formData.gender },
      { label: "Event Zone", value: formData.eventZone },
    ]);

    addField("Physical Description", formData.description, true);

    addField("Clothing Description", formData.clothing, true);

    // Section 2
    addSection("02  LAST SEEN INFORMATION");

    addTwoColumns([
      {
        label: "Last Seen Date",
        value: formData.lastSeenDate,
      },
      {
        label: "Last Seen Time",
        value: formData.lastSeenTime,
      },
    ]);

    addField(
      "Last Seen Location",
      formData.lastSeenLocation,
      true
    );

    // Section 3
    addSection("03  REPORTING PERSON INFORMATION");

    addTwoColumns([
      {
        label: "Reporter Name",
        value: formData.reporterName,
      },
      {
        label: "Relationship",
        value: formData.relationship,
      },
      {
        label: "Contact Number",
        value: formData.phone,
      },
      {
        label: "Email Address",
        value: formData.email,
      },
    ]);

    // Section 4
    addSection("04  ADDITIONAL INFORMATION");

    addField(
      "Additional Details",
      formData.additionalInfo,
      true
    );

    addField(
      "Consent",
      formData.consent
        ? "Consent provided"
        : "Consent not provided",
      true
    );

    // Disclaimer
    checkSpace(28);

    y += 3;

    doc.setFillColor(250, 249, 253);

    doc.roundedRect(
      margin,
      y,
      contentWidth,
      20,
      2,
      2,
      "F"
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...purple);

    doc.text("IMPORTANT NOTE", margin + 4, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...grey);

    doc.text(
      "This document is a computer-generated report copy. The information",
      margin + 4,
      y + 11
    );

    doc.text(
      "has not been independently verified and does not confirm official action.",
      margin + 4,
      y + 15
    );

    // Add footer to every page
    const totalPages = doc.internal.getNumberOfPages();

    for (let page = 1; page <= totalPages; page++) {

      doc.setPage(page);

      addPageFooter();
    }

    // Download PDF when Print Report is clicked
    doc.save(`${reportId}.pdf`);
  };

  // =================================
  // STEP 1: SUBMIT REPORT
  // =================================

  const handleSubmit = (e) => {

    e.preventDefault();

    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);

    try {

      // Generate unique Report ID
      const reportId = generateReportId();

      // Prepare public description
      const publicDescription = [
        formData.description,
        formData.clothing
          ? `Clothing: ${formData.clothing}`
          : "",
      ]
        .filter(Boolean)
        .join(" | ");

      // Create report object
      const newReport = {
        ...formData,
        reportId,
        status: "Active",
        communityShared: formData.communityConsent,
        publicDescription,
        createdAt: new Date().toISOString(),
      };

      // Get existing reports
      const existingReports = JSON.parse(
        localStorage.getItem("safetour_reports") || "[]"
      );

      // Save new report
      const updatedReports = [
        ...existingReports,
        newReport,
      ];

      localStorage.setItem(
        "safetour_reports",
        JSON.stringify(updatedReports)
      );

      // Store Report ID
      setSavedReportId(reportId);

      // Mark form as submitted
      setIsSubmitted(true);

      // Update Community Connect
      window.dispatchEvent(
        new Event("safetour-reports-updated")
      );

      // Success toast
      toast.success(
        `Report submitted successfully! Report ID: ${reportId}`,
        {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        }
      );

      // Community sharing message
      if (formData.communityConsent) {

        toast.success(
          "Report shared with Community Connect."
        );

      } else {

        toast.info(
          "Report saved privately. Community sharing was not selected."
        );

      }

      console.log("Generated Report ID:", reportId);

    } catch (error) {

      console.error("Report Submission Error:", error);

      toast.error("Unable to submit report. Please try again.");

    } finally {

      setIsSubmitting(false);

    }
  };

  // =================================
  // STEP 2: PRINT REPORT
  // =================================

  const handlePrintReport = async () => {

    if (!savedReportId || isPrinting) return;

    setIsPrinting(true);

    try {

      await generatePDF(savedReportId);

      toast.success("Report PDF generated successfully!");

    } catch (error) {

      console.error("PDF Generation Error:", error);

      toast.error("Unable to generate PDF. Please try again.");

    } finally {

      setIsPrinting(false);

    }
  };

  // =================================
  // RESET FORM
  // =================================

  const handleReset = () => {

    setFormData(initialFormData);

    setPhoto(null);

    setPhotoPreview("");

    setIsSubmitted(false);

    setSavedReportId("");

    setIsPrinting(false);

    const fileInput = document.getElementById("personPhoto");

    if (fileInput) {
      fileInput.value = "";
    }

    toast.info("Form has been reset.");
  };

  return (
    <div className="missing-report-page">

      <ToastContainer />

      <div className="report-header">

        <div>

          <p className="breadcrumb">
            SafeTour / Missing Person / Report
          </p>

          <h1>Missing Person Report</h1>

          <p className="header-description">
            Submit the details below to create a missing person report.
          </p>

        </div>

      </div>

      <div className="information-notice">

        <span className="notice-icon">ⓘ</span>

        <p>
          Please provide accurate information. Fields marked with
          <span className="required-star"> *</span> are mandatory.
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        {/* Missing Person Information */}

        <div className="form-section">

          <div className="section-heading">

            <div className="section-number">01</div>

            <div>
              <h2>Missing Person Information</h2>
              <p>Enter the details of the missing person.</p>
            </div>

          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Full Name <span>*</span>
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                disabled={isSubmitted}
              />

            </div>

            <div className="form-group">

              <label>
                Age <span>*</span>
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="0"
                max="120"
                required
                disabled={isSubmitted}
              />

            </div>

            <div className="form-group">

              <label>
                Gender <span>*</span>
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                disabled={isSubmitted}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">
                  Prefer not to say
                </option>
              </select>

            </div>

            <div className="form-group full-width">

              <label>
                Physical Description <span>*</span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe identifiable features..."
                rows="3"
                required
                disabled={isSubmitted}
              />

            </div>

            <div className="form-group full-width">

              <label>Clothing Description</label>

              <textarea
                name="clothing"
                value={formData.clothing}
                onChange={handleChange}
                placeholder="Describe the clothes worn when last seen..."
                rows="3"
                disabled={isSubmitted}
              />

            </div>

          </div>

          {/* Photo Upload */}

          <div className="photo-upload-section">

            <label className="photo-upload-heading">
              Recent Photograph
            </label>

            <p className="field-hint">
              Upload a clear photograph if available. JPG or PNG, maximum 5 MB.
            </p>

            {!photoPreview ? (

              <label
                htmlFor="personPhoto"
                className="photo-upload-box"
              >

                <div className="upload-icon">↑</div>

                <strong>Click to upload photograph</strong>

                <span>JPG or PNG (Maximum 5 MB)</span>

                <input
                  type="file"
                  id="personPhoto"
                  accept="image/jpeg,image/png"
                  onChange={handlePhotoUpload}
                  hidden
                  disabled={isSubmitted}
                />

              </label>

            ) : (

              <div className="photo-preview-container">

                <img
                  src={photoPreview}
                  alt="Missing person preview"
                  className="photo-preview"
                />

                <div className="photo-details">

                  <strong>{photo?.name}</strong>

                  <span>
                    {(photo.size / 1024 / 1024).toFixed(2)} MB
                  </span>

                  {!isSubmitted && (
                    <button
                      type="button"
                      className="remove-photo-btn"
                      onClick={removePhoto}
                    >
                      Remove Photo
                    </button>
                  )}

                </div>

              </div>

            )}

          </div>

        </div>

        {/* Last Seen Information */}

        <div className="form-section">

          <div className="section-heading">

            <div className="section-number">02</div>

            <div>
              <h2>Last Seen Information</h2>
              <p>Provide the last known location and time.</p>
            </div>

          </div>

          <div className="form-grid">

            <div className="form-group full-width">

              <label>
                Last Seen Location <span>*</span>
              </label>

              <input
                type="text"
                name="lastSeenLocation"
                value={formData.lastSeenLocation}
                onChange={handleChange}
                placeholder="Enter exact location"
                required
                disabled={isSubmitted}
              />

            </div>

            <div className="form-group">

              <label>
                Event Zone <span>*</span>
              </label>

              <select
                name="eventZone"
                value={formData.eventZone}
                onChange={handleChange}
                required
                disabled={isSubmitted}
              >

                <option value="">Select event zone</option>

                <option value="Zone A - Main Entrance and Exit">
                  Zone A - Main Entrance and Exit
                </option>

                <option value="Zone B - Main Stage">
                  Zone B - Main Stage
                </option>

                <option value="Zone C - Food Court and Stalls">
                  Zone C - Food Court and Stalls
                </option>

                <option value="Zone D - Parking and Rest Area">
                  Zone D - Parking and Rest Area
                </option>

                <option value="Other - Exact location not listed">
                  Other - Exact location not listed
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Last Seen Date <span>*</span>
              </label>

              <input
                type="date"
                name="lastSeenDate"
                value={formData.lastSeenDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
                disabled={isSubmitted}
              />

            </div>

            <div className="form-group">

              <label>
                Last Seen Time <span>*</span>
              </label>

              <input
                type="time"
                name="lastSeenTime"
                value={formData.lastSeenTime}
                onChange={handleChange}
                required
                disabled={isSubmitted}
              />

            </div>

          </div>

        </div>

        {/* Reporting Person Information */}

        <div className="form-section">

          <div className="section-heading">

            <div className="section-number">03</div>

            <div>
              <h2>Reporting Person Information</h2>
              <p>Enter the contact details of the reporting person.</p>
            </div>

          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Reporter Name <span>*</span>
              </label>

              <input
                type="text"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                disabled={isSubmitted}
              />

            </div>

            <div className="form-group">

              <label>
                Relationship <span>*</span>
              </label>

              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                required
                disabled={isSubmitted}
              >

                <option value="">Select relationship</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Friend">Friend</option>
                <option value="Relative">Relative</option>
                <option value="Guardian">Guardian</option>
                <option value="Other">Other</option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Phone Number <span>*</span>
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                pattern="[0-9]{10}"
                maxLength="10"
                required
                disabled={isSubmitted}
              />

            </div>

            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                disabled={isSubmitted}
              />

            </div>

          </div>

        </div>

        {/* Additional Information */}

        <div className="form-section">

          <div className="section-heading">

            <div className="section-number">04</div>

            <div>
              <h2>Additional Information</h2>
              <p>Share any other relevant information.</p>
            </div>

          </div>

          <div className="form-group">

            <label>Additional Details</label>

            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Enter any additional information..."
              rows="4"
              disabled={isSubmitted}
            />

          </div>

          <div className="consent-section">

            <label className="consent-label">

              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
                disabled={isSubmitted}
              />

              <span>
                I confirm that the information provided is accurate
                to the best of my knowledge.
                <span className="required-star"> *</span>
              </span>

            </label>

            <label className="consent-label community-consent-label">

              <input
                type="checkbox"
                name="communityConsent"
                checked={formData.communityConsent}
                onChange={handleChange}
                disabled={isSubmitted}
              />

              <span>
                I agree to share the missing person's approved details
                with the SafeTour community to request relevant information.
              </span>

            </label>

          </div>

        </div>

        {/* SUBMIT AND PRINT BUTTONS */}

        <div className="submit-section">

          {!isSubmitted ? (

            <>
              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Reset Form
              </button>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting Report..."
                  : "Submit Report"}
              </button>
            </>

          ) : (

            <>

              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
              >
                New Report
              </button>

              <button
                type="button"
                className="submit-btn print-report-btn"
                onClick={handlePrintReport}
                disabled={isPrinting}
              >
                {isPrinting
                  ? "Generating PDF..."
                  : "Print Report"}
              </button>

            </>

          )}

        </div>

        {/* Submitted Report ID */}

        {isSubmitted && (

          <div className="submitted-report-info">

            <h3>Report Submitted Successfully!</h3>

            <p>Your Missing Person Report ID:</p>

            <strong>{savedReportId}</strong>

            <p>
              Your report has been saved. Click Print Report
              to download your PDF copy.
            </p>

          </div>

        )}

      </form>

    </div>
  );
}

export default MissingPersonReport;
