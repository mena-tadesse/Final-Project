import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-background-image">
                <div className="explore-the-city">
                    <p>Explore the Queen City</p>
                    <Link to="/events"><button>THINGS TO DO</button></Link>
                </div>
            </div>
            <div className="spotlight-container">
                <div className="spotlight">
                    <span>
                        <Link to="/events">Fun things to do in the Queen City</Link>
                    </span>
                </div>
                <div className="spotlight">
                    <span>
                        Just Opened in Charlotte - April 2025
                    </span>
                </div>
                <div className="spotlight">
                    <span>
                        Top Concerts Coming to Charlotte This Winter
                    </span>
                </div>
                <div className="spotlight">
                    <span>
                        Black-Owned Restaurants in Charlotte
                    </span>
                </div>
            </div>
            <p className="home-container-last-p">COMING UP IN THE QUEEN CITY</p>
        </div>
        

    );
};

export default Home;