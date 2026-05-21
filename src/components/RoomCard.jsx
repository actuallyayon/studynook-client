import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiMapPin, FiDollarSign } from 'react-icons/fi';
import './RoomCard.css';

const RoomCard = ({ room }) => {
  const { _id, name, description, image, floor, capacity, hourlyRate, amenities } = room;

  const truncatedDesc =
    description.length > 100 ? description.substring(0, 100) + '...' : description;

  const displayAmenities = amenities?.slice(0, 3) || [];
  const extraCount = amenities ? amenities.length - 3 : 0;

  return (
    <motion.div
      className="room-card card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="room-card-image">
        <img src={image} alt={name} loading="lazy" />
        <div className="room-card-rate">
          <FiDollarSign />
          <span>{hourlyRate}/hr</span>
        </div>
      </div>

      <div className="room-card-body">
        <h3 className="room-card-title">{name}</h3>
        <p className="room-card-desc">{truncatedDesc}</p>

        <div className="room-card-meta">
          <span className="room-meta-item">
            <FiMapPin /> {floor}
          </span>
          <span className="room-meta-item">
            <FiUsers /> {capacity} {capacity > 1 ? 'people' : 'person'}
          </span>
        </div>

        {displayAmenities.length > 0 && (
          <div className="room-card-amenities">
            {displayAmenities.map((amenity) => (
              <span className="chip" key={amenity}>
                {amenity}
              </span>
            ))}
            {extraCount > 0 && <span className="chip chip-more">+{extraCount} more</span>}
          </div>
        )}

        <Link to={`/rooms/${_id}`} className="btn btn-primary btn-sm room-card-btn">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;
