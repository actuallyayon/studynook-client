import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiBookOpen, FiCheckCircle } from 'react-icons/fi';
import './StaticPages.css';

const steps = [
  {
    icon: <FiSearch />,
    title: 'Browse & Search',
    desc: 'Use the search bar and amenity filters to find rooms that match your needs. Filter by Wi-Fi, whiteboards, projectors, quiet zones, and more. Each room displays capacity, floor, hourly rate, and available amenities at a glance.',
  },
  {
    icon: <FiCalendar />,
    title: 'Pick Your Time',
    desc: 'Select your preferred date and choose from available hourly time slots. Our intelligent conflict-detection system ensures no double bookings — if a slot is taken, you will be notified instantly and can pick another time.',
  },
  {
    icon: <FiBookOpen />,
    title: 'Confirm & Study',
    desc: 'Review the total cost, add an optional note for special requirements, and confirm your booking with a single click. Your reservation is secured immediately — no waiting for approval needed.',
  },
  {
    icon: <FiCheckCircle />,
    title: 'Manage Easily',
    desc: 'View all your bookings in the My Bookings dashboard. Need to change plans? Cancel upcoming reservations with one click. Room owners can also manage their listings, edit details, and track booking history.',
  },
];

const HowItWorks = () => {
  useEffect(() => {
    document.title = 'StudyNook – How It Works';
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
          <h1 className="static-hero-title">How It Works</h1>
          <p className="static-hero-desc">
            Booking a study room on StudyNook takes less than a minute. Here is the full process from start to finish.
          </p>
        </motion.div>

        <div className="hiw-timeline">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="hiw-step"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="hiw-step-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="hiw-step-icon">{step.icon}</div>
              <div className="hiw-step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
