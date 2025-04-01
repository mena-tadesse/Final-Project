import React from 'react';

const Bookmarks = () => {
    const bookmarks = [
        { id: 1, title: "Event 1", description: "Description for Event 1" },
        { id: 2, title: "Event 2", description: "Description for Event 2" },
        { id: 3, title: "Event 3", description: "Description for Event 3" },
    ];

    return (
        <div className="bookmarks-container">
            <h1>Bookmarks</h1>
            <div className="bookmarks-box">
                {bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="bookmark-item">
                        <h2>{bookmark.title}</h2>
                        <p>{bookmark.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookmarks;
