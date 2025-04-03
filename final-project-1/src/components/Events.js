import React, { useContext, useState } from 'react';
import { LanguageContext } from "../LanguageContext";

const Events = () => {
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const { language } = useContext(LanguageContext);

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
                />
                <div className="container"></div>
                <label>{language === "en" ? "Start Date" : "Fecha de Inicio"}</label>
                <input type="text" name="startDate" />
                <div className="container"></div>
                <label>{language === "en" ? "End Date" : "Fecha de Fin"}</label>
                <input type="text" name="endDate" />
            </div>
            <br />
            <br />
            <br />

            <label id="category-label">
                {language === "en" ? "Category" : "Categoría"}
            </label>
            <br />
            <br />
            <div className="category-filter">
                {[
                    language === "en" ? "Concerts" : "Conciertos",
                    language === "en" ? "Sports" : "Deportes",
                    language === "en" ? "Art & Theater" : "Arte y Teatro",
                    language === "en" ? "Festival" : "Festival",
                    language === "en" ? "Adult Only" : "Solo Adultos",
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
    );
};

export default Events;