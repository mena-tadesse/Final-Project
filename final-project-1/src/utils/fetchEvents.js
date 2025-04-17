import axios from "axios";

const API_KEY = "4vXjdBsgSO87u9BRRJccz5hgfPndzI4j";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";
const EVENT_DETAIL_URL = "https://app.ticketmaster.com/discovery/v2/events";

/**
 * Fetch a list of events
 */
export const fetchEvents = async (language) => {
    try {
        const locale = "en";
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                locale: locale,
                city: "Charlotte",
                size: 20,
            },
        });

        console.log("API Response:", response.data);
        const events = response.data._embedded?.events || [];
        return events.map((event) => ({
            id: event.id,
            name: event.name,
            start: event.dates?.start?.localDate,
            end: event.dates?.end?.localDate || event.dates?.start?.localDate,
            images: event.images || [],
            location: event._embedded?.venues?.[0]?.name, 
            classifications: event.classifications || [],
            priceRanges: event.priceRanges || [],
        }));
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};

/**
 * Fetch a single event by ID
 */
export const fetchEventById = async (id, signal) => {
    try {
        const response = await axios.get(`${EVENT_DETAIL_URL}/${id}.json`, {
            params: { apikey: API_KEY },
            signal,
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
        } else {
            console.error("Error fetching event by ID:", error);
        }
        throw error;
    }
};
