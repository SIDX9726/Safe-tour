function Header({ onLogout }) {
  return (
    <header className="header">

      {/* Menu Button */}
      <button className="header-menu">
        ☰
      </button>


      {/* Search */}
      <div className="search-box">

        <span className="search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search anything..."
        />

      </div>


      {/* Right Side */}
      <div className="header-right">

        {/* Notification */}
        <div className="header-icon notification">

          🔔

          <span className="notification-count">
            5
          </span>

        </div>


        {/* Messages */}
        <div className="header-icon message">

          💬

          <span className="notification-count">
            3
          </span>

        </div>


        {/* Logout */}
        <button
          className="header-logout"
          onClick={onLogout}
        >
          <span className="logout-icon">↪</span>
          <span>Logout</span>
        </button>

      </div>

    </header>
  );
}

export default Header;