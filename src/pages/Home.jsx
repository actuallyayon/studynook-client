import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiBookOpen, FiShield, FiClock, FiUsers, FiZap } from 'react-icons/fi';
import CountUp from '../components/CountUp';
import axiosInstance from '../hooks/useAxios';
import RoomCard from '../components/RoomCard';
import Spinner from '../components/Spinner';
import './Home.css';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'StudyNook – Home';
    fetchLatestRooms();
  }, []);

  const fetchLatestRooms = async () => {
    try {
      const res = await axiosInstance.get('/api/rooms/latest');
      if (res.data.success) {
        setRooms(res.data.rooms);
      }
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid" />
          <div className="hero-dots" />
        </div>
        <div className="container hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-text"
          >
            <span className="hero-badge">
              <FiZap /> The Smarter Way to Study
            </span>
            <h1 className="hero-title">
              Find Your Perfect <br />
              <span className="hero-highlight">Study Room</span>
            </h1>
            <p className="hero-description">
              Browse and book quiet, private study rooms in your library.
              List your own room to help fellow students focus and succeed.
            </p>
            <div className="hero-actions">
              <Link to="/rooms" className="btn btn-primary btn-lg">
                <FiSearch /> Explore Rooms
              </Link>
              <Link to="/add-room" className="btn btn-secondary btn-lg">
                List Your Room
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="stat-item">
              <span className="stat-number"><CountUp end={500} suffix="+" duration={3000} /></span>
              <span className="stat-label">Study Rooms</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number"><CountUp end={2000} suffix="+" duration={3500} /></span>
              <span className="stat-label">Happy Students</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number"><CountUp end={10000} suffix="+" duration={4000} /></span>
              <span className="stat-label">Bookings Made</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Available Study Rooms */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Available Study Rooms</h2>
          <p className="section-subtitle">
            Discover the latest rooms added by students and library administrators
          </p>

          {loading ? (
            <Spinner />
          ) : rooms.length > 0 ? (
            <>
              <div className="rooms-grid">
                {rooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
              <div className="section-cta">
                <Link to="/rooms" className="btn btn-outline btn-lg">
                  View All Rooms
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon"><FiBookOpen /></div>
              <h3 className="empty-state-title">No rooms available yet</h3>
              <p className="empty-state-text">Be the first to list a study room!</p>
              <Link to="/add-room" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Add Your Room
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Book your ideal study space in just three simple steps
          </p>

          <div className="steps-grid">
            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
            >
              <div className="step-number">01</div>
              <div className="step-icon">
                <FiSearch />
              </div>
              <h3 className="step-title">Browse & Search</h3>
              <p className="step-desc">
                Explore available rooms with powerful search and filter options to find your perfect match.
              </p>
            </motion.div>

            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div className="step-number">02</div>
              <div className="step-icon">
                <FiCalendar />
              </div>
              <h3 className="step-title">Pick Date & Time</h3>
              <p className="step-desc">
                Select your preferred date and time slot. Our system prevents double-booking automatically.
              </p>
            </motion.div>

            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="step-number">03</div>
              <div className="step-icon">
                <FiBookOpen />
              </div>
              <h3 className="step-title">Study & Focus</h3>
              <p className="step-desc">
                Confirm your booking and enjoy a quiet, distraction-free study session at your reserved room.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why StudyNook */}
      <section className="section why-section">
        <div className="container">
          <h2 className="section-title">Why StudyNook?</h2>
          <p className="section-subtitle">
            We make finding and booking study spaces effortless
          </p>

          <div className="features-grid">
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="feature-icon">
                <FiShield />
              </div>
              <h3>No Double-Booking</h3>
              <p>Our smart conflict detection ensures every booking is valid — no overlaps, ever.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="feature-icon">
                <FiClock />
              </div>
              <h3>Instant Booking</h3>
              <p>Book in seconds. No waiting for approval — your room is reserved the moment you click confirm.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="feature-icon">
                <FiUsers />
              </div>
              <h3>Community Driven</h3>
              <p>Any registered user can list rooms they manage, building a campus-wide study network.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="feature-icon">
                <FiZap />
              </div>
              <h3>Easy Management</h3>
              <p>Manage your listings and bookings from a clean, intuitive dashboard designed for students.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
