import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
import './NotFound.css';

const NotFound = () => {
  useEffect(() => {
    document.title = 'StudyNook – Page Not Found';
  }, []);

  return (
    <div className="not-found-page">
      <motion.div
        className="not-found-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <FiHome /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
