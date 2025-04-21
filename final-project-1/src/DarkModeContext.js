import React, { createContext, useState, useEffect } from "react";

// Create the context
export const DarkModeContext = createContext();

// Create the provider component
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        // Load dark mode state from local storage on initialization
        return localStorage.getItem("darkMode") === "false";
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