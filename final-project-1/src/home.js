import React from 'react';

const home = () => {
  return (
   <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Charlotte - Explore the Queen City</title>
    <link rel="stylesheet" href="globals.css" />
    <link rel="stylesheet" href="styleguide.css" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="english-light-home">
      <main class="main-content">
        <header class="header">
          <nav class="english-light-mode">
            <button class="nav-item" aria-label="Toggle Dark Mode">
              <div class="nav-item-content">
                <div class="dark-mode-icon">
                  <img class="icon" src="img/group.svg" alt="Dark Mode Icon" />
                </div>
                <span class="nav-text">Dark Mode</span>
              </div>
            </button>
            <a href="#" class="nav-item">
              <div class="nav-item-content">
                <img class="icon account-icon" src="img/account-icon.svg" alt="Account Icon" />
                <span class="nav-text">Account</span>
              </div>
            </a>
            <a href="#" class="nav-item">
              <div class="nav-item-content">
                <img class="icon events-icon" src="img/events-icon.svg" alt="Events Icon" />
                <span class="nav-text">Events</span>
              </div>
            </a>
            <a href="#" class="nav-item home-icon">
              <img src="charlotte.png" alt="Home" />
            </a>
            <button class="nav-item" aria-label="Change Language to Spanish">
              <div class="nav-item-content">
                <img class="icon language-icon" src="img/laguage-icon.svg" alt="Language Icon" />
                <span class="nav-text">Español</span>
              </div>
            </button>
            <a href="#" class="nav-item">
              <div class="nav-item-content">
                <img class="icon calendar-icon" src="img/calendar-icon.svg" alt="Calendar Icon" />
                <span class="nav-text">Calendar</span>
              </div>
            </a>
            <a href="#" class="nav-item">
              <div class="nav-item-content">
                <img class="icon logout-icon" src="img/logout-icon.svg" alt="Login Icon" />
                <span class="nav-text">Login</span>
              </div>
            </a>
          </nav>
        </header>
        <section class="hero">
          <img class="hero-image" src="img/uptown-CLT-scaled-1.png" alt="Uptown Charlotte Skyline" />
          <div class="activity-box">
            <h1 class="activity-title">EXPLORE THE QUEEN CITY</h1>
            <a href="#" class="activity-cta">THINGS TO DO</a>
          </div>
        </section>
        <section class="articles">
          <h2 class="section-title">COMING UP IN THE QUEEN CITY</h2>
          <div class="article-grid">
            <article class="article-card">
              <div class="article-image" style="background-image: url(Placeholder.png)">
                <h3 class="article-title">35 Things to Do this Winter in Charlotte</h3>
              </div>
            </article>
            <article class="article-card">
              <div class="article-image" style="background-image: url(Placeholder.png)">
                <h3 class="article-title">Just Opened in Charlotte - January 2025</h3>
              </div>
            </article>
            <article class="article-card">
              <div class="article-image" style="background-image: url(Placeholder.png)">
                <h3 class="article-title">Top Concerts Coming to Charlotte This Winter</h3>
              </div>
            </article>
            <article class="article-card">
              <div class="article-image" style="background-image: url(Placeholder.png)">
                <h3 class="article-title">Black-Owned Restaurants in Charlotte</h3>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  </body>
  );
};

export default home;
