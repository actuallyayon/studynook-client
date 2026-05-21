import { Link } from 'react-router-dom';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <HiOutlineBookOpen className="footer-logo-icon" />
              <span className="footer-logo-text">StudyNook</span>
            </Link>
            <p className="footer-desc">
              Your go-to platform for finding and booking the perfect study room.
              Quiet, private, and equipped — just for you.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X">
                <FaXTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rooms">Browse Rooms</Link></li>
              <li><Link to="/add-room">List Your Room</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="footer-section">
            <h3 className="footer-heading">About</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <FiMail className="contact-icon" />
                <span>hello@studynook.com</span>
              </li>
              <li>
                <FiPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <FiMapPin className="contact-icon" />
                <span>123 Library Ave, Campus Town</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} StudyNook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
