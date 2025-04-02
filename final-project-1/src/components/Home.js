import React from 'react';

const Home = () => {
    return (
        <div className="english-light-home">
            <main className="main-content">
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
                            <div className="article-image" style={{ backgroundImage: 'url(Placeholder.png)' }}>
                                <h3 className="article-title">35 Things to Do this Winter in Charlotte</h3>
                            </div>
                        </article>
                        <article className="article-card">
                            <div className="article-image" style={{ backgroundImage: 'url(Placeholder.png)' }}>
                                <h3 className="article-title">Just Opened in Charlotte - January 2025</h3>
                            </div>
                        </article>
                        <article className="article-card">
                            <div className="article-image" style={{ backgroundImage: 'url(Placeholder.png)' }}>
                                <h3 className="article-title">Top Concerts Coming to Charlotte This Winter</h3>
                            </div>
                        </article>
                        <article className="article-card">
                            <div className="article-image" style={{ backgroundImage: 'url(Placeholder.png)' }}>
                                <h3 className="article-title">Black-Owned Restaurants in Charlotte</h3>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;