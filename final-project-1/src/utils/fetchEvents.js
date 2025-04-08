import axios from "axios";

const API_KEY = "4vXjdBsgSO87u9BRRJccz5hgfPndzI4j";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

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

        const events = response.data._embedded?.events || [];
        return events.map((event) => ({
            id: event.id,
            name: event.name,
            date: event.dates?.start?.localDate,
        }));
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};