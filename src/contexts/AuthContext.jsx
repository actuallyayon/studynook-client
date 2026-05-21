import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../hooks/useAxios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (cookie-based)
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get('/api/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await axiosInstance.post('/api/auth/login', { email, password });
    if (res.data.success) {
      setUser(res.data.user);
    }
    return res.data;
  };

  const register = async (name, email, password, photoURL) => {
    const res = await axiosInstance.post('/api/auth/register', {
      name,
      email,
      password,
      photoURL,
    });
    if (res.data.success) {
      setUser(res.data.user);
    }
    return res.data;
  };

  const googleLogin = async () => {
    return new Promise((resolve, reject) => {
      if (!window.google || !window.google.accounts) {
        return reject(new Error('Google Identity Services SDK is not loaded. Please try again.'));
      }

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();
      if (!clientId) {
        return reject(new Error('Google Client ID is not configured.'));
      }

      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'profile email',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              return reject(new Error(tokenResponse.error_description || 'Google login failed'));
            }
            try {
              // Fetch user info using the access token
              const userInfoRes = await fetch(
                `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
              );
              const userInfo = await userInfoRes.json();
              const { name, email, picture, sub } = userInfo;

              // Send to backend
              const res = await axiosInstance.post('/api/auth/google', {
                name,
                email,
                photoURL: picture,
                googleId: sub,
              });

              if (res.data.success) {
                setUser(res.data.user);
                resolve(res.data);
              } else {
                reject(new Error('Failed to authenticate with backend'));
              }
            } catch (err) {
              reject(err);
            }
          },
        });
        client.requestAccessToken();
      } catch (err) {
        reject(err);
      }
    });
  };

  const logout = async () => {
    await axiosInstance.post('/api/auth/logout');
    setUser(null);
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
