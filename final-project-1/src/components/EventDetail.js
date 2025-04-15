import React, { useContext, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from "react-router-dom"; 
import { LanguageContext } from "../LanguageContext"; 
import esLocale from '@fullcalendar/core/locales/es'; 
import enLocale from '@fullcalendar/core/locales/en-gb'; 
import { fetchEvents } from "../utils/fetchEvents"; 

const Calendar = () => {
    const { language } = useContext(LanguageContext);
    const [events, setEvents] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const loadEvents = async () => {
            const fetchedEvents = await fetchEvents(language);
            const calendarEvents = fetchedEvents.map((event) => ({
                id: event.id, 
                title: event.name, 
                start: event.start,
                end: event.end,
            }));
            setEvents(calendarEvents); 
        };
        loadEvents();
    }, [language]); 
    const handleEventClick = (info) => {
        const eventId = info.event.id;
        navigate(`/events/${eventId}`); 
    };

    return (
        <div className="full-calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locale={language === "en" ? enLocale : esLocale}
                events={events} 
                eventClick={handleEventClick} 
            />
        </div>
    );
};

export default Calendar;