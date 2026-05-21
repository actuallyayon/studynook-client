import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { HiOutlineBookOpen } from 'react-icons/hi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileOpen(false);

  // Mobile menu rendered via portal to escape navbar stacking context
  const mobileMenu = mobileOpen
    ? createPortal(
        <div className="mobile-overlay" onClick={closeMobile}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <NavLink to="/" className="nav-link" onClick={closeMobile}>
              Home
            </NavLink>
            <NavLink to="/rooms" className="nav-link" onClick={closeMobile}>
              Rooms
            </NavLink>

            {user && (
              <>
                <NavLink to="/add-room" className="nav-link" onClick={closeMobile}>
                  Add Room
                </NavLink>
                <NavLink to="/my-listings" className="nav-link" onClick={closeMobile}>
                  My Listings
                </NavLink>
                <NavLink to="/my-bookings" className="nav-link" onClick={closeMobile}>
                  My Bookings
                </NavLink>
              </>
            )}

            <div className="mobile-auth">
              {!user ? (
                <>
                  <Link to="/login" className="btn btn-outline" onClick={closeMobile}>
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-outline" onClick={closeMobile}>
                    Register
                  </Link>
                </>
              ) : (
                <button className="btn btn-danger" onClick={handleLogout}>
                  <FiLogOut /> Logout
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMobile}>
            <HiOutlineBookOpen className="navbar-logo-icon" />
            <span className="navbar-logo-text">StudyNook</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="navbar-links-desktop">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/rooms" className="nav-link">
              Rooms
            </NavLink>

            {user && (
              <>
                <NavLink to="/add-room" className="nav-link">
                  Add Room
                </NavLink>
                <NavLink to="/my-listings" className="nav-link">
                  My Listings
                </NavLink>
                <NavLink to="/my-bookings" className="nav-link">
                  My Bookings
                </NavLink>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="navbar-right">
            {/* Theme toggle */}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>

            {!user ? (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline btn-sm">
                  Register
                </Link>
              </div>
            ) : (
              /* Profile dropdown */
              <div className="profile-dropdown">
                <button
                  className="profile-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="profile-avatar"
                    referrerPolicy="no-referrer"
                  />
                  <span className="profile-name">{user.name}</span>
                  <FiChevronDown className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="dropdown-avatar"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="dropdown-name">{user.name}</p>
                        <p className="dropdown-email">{user.email}</p>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <Link to="/my-listings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      My Listings
                    </Link>
                    <Link to="/my-bookings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      My Bookings
                    </Link>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger */}
            <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu portal */}
      {mobileMenu}
    </>
  );
};

export default Navbar;
