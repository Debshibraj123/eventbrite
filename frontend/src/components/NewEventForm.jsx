// NewEventForm.js

import React, { useState } from 'react';
import axios from 'axios';

const NewEventForm = () => {
  const [eventData, setEventData] = useState({
    event_name: '',
    date: '',
    time: '',
    location: '',
    image: null,
  });

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setEventData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a FormData object to send the image file along with other data
    const formData = new FormData();
    formData.append('event_name', eventData.event_name);
    formData.append('date', eventData.date);
    formData.append('time', eventData.time);
    formData.append('location', eventData.location);
    formData.append('image', eventData.image);
    console.log('Form Data:', Object.fromEntries(formData));
    axios
      .post('http://127.0.0.1:8000/api/events/', formData)
      .then((response) => {
        console.log('New event added:', response.data);
      })
      .catch((error) => {
        console.error('Error adding new event:', error);
      });
  };

  return (
    <div>
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            name="event_name"
            value={eventData.event_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="image" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default NewEventForm;
