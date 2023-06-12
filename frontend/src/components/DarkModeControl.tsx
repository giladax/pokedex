import React, { useEffect, useState } from 'react';

const getStoredDarkModePreference = (): boolean | null => {
    const storedPreference = localStorage.getItem('darkMode');
    return storedPreference === null ? null : storedPreference === 'true';
}

const getSystemDarkModePreference = (): boolean => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const DarkModeControl: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(getStoredDarkModePreference() ?? getSystemDarkModePreference());

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('darkMode', String(isDarkMode));
    }, [isDarkMode]);

    return (
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
            Toggle Dark Mode
        </button>
    );
};

export default DarkModeControl;
