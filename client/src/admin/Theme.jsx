import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the theme
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Get the saved mode from localStorage or default to false
        const savedMode = localStorage.getItem('isDarkMode') === 'true';
        return savedMode;
    });

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
        localStorage.setItem('isDarkMode', !isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the Theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};
