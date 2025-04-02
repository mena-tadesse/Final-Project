import React from 'react';
import { Link } from "react-router-dom";


const Bookmarks = () => {
    const bookmarks = [
        { id: 1, title: "Event 1", description: "Description for Event 1" },
        { id: 2, title: "Event 2", description: "Description for Event 2" },
        { id: 3, title: "Event 3", description: "Description for Event 3" },
    ];

    return (
        <div className="account-home-container">
            <div className="account-navbar">
            <h2>My Account</h2>
                <nav>
                <ul>
                    <li>
                    <Link to="/account" className="active">
                        Profile
                    </Link>
                    </li>
                    <li>
                    <Link to="/bookmarks">Bookmarks</Link>
                    </li>
                </ul>
                </nav>
                <button className="delete-account-button">
                Delete Account
                </button>
            </div>
            <div className="bookmarks-container">
                <h3>Bookmarks</h3>
                <div className="bookmarks-box">
                {bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="bookmark-item">
                        <h2>{bookmark.title}</h2>
                        <p>{bookmark.description}</p>
                    </div>
                ))}
            </div>
        </div> 
        </div>
        
    );
};

export default Bookmarks;
