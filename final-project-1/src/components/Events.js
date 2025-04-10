import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from "../LanguageContext";
import { fetchEvents } from '../utils/fetchEvents';

const Events = () => {
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
    const { language } = useContext(LanguageContext);


    useEffect(() => {
        const loadEvents = async () => {
            const data = await fetchEvents(language);
            setEvents(data);
            setFilteredEvents(data);
        };
        loadEvents();
    }, [category, language]); 


    useEffect(() => {
        const filtered = events.filter((event) => {
            const eventCategory = event.classifications?.[0]?.segment?.name;
            const isFree = event.priceRanges?.[0]?.min === 0;
            const priceLabel = isFree ? "Free" : "Paid";

            const matchesCategory = category ? eventCategory === category : true;
            const matchesPrice = price ? priceLabel === price : true;
            const matchesSearch = searchTerm ? event.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            const eventDate = event.dates?.start?.localDate;
            const matchesStart = startDate ? eventDate >= startDate : true;
            const matchesEnd = endDate ? eventDate <= endDate : true;

            return matchesCategory && matchesPrice && matchesSearch && matchesStart && matchesEnd;
        });

        setFilteredEvents(filtered);
    }, [category, price, searchTerm, startDate, endDate, events]);

    const toggleBookmark = (eventId) => {
        setBookmarkedEvents((prev) =>
          prev.includes(eventId)
            ? prev.filter((id) => id !== eventId)
            : [...prev, eventId]
        );
      };

    return (
        <div>
            <h1 className="event-header">
                {language === "en" ? "Upcoming Events" : "Próximos Eventos"}
            </h1>
            <p className="event-header">
                {language === "en"
                    ? "Charlottesgotalot.com is not the primary provider of tickets for any events listed."
                    : "Charlottesgotalot.com no es el proveedor principal de boletos para los eventos enumerados."}
            </p>

            <div className="container">
                <input
                    type="text"
                    name="search"
                    placeholder={language === "en" ? "Search" : "Buscar"}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }
                }
                />
                
                <label>{language === "en" ? "Start Date" : "Fecha de Inicio"}</label>
                <input type="date" name="startDate" value={startDate} onChange={(e) => {setStartDate(e.target.value);}} />
                <div className="container"></div>
                <label>{language === "en" ? "End Date" : "Fecha de Fin"}</label>
                <input type="date" name="endDate" value={endDate} onChange={(e) => {setEndDate(e.target.value);}} />
            <br />
            <br />
            <br />
        </div>
    <div className="containers">

<div className= "filters-section">

            <label id="category-label">
                {language === "en" ? "Category" : "Categoría"}
            </label>
            <br />
            <br />
            <div className="category-filter">
                {[
                    language === "en" ? "Music" : "Conciertos",
                    language === "en" ? "Sports" : "Deportes",
                    language === "en" ? "Arts & Theatre" : "Arte y Teatro",
                    language === "en" ? "Film" : "Peliculas",
                    language === "en" ? "Miscellaneous" : "Misceláneos",
                ].map((item) => (
                    <label key={item}>
                        <input
                            type="radio"
                            name="category"
                            value={item}
                            checked={category === item}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        {item}
                    </label>
                ))}
            </div>
            <br />
            <label id="price-label">
                {language === "en" ? "Prices" : "Precios"}
            </label>
            <br />
            <br />
            <div className="price-filter">
                {[
                    language === "en" ? "Free" : "Gratis",
                    language === "en" ? "Paid" : "De Pago",
                ].map((item) => (
                    <label key={item}>
                        <input
                            type="radio"
                            name="price"
                            value={item}
                            checked={price === item}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {item}
                    </label>
                ))}
            </div>
</div>

            <div className="events-display">
                <div className= "events-grid">

                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                 <div key={event.id} className="event-card">
                    <span className={`bookmark-icon ${bookmarkedEvents.includes(event.id) ? 'bookmarked' : ''}`}
                                        onClick={() => toggleBookmark(event.id)}
                    >
                        ★
                    </span>
                    <img src={event.images?.[0]?.url} alt={event.name} />
                        <h3>{event.name}</h3>
                        <p>{event.dates?.start?.localDate}</p>
                        <p>{event.classifications?.[0]?.segment?.name}</p>
                        <Link to={`/events/${event.id}`}>View Details</Link>
                    </div>
                    ))
                ) : (
                    <p>No events found for the selected filters.</p>
                )}
                </div>
             </div>
        </div>

        </div>
    );
};

export default Events;