import React, { useContext } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { LanguageContext } from "../LanguageContext"; // Import LanguageContext
import esLocale from '@fullcalendar/core/locales/es'; // Import Spanish locale
import enLocale from '@fullcalendar/core/locales/en-gb'; // Import English locale

const Calendar = () => {
    const { language } = useContext(LanguageContext); // Access the language context

    return (
        <div className="full-calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locale={language === "en" ? enLocale : esLocale} // Dynamically set the locale
                events={[
                    { title: language === "en" ? 'Event 1' : 'Evento 1', date: '2025-04-01' },
                    { title: language === "en" ? 'Event 2' : 'Evento 2', date: '2025-04-15' },
                ]}
            />
        </div>
    );
};

export default Calendar;