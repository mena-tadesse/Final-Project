import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../utils/fetchEvents';
import '../App.css';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const getEvent = async () => {
      try {
        const data = await fetchEventById(id, controller.signal);
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
    return () => controller.abort();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>No event data available.</p>;

  const venue = event._embedded?.venues?.[0];
  const image = event.images?.[0]?.url;
  const price = event.priceRanges?.[0];

  return (
    <div className="event-detail-container">
      <div className="event-left">
        <h2>{event.name}</h2>
        <p><strong>Category:</strong> {event.classifications?.[0]?.segment?.name} - {event.classifications?.[0]?.genre?.name}</p>

        {/* Start and End Dates */}
        <p><strong>Start:</strong> {event.dates?.start?.localDate} {event.dates?.start?.localTime}</p>
        {event.dates?.end?.localDate && (
          <p><strong>End:</strong> {event.dates.end.localDate} {event.dates.end.localTime}</p>
        )}

        {event.dates?.status?.code && (
          <p><strong>Status:</strong> {event.dates.status.code}</p>
        )}
        <p><strong>Location:</strong> {venue?.name}, {venue?.city?.name}, {venue?.state?.name}</p>
        {event.description && <p><strong>Description:</strong> {event.description}</p>}
        {event.info && <p><strong>Info:</strong> {event.info}</p>}
        {event.additionalInfo && <p><strong>Additional Info:</strong> {event.additionalInfo}</p>}
        {event.pleaseNote && <p><strong>Note:</strong> {event.pleaseNote}</p>}

        {/* Price Range */}
        {price && (
          <p>
            <strong>Price:</strong> {price.min} - {price.max} {price.currency}
          </p>
        )}

        {event.promoter && (
          <p><strong>Promoter:</strong> {event.promoter.name}</p>
        )}

        {event.accessibility?.info && (
          <p><strong>Accessibility:</strong> {event.accessibility.info}</p>
        )}

        <a href={event.url} target="_blank" rel="noopener noreferrer" className="event-link">
          View Event on Ticketmaster
        </a>
      </div>

      <div className="event-right">
        {image && <img src={image} alt={event.name} className="event-image" />}
      </div>
    </div>
  );
};

export default EventDetail;
