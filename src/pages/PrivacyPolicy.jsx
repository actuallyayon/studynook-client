import { useEffect } from 'react';
import { motion } from 'framer-motion';
import './StaticPages.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'StudyNook – Privacy Policy';
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
          <h1 className="static-hero-title">Privacy Policy</h1>
          <p className="static-hero-desc">Last updated: May 21, 2026</p>
        </motion.div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Information We Collect</h2>
            <p>
              When you create an account on StudyNook, we collect your name, email address, and profile photo URL. If you sign in via Google OAuth, we receive your display name, email, and profile picture from Google. We also collect booking data including dates, times, and room selections to provide our service.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Create and manage your user account</li>
              <li>Process and manage room bookings</li>
              <li>Display your profile to room owners when you make a booking</li>
              <li>Send important notifications about your bookings</li>
              <li>Improve our platform and user experience</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Data Security</h2>
            <p>
              Your password is hashed using bcrypt before storage and is never stored in plain text. Authentication tokens are stored in HTTP-only cookies that cannot be accessed by client-side JavaScript, protecting against XSS attacks. All data transmission is encrypted via HTTPS.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Cookies</h2>
            <p>
              We use HTTP-only cookies solely for authentication purposes. These cookies contain a JSON Web Token (JWT) that identifies your session. We do not use tracking cookies or third-party advertising cookies.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Third-Party Services</h2>
            <p>
              We use Firebase Authentication for Google OAuth sign-in. When you choose to sign in with Google, your authentication is handled by Google and Firebase according to their respective privacy policies. We only receive basic profile information necessary for account creation.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Data Retention</h2>
            <p>
              Your account data is retained as long as your account is active. Booking history is maintained for record-keeping purposes. You may request deletion of your account and associated data by contacting us at support@studynook.com.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Contact Us</h2>
            <p>
              If you have questions about this privacy policy or your personal data, please reach out to us at <strong>support@studynook.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
