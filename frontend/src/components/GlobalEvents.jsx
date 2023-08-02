// GlobalEvents.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function GlobalEvents() {
  const [globalEvents, setGlobalEvents] = useState([]);

  useEffect(() => {
    fetchGlobalEvents();
  }, []);

  const fetchGlobalEvents = () => {
    axios
      .get('http://127.0.0.1:8000/api/events/') // Assuming this endpoint returns all events
      .then((response) => {
        setGlobalEvents(response.data);
      })
      .catch((error) => {
        console.log('Error fetching global events:', error);
      });
  };

 

  return (
    <div>
      <h2>Global Events</h2>
      <div>
        {globalEvents.length > 0 ? (
          globalEvents.map((event) => (
            <div key={event.id}>
              <h3>{event.event_name}</h3>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              {/* <button onClick={() => handleLikeUnlike(event.id)}>
                {event.is_liked ? 'Unlike' : 'Like'}
              </button> */}
              <Link to={`api/events/${event.id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default GlobalEvents;
