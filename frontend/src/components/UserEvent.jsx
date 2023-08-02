import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserEvents() {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = () => {
    axios
      .get('http://127.0.0.1:8000/api/events/') // Assuming this endpoint returns user-specific events
      .then((response) => {
        console.log(response.data);
        setUserEvents(response.data);
      })
      .catch((error) => {
        console.log('Error fetching user events:', error);
      });
  };

//   const handleLikeUnlike = (eventId) => {
//     // Toggle the is_liked status and update the backend
//     const updatedEvents = userEvents.map((event) => {
//       if (event.id === eventId) {
//         return { ...event, is_liked: !event.is_liked };
//       }
//       return event;
//     });

//     setUserEvents(updatedEvents);

//     axios
//       .put(`/api/events/${eventId}/`, { is_liked: !isLiked })
//       .then((response) => {
//         // Optional: Handle success response if needed
//       })
//       .catch((error) => {
//         // If the update fails, revert the change to is_liked
//         const revertedEvents = userEvents.map((event) => {
//           if (event.id === eventId) {
//             return { ...event, is_liked: !event.is_liked };
//           }
//           return event;
//         });
//         setUserEvents(revertedEvents);
//         console.log('Error updating event like status:', error);
//       });
//   };

  return (
    <div>
      <h2>Your Events</h2>
      <div>
        {userEvents.length > 0 ? (
          userEvents.map((event) => (
            <div key={event.id}>
              <h3>{event.event_name}</h3>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              {/* <button onClick={() => handleLikeUnlike(event.id)}>
                {event.is_liked ? 'Unlike' : 'Like'}
              </button> */}
              <Link to={`/events/${event.id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default UserEvents;
