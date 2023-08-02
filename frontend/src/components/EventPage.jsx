// EventPage.js

import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function EventPage({ match }) {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the event details from the backend API
      axios.get(`http://127.0.0.1:8000/api/events/`).then((response) => {
        setEvent(response.data);
      });
    }
  }, [id]);

  const handleLikeUnlike = () => {
    // Toggle the is_liked status and update the backend
    const updatedEvent = { ...event, is_liked: !event.is_liked };
    axios.put(`http://127.0.0.1:8000/api/events/`, updatedEvent).then((response) => {
      setEvent(response.data);
      console.log(response.data);
    });
  };
  return (
    <div>
      {event ? (
        <div>
          <h2>{event.event_name}</h2>
          <p>Date: {event.date}</p>
          <p>Time: {event.time}</p>
          <p>Location: {event.location}</p>
          <button onClick={handleLikeUnlike}>
            {event.is_liked ? 'Unlike' : 'Like'}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EventPage;
