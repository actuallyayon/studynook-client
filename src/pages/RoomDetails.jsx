import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMapPin, FiUsers, FiDollarSign, FiCalendar, FiClock,
  FiEdit2, FiTrash2, FiBookmark, FiX, FiCheck
} from 'react-icons/fi';
import axiosInstance from '../hooks/useAxios';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import './RoomDetails.css';

const AMENITY_OPTIONS = [
  'Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning',
];

const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => i + 8); // 8 to 20

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking modal
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    specialNote: '',
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  // Edit modal
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Delete modal
  const [showDelete, setShowDelete] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/rooms/${id}`);
      if (res.data.success) {
        setRoom(res.data.room);
        document.title = `StudyNook – ${res.data.room.name}`;
      }
    } catch (error) {
      toast.error('Room not found');
      navigate('/rooms');
    } finally {
      setLoading(false);
    }
  };

  const isOwner = user && room && room.owner?._id === user._id;

  // Today's date in YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Calculate total cost
  const totalCost =
    bookingData.startTime && bookingData.endTime && room
      ? (Number(bookingData.endTime) - Number(bookingData.startTime)) * room.hourlyRate
      : 0;

  // Available end times
  const availableEndTimes = bookingData.startTime
    ? TIME_SLOTS.filter((t) => t > Number(bookingData.startTime))
    : [];

  // Booking handler
  const handleBook = async (e) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.startTime || !bookingData.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    setBookingSubmitting(true);
    try {
      const res = await axiosInstance.post('/api/bookings', {
        roomId: id,
        date: bookingData.date,
        startTime: Number(bookingData.startTime),
        endTime: Number(bookingData.endTime),
        specialNote: bookingData.specialNote,
      });
      if (res.data.success) {
        toast.success('Room booked successfully!');
        setShowBooking(false);
        setBookingData({ date: '', startTime: '', endTime: '', specialNote: '' });
        fetchRoom(); // Refresh booking count
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBookingSubmitting(false);
    }
  };

  // Edit handler
  const openEdit = () => {
    setEditData({
      name: room.name,
      description: room.description,
      image: room.image,
      floor: room.floor,
      capacity: room.capacity,
      hourlyRate: room.hourlyRate,
      amenities: room.amenities || [],
    });
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const toggleEditAmenity = (amenity) => {
    setEditData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditSubmitting(true);
    try {
      const res = await axiosInstance.put(`/api/rooms/${id}`, editData);
      if (res.data.success) {
        toast.success('Room updated successfully');
        setShowEdit(false);
        fetchRoom();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setEditSubmitting(false);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    setDeleteSubmitting(true);
    try {
      const res = await axiosInstance.delete(`/api/rooms/${id}`);
      if (res.data.success) {
        toast.success('Room deleted successfully');
        navigate('/my-listings');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    } finally {
      setDeleteSubmitting(false);
    }
  };

  if (loading) return <Spinner />;
  if (!room) return null;

  return (
    <div className="room-details-page">
      <div className="container">
        <motion.div
          className="room-details-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Image */}
          <div className="room-details-image">
            <img src={room.image} alt={room.name} />
            <div className="room-details-badge">
              <FiBookmark /> {room.bookingCount} {room.bookingCount === 1 ? 'booking' : 'bookings'}
            </div>
          </div>

          {/* Info */}
          <div className="room-details-info">
            <div className="room-details-header">
              <div>
                <h1 className="room-details-title">{room.name}</h1>
                <p className="room-details-owner">
                  Listed by <strong>{room.owner?.name || 'Unknown'}</strong>
                </p>
              </div>
              <div className="room-details-price">
                <span className="price-amount">${room.hourlyRate}</span>
                <span className="price-unit">/hour</span>
              </div>
            </div>

            <p className="room-details-desc">{room.description}</p>

            <div className="room-details-meta">
              <div className="detail-meta-item">
                <FiMapPin />
                <span>{room.floor}</span>
              </div>
              <div className="detail-meta-item">
                <FiUsers />
                <span>{room.capacity} {room.capacity > 1 ? 'people' : 'person'}</span>
              </div>
            </div>

            {room.amenities?.length > 0 && (
              <div className="room-details-amenities">
                <h3>Amenities</h3>
                <div className="amenity-list">
                  {room.amenities.map((amenity) => (
                    <span className="chip" key={amenity}>
                      <FiCheck style={{ fontSize: '0.7rem' }} /> {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="room-details-actions">
              {user ? (
                !isOwner ? (
                  <button className="btn btn-primary btn-lg" onClick={() => setShowBooking(true)}>
                    <FiCalendar /> Book Now
                  </button>
                ) : (
                  <>
                    <button className="btn btn-accent" onClick={openEdit}>
                      <FiEdit2 /> Edit Room
                    </button>
                    <button className="btn btn-danger" onClick={() => setShowDelete(true)}>
                      <FiTrash2 /> Delete Room
                    </button>
                  </>
                )
              ) : (
                <Link to="/login" state={{ from: { pathname: `/rooms/${id}` } }} className="btn btn-primary btn-lg">
                  Login to Book
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">Book {room.name}</h2>
                <button className="modal-close" onClick={() => setShowBooking(false)}>
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleBook}>
                <div className="form-group">
                  <label className="form-label">
                    <FiCalendar style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    min={today}
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">
                      <FiClock style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                      Start Time
                    </label>
                    <select
                      className="form-select"
                      value={bookingData.startTime}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, startTime: e.target.value, endTime: '' })
                      }
                      required
                    >
                      <option value="">Select</option>
                      {TIME_SLOTS.slice(0, -1).map((t) => (
                        <option key={t} value={t}>
                          {t.toString().padStart(2, '0')}:00
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FiClock style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                      End Time
                    </label>
                    <select
                      className="form-select"
                      value={bookingData.endTime}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, endTime: e.target.value })
                      }
                      required
                      disabled={!bookingData.startTime}
                    >
                      <option value="">Select</option>
                      {availableEndTimes.map((t) => (
                        <option key={t} value={t}>
                          {t.toString().padStart(2, '0')}:00
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {totalCost > 0 && (
                  <div className="booking-cost">
                    <span>Total Cost</span>
                    <span className="cost-amount">${totalCost}</span>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Special Note (optional)</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Any special requirements..."
                    value={bookingData.specialNote}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, specialNote: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                  disabled={bookingSubmitting}
                >
                  {bookingSubmitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEdit && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEdit(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '560px' }}
            >
              <div className="modal-header">
                <h2 className="modal-title">Edit Room</h2>
                <button className="modal-close" onClick={() => setShowEdit(false)}>
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label className="form-label">Room Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={editData.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-textarea"
                    value={editData.description}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    className="form-input"
                    value={editData.image}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Floor</label>
                    <input
                      type="text"
                      name="floor"
                      className="form-input"
                      value={editData.floor}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      className="form-input"
                      value={editData.capacity}
                      onChange={handleEditChange}
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rate ($/hr)</label>
                    <input
                      type="number"
                      name="hourlyRate"
                      className="form-input"
                      value={editData.hourlyRate}
                      onChange={handleEditChange}
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Amenities</label>
                  <div className="form-checkbox-group">
                    {AMENITY_OPTIONS.map((amenity) => (
                      <label
                        key={amenity}
                        className={`checkbox-label ${editData.amenities?.includes(amenity) ? 'checked' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={editData.amenities?.includes(amenity) || false}
                          onChange={() => toggleEditAmenity(amenity)}
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-accent btn-lg"
                  style={{ width: '100%' }}
                  disabled={editSubmitting}
                >
                  {editSubmitting ? 'Updating...' : 'Update Room'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDelete(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '420px', textAlign: 'center' }}
            >
              <div className="delete-confirm-icon"><FiTrash2 size={48} /></div>
              <h2 className="modal-title" style={{ marginBottom: '0.5rem' }}>Delete Room?</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                This action cannot be undone. All bookings for this room will also be removed.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDelete(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={deleteSubmitting}
                >
                  {deleteSubmitting ? 'Deleting...' : 'Delete Room'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomDetails;
