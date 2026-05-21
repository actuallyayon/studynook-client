import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiImage, FiLock, FiSave, FiShield } from 'react-icons/fi';
import axiosInstance from '../hooks/useAxios';
import toast from 'react-hot-toast';
import './MyProfile.css';

const MyProfile = () => {
  const { user, setUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    photoURL: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    document.title = 'StudyNook – My Profile';
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axiosInstance.put('/api/auth/profile', {
        name: profileData.name,
        photoURL: profileData.photoURL,
      });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (!/[A-Z]/.test(passwordData.newPassword)) {
      toast.error('New password must have at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(passwordData.newPassword)) {
      toast.error('New password must have at least one lowercase letter');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setSavingPassword(true);
    try {
      const res = await axiosInstance.put('/api/auth/profile', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (res.data.success) {
        toast.success('Password updated successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Profile</h1>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            Manage your account information and security settings
          </p>
        </div>

        <div className="profile-layout">
          {/* Profile Card */}
          <motion.div
            className="profile-preview card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="profile-preview-avatar-wrap">
              <img
                src={profileData.photoURL || `https://ui-avatars.com/api/?name=${profileData.name}&background=6C5CE7&color=fff&size=200`}
                alt={profileData.name}
                className="profile-preview-avatar"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="profile-preview-name">{profileData.name}</h2>
            <p className="profile-preview-email">{profileData.email}</p>
            <div className="profile-preview-badge">
              <FiShield /> Verified Member
            </div>
          </motion.div>

          {/* Forms */}
          <div className="profile-forms">
            {/* Profile Info */}
            <motion.form
              className="profile-form card"
              onSubmit={handleProfileSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="profile-form-title">
                <FiUser /> Personal Information
              </h2>

              <div className="form-group">
                <label className="form-label" htmlFor="prof-name">
                  <FiUser style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Full Name
                </label>
                <input
                  id="prof-name"
                  type="text"
                  name="name"
                  className="form-input"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prof-email">
                  <FiMail style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Email Address
                </label>
                <input
                  id="prof-email"
                  type="email"
                  className="form-input"
                  value={profileData.email}
                  disabled
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                />
                <p className="form-hint">Email cannot be changed</p>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prof-photo">
                  <FiImage style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Photo URL
                </label>
                <input
                  id="prof-photo"
                  type="url"
                  name="photoURL"
                  className="form-input"
                  placeholder="https://example.com/your-photo.jpg"
                  value={profileData.photoURL}
                  onChange={handleProfileChange}
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={saving}>
                <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </motion.form>

            {/* Change Password */}
            <motion.form
              className="profile-form card"
              onSubmit={handlePasswordSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="profile-form-title">
                <FiLock /> Change Password
              </h2>

              <div className="form-group">
                <label className="form-label" htmlFor="current-pw">
                  Current Password
                </label>
                <input
                  id="current-pw"
                  type="password"
                  name="currentPassword"
                  className="form-input"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-pw">
                  New Password
                </label>
                <input
                  id="new-pw"
                  type="password"
                  name="newPassword"
                  className="form-input"
                  placeholder="Min 6 chars, upper + lowercase"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirm-pw">
                  Confirm New Password
                </label>
                <input
                  id="confirm-pw"
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Re-enter new password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-accent" disabled={savingPassword}>
                <FiLock /> {savingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
