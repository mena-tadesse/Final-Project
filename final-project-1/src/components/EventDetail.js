import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../utils/fetchEvents';
import { LanguageContext } from '../LanguageContext'; // Import LanguageContext
import '../App.css';

const EventDetail = () => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext); // Access the language context
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
          setError(language === "en" ? "Event not found" : "Evento no encontrado");
        }
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(language === "en" ? "Error fetching event" : "Error al obtener el evento");
        }
      } finally {
        setLoading(false);
      }
    };

    getEvent();
    return () => controller.abort();
  }, [id, language]);

  if (loading) return <p>{language === "en" ? "Loading..." : "Cargando..."}</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>{language === "en" ? "No event data available." : "No hay datos del evento disponibles."}</p>;

  const venue = event._embedded?.venues?.[0];
  const image = event.images?.[0]?.url;
  const price = event.priceRanges?.[0];

  return (
    <div className="event-detail-container">
      <div className="event-left">
        <h2>{event.name}</h2>
        <p>
          <strong>{language === "en" ? "Category:" : "Categoría:"}</strong> {event.classifications?.[0]?.segment?.name} - {event.classifications?.[0]?.genre?.name}
        </p>

        {/* Start and End Dates */}
        <p>
          <strong>{language === "en" ? "Start:" : "Inicio:"}</strong> {event.dates?.start?.localDate} {event.dates?.start?.localTime}
        </p>
        {event.dates?.end?.localDate && (
          <p>
            <strong>{language === "en" ? "End:" : "Fin:"}</strong> {event.dates.end.localDate} {event.dates.end.localTime}
          </p>
        )}

        {event.dates?.status?.code && (
          <p>
            <strong>{language === "en" ? "Status:" : "Estado:"}</strong> {event.dates.status.code}
          </p>
        )}
        <p>
          <strong>{language === "en" ? "Location:" : "Ubicación:"}</strong> {venue?.name}, {venue?.city?.name}, {venue?.state?.name}
        </p>
        {event.description && <p><strong>{language === "en" ? "Description:" : "Descripción:"}</strong> {event.description}</p>}
        {event.info && <p><strong>{language === "en" ? "Info:" : "Información:"}</strong> {event.info}</p>}
        {event.additionalInfo && <p><strong>{language === "en" ? "Additional Info:" : "Información Adicional:"}</strong> {event.additionalInfo}</p>}
        {event.pleaseNote && <p><strong>{language === "en" ? "Note:" : "Nota:"}</strong> {event.pleaseNote}</p>}

        {/* Price Range */}
        {price && (
          <p>
            <strong>{language === "en" ? "Price:" : "Precio:"}</strong> {price.min} - {price.max} {price.currency}
          </p>
        )}

        {event.promoter && (
          <p>
            <strong>{language === "en" ? "Promoter:" : "Promotor:"}</strong> {event.promoter.name}
          </p>
        )}

        {event.accessibility?.info && (
          <p>
            <strong>{language === "en" ? "Accessibility:" : "Accesibilidad:"}</strong> {event.accessibility.info}
          </p>
        )}

        <a href={event.url} target="_blank" rel="noopener noreferrer" className="event-link">
          {language === "en" ? "View Event on Ticketmaster" : "Ver Evento en Ticketmaster"}
        </a>
      </div>

      <div className="event-right">
        {image && <img src={image} alt={event.name} className="event-image" />}
      </div>
    </div>
  );
};

export default EventDetail;