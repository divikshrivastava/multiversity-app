import React from 'react';
import './EventSelector.css'; // Importing CSS for styles

interface EventSelectorProps {
  events: { id: string; name: string; whatIf: string; imageUrl: string }[];
  onEventChange: (id: string) => void;
  selectedEventId: string;
}

const EventSelector: React.FC<EventSelectorProps> = ({ events, onEventChange, selectedEventId }) => {
    return (
      <div className="timeline-container">
        {events.map((event) => (
          <div
            key={event.id}
            className={`timeline-entry ${event.id === selectedEventId ? 'selected' : ''}`} // Apply 'selected' class conditionally
            onClick={() => onEventChange(event.id)}
          >
            <img src={event.imageUrl} alt={event.name} className="timeline-image" />
            <div className="timeline-text">
            <h3>{event.name+" ("+event.id+")"}</h3>
              <p>{event.whatIf}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default EventSelector;
