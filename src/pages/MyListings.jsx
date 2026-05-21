import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiX, FiHome } from 'react-icons/fi';
import axiosInstance from '../hooks/useAxios';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import './MyListings.css';

const MyListings = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    document.title = 'StudyNook – My Listings';
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const res = await axiosInstance.get('/api/rooms/my-listings');
      if (res.data.success) {
        setRooms(res.data.rooms);
      }
    } catch (error) {
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await axiosInstance.delete(`/api/rooms/${deleteId}`);
      if (res.data.success) {
        toast.success('Room deleted successfully');
        setRooms(rooms.filter((r) => r._id !== deleteId));
        setDeleteId(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="my-listings-page">
      <div className="container">
        <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <h1 className="page-title" style={{ textAlign: 'left' }}>My Listings</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Manage the rooms you&apos;ve listed on StudyNook
            </p>
          </div>
          <Link to="/add-room" className="btn btn-primary">
            <FiPlus /> Add Room
          </Link>
        </div>

        {rooms.length > 0 ? (
          <div className="listings-grid">
            {rooms.map((room) => (
              <motion.div
                key={room._id}
                className="listing-card card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="listing-image">
                  <img src={room.image} alt={room.name} />
                </div>
                <div className="listing-body">
                  <h3 className="listing-title">{room.name}</h3>
                  <div className="listing-meta">
                    <span>{room.floor}</span>
                    <span>•</span>
                    <span>{room.capacity} people</span>
                    <span>•</span>
                    <span>${room.hourlyRate}/hr</span>
                  </div>
                  <div className="listing-stats">
                    <span className="badge badge-success">{room.bookingCount} bookings</span>
                  </div>
                  <div className="listing-actions">
                    <Link to={`/rooms/${room._id}`} className="btn btn-secondary btn-sm">
                      <FiEye /> View
                    </Link>
                    <button className="btn btn-accent btn-sm" onClick={() => navigate(`/rooms/${room._id}`)}>
                      <FiEdit2 /> Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(room._id)}>
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><FiHome /></div>
            <h3 className="empty-state-title">No listings yet</h3>
            <p className="empty-state-text">Start by adding your first study room!</p>
            <Link to="/add-room" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              <FiPlus /> Add Your First Room
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteId(null)}
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
                This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyListings;
