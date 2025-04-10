import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const EventDetail = () => {

    const { id } = useParams();  // Get the event ID from the URL params
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const API_Key = "gXhBcSySDgDb11q1Ex4uazo5CZhTo8tx";  // Your API key from Ticketmaster

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_Key}`, 
          { signal }
        );
        const data = await response.json();

        if (data && data.name) {
          setEvent(data);
          setError('');
        } else {
          setError('Event not found');
        }
        setLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Error fetching event');
        }
        setLoading(false);
      }
    };

    fetchEventData();

    return () => {
      controller.abort();
    };
  }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;
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
      <a href={event.url} target="_blank" rel="noopener noreferrer">View Event on Ticketmaster</a>
    </div>
        
    );
}

export default EventDetail;