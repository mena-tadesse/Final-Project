import React, { createContext, useState, useEffect } from "react";

// Create the context
export const DarkModeContext = createContext();

// Create the provider component
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
        // Load light mode state from local storage on initialization
    });

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    // Apply dark mode class to the body and save to local storage
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};