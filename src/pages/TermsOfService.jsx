import { useEffect } from 'react';
import { motion } from 'framer-motion';
import './StaticPages.css';

const TermsOfService = () => {
  useEffect(() => {
    document.title = 'StudyNook – Terms of Service';
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
          <h1 className="static-hero-title">Terms of Service</h1>
          <p className="static-hero-desc">Last updated: May 21, 2026</p>
        </motion.div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using StudyNook, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use the platform. These terms apply to all users, including room owners and those making bookings.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. User Accounts</h2>
            <p>
              You must provide accurate, current, and complete information when creating your account. You are responsible for maintaining the confidentiality of your login credentials. Each person may only create one account. Sharing accounts is not permitted.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Room Listings</h2>
            <p>
              Room owners are responsible for ensuring that their listings are accurate, including room descriptions, images, amenities, capacity, and hourly rates. Misleading or fraudulent listings will be removed. StudyNook reserves the right to remove any listing that violates these terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Bookings</h2>
            <p>Regarding bookings on the platform:</p>
            <ul>
              <li>Bookings are confirmed immediately upon submission</li>
              <li>Our system automatically prevents double-booking through time-conflict detection</li>
              <li>Users may cancel upcoming bookings at any time before the scheduled date</li>
              <li>Repeated no-shows or last-minute cancellations may result in account restrictions</li>
              <li>Booking costs are calculated based on the hourly rate set by the room owner</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Prohibited Conduct</h2>
            <p>Users agree not to:</p>
            <ul>
              <li>Use the platform for any unlawful purpose</li>
              <li>Post false, misleading, or offensive content</li>
              <li>Attempt to gain unauthorized access to other accounts</li>
              <li>Interfere with the proper functioning of the platform</li>
              <li>Scrape, copy, or redistribute platform content without permission</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Intellectual Property</h2>
            <p>
              All content, design, and functionality of StudyNook are the exclusive property of StudyNook and its licensors. The platform name, logo, and branding are protected. Users retain ownership of content they submit but grant StudyNook a license to display it on the platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Limitation of Liability</h2>
            <p>
              StudyNook provides the platform on an &quot;as is&quot; basis. We do not guarantee the availability or condition of any study room. StudyNook is not liable for any disputes between room owners and users, or for any damages arising from the use of the platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Contact</h2>
            <p>
              For questions regarding these terms, please contact us at <strong>support@studynook.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
