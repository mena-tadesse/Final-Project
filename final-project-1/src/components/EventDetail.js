import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../utils/fetchEvents';
import '../App.css';

const EventDetail = () => {
  const { id } = useParams();  // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getEvent = async () => {
      try {
        const data = await fetchEventById(id, signal);
        if (data && data.name) {
          setEvent(data);
          setError('');
        } else {
          setError('Event not found');
        }
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError('Error fetching event');
        }
      } finally {
        setLoading(false);
      }
    };

    getEvent();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>No event data available.</p>;

  return (
    <div className="event-detail">
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {event.dates?.start?.localDate}</p>
      <p><strong>Time:</strong> {event.dates?.start?.localTime}</p>
      <p><strong>Location:</strong> {event._embedded?.venues[0]?.name}</p>
      <p><strong>Category:</strong> {event.classifications?.[0]?.segment?.name}</p>
      <p><strong>Description:</strong> {event.info || 'No description available.'}</p>
      <img src={event.images?.[0]?.url} alt={event.name} />
      <a href={event.url} target="_blank" rel="noopener noreferrer">
        View Event on Ticketmaster
      </a>
    </div>
  );
};

export default EventDetail;
