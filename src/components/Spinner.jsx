import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <p className="spinner-text">Loading...</p>
      </div>
    </div>
  );
};

export default Spinner;
