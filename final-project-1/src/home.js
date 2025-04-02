import React from "react";
import "./globals.css";
import "./styleguide.css";
import "./style.css";

function Home() {
    return (
        <div className="english-light-home">
            <main className="main-content">
                <header className="header">
                    <nav className="english-light-mode">
                        <button className="nav-item" aria-label="Toggle Dark Mode">
                            <div className="nav-item-content">
                                <div className="dark-mode-icon">
                                    <img className="icon" src="img/group.svg" alt="Dark Mode Icon" />
                                </div>
                                <span className="nav-text">Dark Mode</span>
                            </div>
                        </button>
                        <a href="#" className="nav-item">
                            <div className="nav-item-content">
                                <img className="icon account-icon" src="img/account-icon.svg" alt="Account Icon" />
                                <span className="nav-text">Account</span>
                            </div>
                        </a>
                        <a href="#" className="nav-item">
                            <div className="nav-item-content">
                                <img className="icon events-icon" src="img/events-icon.svg" alt="Events Icon" />
                                <span className="nav-text">Events</span>
                            </div>
                        </a>
                        <a href="#" className="nav-item home-icon">
                            <img src="charlotte.png" alt="Home" />
                        </a>
                        <button className="nav-item" aria-label="Change Language to Spanish">
                            <div className="nav-item-content">
                                <img className="icon language-icon" src="img/laguage-icon.svg" alt="Language Icon" />
                                <span className="nav-text">Español</span>
                            </div>
                        </button>
                        <a href="#" className="nav-item">
                            <div className="nav-item-content">
                                <img className="icon calendar-icon" src="img/calendar-icon.svg" alt="Calendar Icon" />
                                <span className="nav-text">Calendar</span>
                            </div>
                        </a>
                        <a href="#" className="nav-item">
                            <div className="nav-item-content">
                                <img className="icon logout-icon" src="img/logout-icon.svg" alt="Login Icon" />
                                <span className="nav-text">Login</span>
                            </div>
                        </a>
                    </nav>
                </header>
                <section className="hero">
                    <img className="hero-image" src="img/uptown-CLT-scaled-1.png" alt="Uptown Charlotte Skyline" />
                    <div className="activity-box">
                        <h1 className="activity-title">EXPLORE THE QUEEN CITY</h1>
                        <a href="#" className="activity-cta">THINGS TO DO</a>
                    </div>
                </section>
                <section className="articles">
                    <h2 className="section-title">COMING UP IN THE QUEEN CITY</h2>
                    <div className="article-grid">
                        <article className="article-card">
                            <div className="article-image" style={{ backgroundImage: "url(Placeholder.png)" }}>
                                <h3 className="article-title">35 Things to Do this Winter in Charlotte</h3>
                            </div>
                        </article>
                        <article className="article-card">
                            <div className="article-image" style={{ backgroundImage: "url(Placeholder.png)" }}>
                                <h3 className="article-title">Just Opened in Charlotte - January 2025</h3>
                            </div>
                        </article>
                        <article className="article-card">
                            <div className="article-image" style={{ backgroundImage: "url(Placeholder.png)" }}>
                                <h3 className="article-title">Top Concerts Coming to Charlotte This Winter</h3>
                            </div>
                        </article>
                        <article className="article-card">
                            <div className="article-image" style={{ backgroundImage: "url(Placeholder.png)" }}>
                                <h3 className="article-title">Black-Owned Restaurants in Charlotte</h3>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;</article></div></section>
