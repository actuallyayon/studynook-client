import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiGlobe, FiUsers } from 'react-icons/fi';
import './StaticPages.css';

const AboutUs = () => {
  useEffect(() => {
    document.title = 'StudyNook – About Us';
  }, []);

  return (
    <div className="static-page">
      <div className="container">
        <motion.div
          className="static-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="static-hero-title">About StudyNook</h1>
          <p className="static-hero-desc">
            We believe every student deserves a quiet, comfortable place to focus. StudyNook connects learners with the perfect study spaces.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="about-icon"><FiTarget /></div>
            <h3>Our Mission</h3>
            <p>
              To make finding and booking study spaces effortless for every student. We aim to eliminate the stress of searching for a quiet place to study by providing a seamless, technology-driven booking experience.
            </p>
          </motion.div>

          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="about-icon"><FiHeart /></div>
            <h3>Our Values</h3>
            <p>
              We value accessibility, community, and academic excellence. Every feature we build is designed with students in mind, ensuring that learning environments are always within reach.
            </p>
          </motion.div>

          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="about-icon"><FiGlobe /></div>
            <h3>Our Vision</h3>
            <p>
              To become the go-to platform for study room bookings across universities worldwide, creating a global network of shared learning spaces that empower students to achieve their best.
            </p>
          </motion.div>

          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="about-icon"><FiUsers /></div>
            <h3>Our Team</h3>
            <p>
              Built by students, for students. Our team understands the challenges of finding focus in a busy campus environment, and we are committed to solving that problem with elegant technology.
            </p>
          </motion.div>
        </div>

        <div className="static-cta">
          <h2>Ready to find your perfect study spot?</h2>
          <Link to="/rooms" className="btn btn-primary btn-lg">
            Explore Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
