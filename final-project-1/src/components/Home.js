import React from 'react';
import { Link } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";


const Home = () => {
    const { language } = React.useContext(LanguageContext);
    return (
        <div className="home-container">
        <div className="home-background-image">
            <div className="explore-the-city">
                <p>{language === "en" ? "Explore the Queen City" : "Explora la Ciudad Reina"}</p>
                <Link to="/events">
                    <button>{language === "en" ? "THINGS TO DO" : "COSAS QUE HACER"}</button>
                </Link>
            </div>
        </div>
        <div className="spotlight-container">
            <div className="spotlight">
                <span>
                    <Link to="/events">
                        {language === "en" ? "Fun things to do in the Queen City" : "Cosas divertidas para hacer en la Ciudad Reina"}
                    </Link>
                </span>
            </div>
            <div className="spotlight">
                <span>
                    {language === "en" ? "Just Opened in Charlotte - April 2025" : "Recién Abierto en Charlotte - Abril 2025"}
                </span>
            </div>
            <div className="spotlight">
                <span>
                    {language === "en" ? "Top Concerts Coming to Charlotte This Winter" : "Principales Conciertos en Charlotte Este Invierno"}
                </span>
            </div>
            <div className="spotlight">
                <span>
                    {language === "en" ? "Black-Owned Restaurants in Charlotte" : "Restaurantes de Propietarios Negros en Charlotte"}
                </span>
            </div>
        </div>
        <p className="home-container-last-p">
            {language === "en" ? "COMING UP IN THE QUEEN CITY" : "PRÓXIMAMENTE EN LA CIUDAD REINA"}
        </p>
    </div>
    );
};

export default Home;