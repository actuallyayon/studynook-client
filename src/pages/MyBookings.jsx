import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiX, FiDollarSign, FiAlertTriangle } from 'react-icons/fi';
import axiosInstance from '../hooks/useAxios';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    document.title = 'StudyNook – My Bookings';
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await axiosInstance.get('/api/bookings/my-bookings');
      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const res = await axiosInstance.patch(`/api/bookings/${cancelId}/cancel`);
      if (res.data.success) {
        toast.success('Booking cancelled');
        setBookings(
          bookings.map((b) =>
            b._id === cancelId ? { ...b, status: 'cancelled' } : b
          )
        );
        setCancelId(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Cancel failed');
    } finally {
      setCancelling(false);
    }
  };

  const isFutureBooking = (dateStr) => {
    const bookingDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  if (loading) return <Spinner />;

  return (
    <div className="my-bookings-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Bookings</h1>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            View and manage all your room reservations
          </p>
        </div>

        {bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                className="booking-card card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="booking-image">
                  <img
                    src={booking.room?.image || 'https://placehold.co/300x200?text=Room'}
                    alt={booking.room?.name || 'Room'}
                  />
                </div>
                <div className="booking-body">
                  <div className="booking-header">
                    <h3 className="booking-title">{booking.room?.name || 'Deleted Room'}</h3>
                    <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-danger'}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="booking-details">
                    <div className="booking-detail">
                      <FiCalendar />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className="booking-detail">
                      <FiClock />
                      <span>{formatTime(booking.startTime)} – {formatTime(booking.endTime)}</span>
                    </div>
                    <div className="booking-detail">
                      <FiDollarSign />
                      <span>${booking.totalCost}</span>
                    </div>
                  </div>

                  {booking.specialNote && (
                    <p className="booking-note">Note: {booking.specialNote}</p>
                  )}

                  {booking.status === 'confirmed' && isFutureBooking(booking.date) && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => setCancelId(booking._id)}
                    >
                      <FiX /> Cancel Booking
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><FiCalendar /></div>
            <h3 className="empty-state-title">You have no bookings yet</h3>
            <p className="empty-state-text">Browse available rooms and make your first reservation!</p>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {cancelId && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCancelId(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '420px', textAlign: 'center' }}
            >
              <div className="delete-confirm-icon"><FiAlertTriangle size={48} /></div>
              <h2 className="modal-title" style={{ marginBottom: '0.5rem' }}>Cancel Booking?</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Are you sure you want to cancel this reservation?
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setCancelId(null)}>Keep Booking</button>
                <button className="btn btn-danger" onClick={handleCancel} disabled={cancelling}>
                  {cancelling ? 'Cancelling...' : 'Cancel Booking'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookings;
