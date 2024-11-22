import React, { useEffect, useState } from "react";
import "./add.css";
import axios from "axios";
import Helmet from "react-helmet";

export default function Add() {
  const [eventName, setEventName] = useState("");
  const [eventData, setEventData] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Fetch events from the server
  const fetchtodo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/eventdata");
      setEvents(response.data);
    } catch {
      console.log("Error fetching events");
    }
  };

  // Add a new event
  const addtodo = async () => {
    try {
      await axios.post("http://localhost:5000/api/eventdata", {
        eventName,
        eventData,
      });
      await fetchtodo(); // Fetch the latest data after adding a new event
      console.log("Event added");
    } catch {
      console.log("Error adding event");
    }
  };

  // Delete selected events
  const deletetodo = async () => {
    try {
      await axios.post("http://localhost:5000/api/eventdata/delete", {
        ids: selectedEvents,
      });
      // Fetch updated list after deletion
      await fetchtodo();
      setSelectedEvents([]); // Clear the selection
      console.log("Selected events deleted");
    } catch {
      console.log("Error deleting events");
    }
  };

  // Handle form submission
  const handleEvent = async (e) => {
    e.preventDefault();
    if (!eventName || !eventData) {
      window.alert("Please fill out both fields");
      return;
    }
    try {
      await addtodo();
      setEventName("");
      setEventData("");
      console.log("Event submitted:", { eventName, eventData });
    } catch {
      console.log("Error submitting event");
    }
  };

  // Toggle event selection for deletion
  const toggleEventSelection = (eventId) => {
    setSelectedEvents((prevSelected) =>
      prevSelected.includes(eventId)
        ? prevSelected.filter((id) => id !== eventId)
        : [...prevSelected, eventId]
    );
  };

  useEffect(() => {
    fetchtodo();
  }, []);

  return (
    <div className="add-container">
      <Helmet>
        <title>Todo</title>
      </Helmet>
      <h1 className="title">T O D O</h1>
      <div className="form-container">
        <form onSubmit={handleEvent} className="form">
          <h2>Add Event</h2>
          <label htmlFor="event-name" style={{ textAlign: "left" }}>
            Title:
          </label>
          <input
            type="text"
            id="event-name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
          />
          <label htmlFor="event-data" style={{ textAlign: "left" }}>
            Data:
          </label>
          <textarea
            id="event-data"
            value={eventData}
            onChange={(e) => setEventData(e.target.value)}
            placeholder="Enter event details"
            rows={5}
          ></textarea>
          <div className="form-buttons">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button
              type="button"
              className="reset-button"
              onClick={() => {
                setEventName("");
                setEventData("");
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <h2 className="list-title">Event List</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">
            <input
              type="checkbox"
              checked={selectedEvents.includes(event._id)}
              onChange={() => toggleEventSelection(event._id)}
            />
            <strong>{event.eventName}:</strong> {event.eventData}
          </li>
        ))}
      </ul>
      {selectedEvents.length > 0 && (
        <button className="delete-button" onClick={deletetodo}>
          Delete Selected
        </button>
      )}
    </div>
  );
}
