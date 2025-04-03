import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en"); // Default language is English

    // Load language preference from localStorage on initialization
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    // Save language preference to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    // Toggle language between English and Spanish
    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "en" ? "es" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};