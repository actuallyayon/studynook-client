import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiImage, FiMapPin, FiUsers, FiDollarSign } from 'react-icons/fi';
import axiosInstance from '../hooks/useAxios';
import toast from 'react-hot-toast';
import './AddRoom.css';

const AMENITY_OPTIONS = [
  'Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning',
];

const AddRoom = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    floor: '',
    capacity: '',
    hourlyRate: '',
    amenities: [],
  });

  useEffect(() => {
    document.title = 'StudyNook – Add Room';
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axiosInstance.post('/api/rooms', {
        ...formData,
        capacity: Number(formData.capacity),
        hourlyRate: Number(formData.hourlyRate),
      });
      if (res.data.success) {
        toast.success('Room added successfully!');
        navigate('/my-listings');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add room');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-room-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Add a Study Room</h1>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            List your room to help fellow students find a quiet place to study
          </p>
        </div>

        <div className="add-room-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="room-name">Room Name</label>
              <input
                id="room-name"
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g., Quiet Corner Room A3"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="room-desc">Description</label>
              <textarea
                id="room-desc"
                name="description"
                className="form-textarea"
                placeholder="Describe the room, its atmosphere, and what makes it great for studying..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="room-image">
                <FiImage style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                Image URL
              </label>
              <input
                id="room-image"
                type="url"
                name="image"
                className="form-input"
                placeholder="https://example.com/room-image.jpg"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row-3">
              <div className="form-group">
                <label className="form-label" htmlFor="room-floor">
                  <FiMapPin style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Floor
                </label>
                <input
                  id="room-floor"
                  type="text"
                  name="floor"
                  className="form-input"
                  placeholder="e.g., 3rd Floor"
                  value={formData.floor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="room-capacity">
                  <FiUsers style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Capacity
                </label>
                <input
                  id="room-capacity"
                  type="number"
                  name="capacity"
                  className="form-input"
                  placeholder="e.g., 4"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="room-rate">
                  <FiDollarSign style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Hourly Rate ($)
                </label>
                <input
                  id="room-rate"
                  type="number"
                  name="hourlyRate"
                  className="form-input"
                  placeholder="e.g., 5"
                  value={formData.hourlyRate}
                  onChange={handleChange}
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
                    className={`checkbox-label ${formData.amenities.includes(amenity) ? 'checked' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={submitting}
            >
              {submitting ? 'Adding Room...' : 'Add Room'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
