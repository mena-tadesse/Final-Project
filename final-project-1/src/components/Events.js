import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from "../LanguageContext";
import { fetchEvents } from '../utils/fetchEvents';
import { useAuth } from "../AuthContext";
import { firestore } from "../config/config";
import { doc, collection, getDocs, setDoc, deleteDoc} from "firebase/firestore";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const Events = ({ bookmarkedEvents, toggleBookmark, setBookmarkedEvents }) => {
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { language } = useContext(LanguageContext);
    const { currentUser } = useAuth(); //access the current user


    useEffect(() => {
        const loadEvents = async () => {
            const data = await fetchEvents(language);
            
                console.log("Extracted Events: ", data);
                setEvents(data);
                setFilteredEvents(data);
        };
        loadEvents();
    }, [language]); 

    //fetch bookmarked events from firestore
    useEffect(() => {
        const fetchBookmarks = async () => {
            //if currentUser is logged in
            if (currentUser) {
                //create reference to the user's bookmarks collection
                const bookmarksRef = collection(firestore, "users", currentUser.uid, "bookmarks");
                //fetch all the documents in the bookmarks collection
                const snapshot = await getDocs(bookmarksRef);
                //map through the documents and get the ids of the bookmarks
                const bookmarks = snapshot.docs.map((doc) => doc.id);
                //update the state with the bookmarked event IDS
                setBookmarkedEvents(bookmarks);
            }
        };
        fetchBookmarks();
    }, [currentUser, setBookmarkedEvents]); //fetch bookmarks when current user changes or when the bookmark state changes

    useEffect(() => {
        const filtered = events.filter((event) => {
            const eventCategory = event.classifications?.[0]?.segment?.name;
            const isFree = event.priceRanges?.[0]?.min === 0;
            const priceLabel = isFree ? "Free" : "Paid";
            let normalizedPrice = price;
            if (language === "es") {
                if (price === "Gratis") normalizedPrice = "Free";
                if (price === "De Pago") normalizedPrice = "Paid";
            }
            const matchesCategory = category ? eventCategory === category : true;
            /*const matchesPrice = price ? priceLabel === price : true;*/
            const matchesPrice = price ? priceLabel === normalizedPrice : true;
            const matchesSearch = searchTerm ? event.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            const eventDate = event.start;
            const matchesStart = startDate ? eventDate >= startDate : true;
            const matchesEnd = endDate ? eventDate <= endDate : true;

            return matchesCategory && matchesPrice && matchesSearch && matchesStart && matchesEnd;

        });

        setFilteredEvents(filtered);
    }, [category, price, searchTerm, startDate, endDate, events, language]);

    const categories = [
        { value: "Music", label: language === "en" ? "Music" : "Conciertos" },
        { value: "Sports", label: language === "en" ? "Sports" : "Deportes" },
        { value: "Arts & Theatre", label: language === "en" ? "Arts & Theatre" : "Arte y Teatro" },
        { value: "Film", label: language === "en" ? "Film" : "Peliculas" },
        { value: "Miscellaneous", label: language === "en" ? "Miscellaneous" : "Misceláneos" },
    ];

    return (
        <div className="events-container">
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
                    id="searchBar"
                    type="text"
                    name="search"
                    placeholder={language === "en" ? "Search" : "Buscar"}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }
                }
                />
                
                <label for="start-date-css" id="start-date-label-css">{language === "en" ? "Start Date" : "Fecha de Inicio"}</label>
                <input id="start-date-css" type="date" name="startDate" value={startDate} onChange={(e) => {setStartDate(e.target.value);}} />
                
                <label for="end-date-css" id="end-date-label-css">{language === "en" ? "End Date" : "Fecha de Fin"}</label>
                <input id="end-date-css" type="date" name="endDate" value={endDate} onChange={(e) => {setEndDate(e.target.value);}} />
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
                    {
                    categories.map((item) => (
                        <label key={item.value}>
                            <input
                                type="radio"
                                name="category"
                                value={item.value}
                                checked={category === item.value}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            {item.label}
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

                <span
                    className={`bookmark-icon ${bookmarkedEvents.includes(event.id) ? 'bookmarked' : ''}`}
                    onClick={() => toggleBookmark(event)}
                >
                    {bookmarkedEvents.includes(event.id) ? <FaBookmark /> : <FaRegBookmark />}
                </span>
                    <img src={event.images?.[0]?.url} alt={event.name} />
                    <div className='event-content'> 
                        <h3>{event.name}</h3>
                        <p>{new Date(`${event.start}`).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                        </p>
                        <p>{event.classifications?.[0]?.segment?.name}</p>
                        <Link to={`/events/${event.id}`}>View Details</Link>
                        </div>
                    </div>
                    ))
                ) : (
                    <p id="no-events-listed">No events found for the selected filters.</p>
                )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Events;