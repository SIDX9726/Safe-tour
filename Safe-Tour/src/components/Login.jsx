
import { useState } from "react";
import "./Login.css";
function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showRegister, setShowRegister] = useState(false);

  const [attendeeName, setAttendeeName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventName, setEventName] = useState("");

  // Password states
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show/Hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check password match
  const passwordsMatch =
    confirmPassword.length > 0 &&
    registerPassword === confirmPassword;

  const passwordsMismatch =
    confirmPassword.length > 0 &&
    registerPassword !== confirmPassword;

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      onLogin({
        email: email,
        name: email.split("@")[0]
      });
    } else {
      alert("Please enter email and password");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !attendeeName ||
      !email ||
      !phone ||
      !eventName ||
      !registerPassword ||
      !confirmPassword
    ) {
      alert("Please fill all registration details");
      return;
    }

    if (registerPassword.length < 8) {
      alert("Password must contain at least 8 characters");
      return;
    }

    if (registerPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const attendee = {
      name: attendeeName,
      email: email,
      phone: phone,
      eventName: eventName,
      password: registerPassword
    };

    const registrations = JSON.parse(
      localStorage.getItem("safetour-attendees") || "[]"
    );

    const existingAttendee = registrations.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existingAttendee) {
      alert("This email is already registered. Please login.");
      return;
    }

    registrations.push(attendee);

    localStorage.setItem(
      "safetour-attendees",
      JSON.stringify(registrations)
    );

    alert("Mega Event Registration Successful!");

    setShowRegister(false);
    setPassword("");
    setAttendeeName("");
    setPhone("");
    setEventName("");
    setRegisterPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* LOGO */}

        <div className="login-logo">
          <div className="login-shield">★</div>

          <div>
            <h1>SafeTour</h1>
            <p>Smart Tourism Safety</p>
          </div>
        </div>

        {/* LOGIN */}

        {!showRegister ? (

          <>
            <div className="login-heading">
              <h2>Welcome Back!</h2>
              <p>
                Login to access your tourism safety dashboard
              </p>
            </div>

            <form onSubmit={handleLogin}>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>

                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="login-options">

                <label className="remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Please contact the event administrator for password assistance.");
                  }}
                >
                  Forgot Password?
                </a>

              </div>

              <button type="submit" className="login-button">
                Login to Dashboard
              </button>

            </form>

            <div className="register-section">

              <p>Attending a Mega Event?</p>

              <button
                type="button"
                className="register-button"
                onClick={() => setShowRegister(true)}
              >
                Register for Mega Event
              </button>

            </div>

            <div className="demo-login">
              <p>Demo Login</p>
              <span>Email: admin@safetour.com</span>
              <span>Password: admin123</span>
            </div>

          </>

        ) : (

          /* MEGA EVENT REGISTRATION */

          <>
            <div className="login-heading">
              <h2>Mega Event Registration</h2>
              <p>
                Register as an attendee to access SafeTour safety services.
              </p>
            </div>

            <form onSubmit={handleRegister}>

              <div className="form-group">
                <label>Attendee Name</label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* CREATE PASSWORD */}

              <div className="form-group">
                <label>Create Password</label>

                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create your password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <small className="password-hint">
                  Minimum 8 characters
                </small>
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="form-group">
                <label>Confirm Password</label>

                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  <div className="password-actions">

                    {passwordsMatch && (
                      <span className="password-match-tick">
                        ✓
                      </span>
                    )}

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>

                  </div>
                </div>

                {passwordsMismatch && (
                  <small className="password-error">
                    Passwords do not match
                  </small>
                )}

                {passwordsMatch && (
                  <small className="password-success">
                    Passwords match successfully!
                  </small>
                )}

              </div>

              <div className="form-group">
                <label>Mega Event Name</label>

                <input
                  type="text"
                  placeholder="Enter event name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Complete Registration
              </button>

            </form>

            <div className="register-section">

              <button
                type="button"
                className="back-login-button"
                onClick={() => setShowRegister(false)}
              >
                Back to Login
              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Login;
