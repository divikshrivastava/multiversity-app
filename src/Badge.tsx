import React from 'react';
import './Badge.css'; // Import the CSS for styling

const Badge: React.FC = () => {
  const handleClick = () => {
    window.open("https://www.netflix.com/watch/80223958?source=35", "_blank");
  };

  return (
    <div className="badge" onClick={handleClick}>
      <div className="badge-content">
        <img src="/netflix.png" alt="Love, Death & Robots" className="badge-image" />
        <span className="badge-text">Watch <br />Love, Death & Robots</span>
      </div>
    </div>
  );
};

export default Badge;
