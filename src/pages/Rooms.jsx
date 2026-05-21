import { useEffect, useState, useCallback } from 'react';
import { FiSearch, FiFilter, FiX, FiChevronLeft, FiChevronRight, FiZap } from 'react-icons/fi';
import axiosInstance from '../hooks/useAxios';
import RoomCard from '../components/RoomCard';
import Spinner from '../components/Spinner';
import './Rooms.css';

const AMENITY_OPTIONS = [
  'Whiteboard',
  'Projector',
  'Wi-Fi',
  'Power Outlets',
  'Quiet Zone',
  'Air Conditioning',
];

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [floor, setFloor] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRooms, setTotalRooms] = useState(0);

  useEffect(() => {
    document.title = 'StudyNook – Available Rooms';
  }, []);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedAmenities.length > 0) params.append('amenities', selectedAmenities.join(','));
      if (minRate) params.append('minRate', minRate);
      if (maxRate) params.append('maxRate', maxRate);
      if (floor) params.append('floor', floor);
      params.append('page', currentPage);
      params.append('limit', 9);

      const res = await axiosInstance.get(`/api/rooms?${params.toString()}`);
      if (res.data.success) {
        setRooms(res.data.rooms);
        setTotalPages(res.data.totalPages);
        setTotalRooms(res.data.totalRooms);
      }
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  }, [search, selectedAmenities, minRate, maxRate, floor, currentPage]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchRooms();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchRooms]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedAmenities, minRate, maxRate, floor]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedAmenities([]);
    setMinRate('');
    setMaxRate('');
    setFloor('');
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasFilters = search || selectedAmenities.length > 0 || minRate || maxRate || floor;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = maxVisible;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - maxVisible + 1;
        end = totalPages - 1;
      }

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="rooms-page">
      {/* Premium Rooms Banner */}
      <section className="rooms-banner">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid" />
          <div className="hero-dots" />
        </div>
        <div className="container rooms-banner-content">
          <span className="hero-badge">
            <FiZap /> The Smarter Way to Study
          </span>
          <h1 className="hero-title">
            Available <span className="hero-highlight">Study Rooms</span>
          </h1>
          <p className="hero-description">
            Find and book the perfect study space for your next session.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Search & Filter Bar */}
        <div className="search-bar">
          <div className="search-input-wrap">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search rooms by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>
                <FiX />
              </button>
            )}
          </div>

          <button
            className={`btn btn-secondary filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
            {selectedAmenities.length > 0 && (
              <span className="filter-count">{selectedAmenities.length}</span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-section">
              <h3 className="filter-title">Amenities</h3>
              <div className="form-checkbox-group">
                {AMENITY_OPTIONS.map((amenity) => (
                  <label
                    key={amenity}
                    className={`checkbox-label ${selectedAmenities.includes(amenity) ? 'checked' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <div className="filter-section" style={{ marginBottom: 0 }}>
                <h3 className="filter-title">Floor</h3>
                <input
                  type="text"
                  className="search-input"
                  placeholder="e.g. Floor 2"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  style={{ padding: '0.6rem 1rem' }}
                />
              </div>

              <div className="filter-section" style={{ marginBottom: 0 }}>
                <h3 className="filter-title">Hourly Rate Range ($)</h3>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="number"
                    className="search-input"
                    placeholder="Min"
                    value={minRate}
                    onChange={(e) => setMinRate(e.target.value)}
                    style={{ padding: '0.6rem 1rem' }}
                  />
                  <span style={{ color: 'var(--text-muted)' }}>to</span>
                  <input
                    type="number"
                    className="search-input"
                    placeholder="Max"
                    value={maxRate}
                    onChange={(e) => setMaxRate(e.target.value)}
                    style={{ padding: '0.6rem 1rem' }}
                  />
                </div>
              </div>
            </div>

            {hasFilters && (
              <button className="btn btn-sm btn-outline clear-filters" style={{ marginTop: '1.5rem' }} onClick={clearFilters}>
                <FiX /> Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        {!loading && totalRooms > 0 && (
          <p className="results-count">
            Showing {(currentPage - 1) * 9 + 1}–{Math.min(currentPage * 9, totalRooms)} of {totalRooms} rooms
          </p>
        )}

        {/* Results */}
        {loading ? (
          <Spinner />
        ) : rooms.length > 0 ? (
          <>
            <div className="rooms-grid">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn pagination-nav"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft /> Prev
                </button>

                <div className="pagination-pages">
                  {getPageNumbers().map((page, idx) =>
                    page === '...' ? (
                      <span key={`dots-${idx}`} className="pagination-dots">...</span>
                    ) : (
                      <button
                        key={page}
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  className="pagination-btn pagination-nav"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <FiChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><FiSearch /></div>
            <h3 className="empty-state-title">No rooms found</h3>
            <p className="empty-state-text">
              {hasFilters
                ? 'Try adjusting your search or filters'
                : 'No study rooms are available right now. Check back soon!'}
            </p>
            {hasFilters && (
              <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={clearFilters}>
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
