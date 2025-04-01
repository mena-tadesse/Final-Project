import React from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'Event 1', date: '2025-04-01' },
                    { title: 'Event 2', date: '2025-04-15' },
                ]} 
            />
        </div>
    );
};

export default Calendar;