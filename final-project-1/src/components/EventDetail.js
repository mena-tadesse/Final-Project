import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../utils/fetchEvents';
import { LanguageContext } from '../LanguageContext'; // Import LanguageContext
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import '../App.css';
import { useAuth } from "../AuthContext"; // Import useAuth
import { firestore } from "../config/config";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"; // Import Firestore functions

const EventDetail = ({ bookmarkedEvents = [], toggleBookmark: parentToggleBookmark = () => {} }) => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext); // Access the language context
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  // Check if the event is bookmarked
  useEffect(() => {
    const checkBookmark = async () => {
      if (currentUser) {
        const bookmarkRef = doc(firestore, "users", currentUser.uid, "bookmarks", id);
        const bookmarkDoc = await getDoc(bookmarkRef);
        setIsBookmarked(bookmarkDoc.exists());
      }
    };
    checkBookmark();
  }, [currentUser, id]);

  // Toggle bookmark status
  const handleToggleBookmark = async () => {
    if (!currentUser) {
      alert(language === "en" ? "Please login to bookmark events." : "Por favor, inicie sesión para marcar eventos.");
      return;
    }
    const bookmarkRef = doc(firestore, "users", currentUser.uid, "bookmarks", id);
    if (isBookmarked) {
      // Remove bookmark
      await deleteDoc(bookmarkRef);
      setIsBookmarked(false);
    } else {
      // Add bookmark
      const eventData = {
        id: event.id,
        name: event.name || "Unknown Event Name",
        image: event.images?.[0]?.url || "",
        dates: {
          start: event.dates?.start?.localDate || "Unknown Start Date",
          end: event.dates?.end?.localDate || event.dates?.start?.localDate || "Unknown End Date",
        },
        location: event._embedded?.venues?.[0]?.name || "Unknown Location",
      };

      await setDoc(bookmarkRef, eventData);
      setIsBookmarked(true);
    }
  };

  if (loading) return <p>{language === "en" ? "Loading..." : "Cargando..."}</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>{language === "en" ? "No event data available." : "No hay datos del evento disponibles."}</p>;

  const venue = event._embedded?.venues?.[0];
  const image = event.images?.[0]?.url;
  const price = event.priceRanges?.[0];

  return (
    <div className="event-detail-wrapper">
    <div className="event-detail-container">
      <div className="event-left">

        <p>
          <strong>{language === "en" ? "Category:" : "Categoría:"}</strong> {event.classifications?.[0]?.segment?.name} - {event.classifications?.[0]?.genre?.name}
        </p>

      <div className="eventDetail-title">
        <div 
          className={`bookmark-icon ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={handleToggleBookmark}
           >
          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </div>
      <h2>{event.name}</h2>
      </div>

        {/* Start and End Dates */}
        <div>
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
</div>
<div className="eventDetail-location">
        <p>
          <strong>{language === "en" ? "Location:" : "Ubicación:"}</strong> {venue?.name}, {venue?.city?.name}, {venue?.state?.name}
        </p>
        <div className="eventDetail-description">
        {event.description && <p><strong>{language === "en" ? "Description:" : "Descripción:"}</strong> {event.description}</p>}
        {event.info && <p><strong>{language === "en" ? "Info:" : "Información:"}</strong> {event.info}</p>}
        {event.additionalInfo && <p><strong>{language === "en" ? "Additional Info:" : "Información Adicional:"}</strong> {event.additionalInfo}</p>}
        {event.pleaseNote && <p><strong>{language === "en" ? "Note:" : "Nota:"}</strong> {event.pleaseNote}</p>}
        </div>
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
    </div>
      <div className="event-right">
        {image && <img src={image} alt={event.name} className="event-image" />}
      </div>
    </div>
    </div>
  );
};

export default EventDetail;