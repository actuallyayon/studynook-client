import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FiUser, FiMail, FiLock, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axiosInstance from '../hooks/useAxios';

const Register = () => {
  const { register, googleLogin, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'StudyNook – Register';
    if (user) navigate('/', { replace: true });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validatePassword = (password) => {
    const errs = [];
    if (password.length < 6) errs.push('At least 6 characters');
    if (!/[A-Z]/.test(password)) errs.push('At least one uppercase letter');
    if (!/[a-z]/.test(password)) errs.push('At least one lowercase letter');
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setErrors({ password: passwordErrors.join(', ') });
      return;
    }

    setSubmitting(true);
    try {
      // Call registration API directly (do not set global user state)
      const res = await axiosInstance.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        photoURL: formData.photoURL,
      });

      if (res.data.success) {
        // Clear any auto-login cookies set by the server
        try {
          await axiosInstance.post('/api/auth/logout');
        } catch (err) {
          // Ignore logout error
        }
        toast.success('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success('Welcome to StudyNook!');
      navigate('/', { replace: true });
    } catch (error) {
      toast.error('Google sign-up failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join StudyNook and start booking rooms</p>

        <button className="btn btn-google" style={{ width: '100%' }} onClick={handleGoogle} type="button">
          <FcGoogle size={20} /> Continue with Google
        </button>

        <div className="auth-divider">or</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">
              <FiUser style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              Full Name
            </label>
            <input
              id="reg-name"
              type="text"
              name="name"
              className="form-input"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">
              <FiMail style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              name="email"
              className="form-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-photo">
              <FiImage style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              Photo URL
            </label>
            <input
              id="reg-photo"
              type="url"
              name="photoURL"
              className="form-input"
              placeholder="https://example.com/your-photo.jpg"
              value={formData.photoURL}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">
              <FiLock style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Min 6 chars, upper + lowercase"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
