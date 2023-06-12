import { useEffect, useState } from "react";

const DarkModeControl = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(darkModeMediaQuery.matches);
        darkModeMediaQuery.addEventListener('change', (event) => {
            setDarkMode(event.matches);
        });
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
        }
        else {
            document.documentElement.classList.add('dark');
        }
        setDarkMode(!darkMode);
    };

    return (
        <div>
            <button onClick={toggleDarkMode} className="p-2 m-2 border rounded">
                Toggle Dark Mode
            </button>
        </div>
    );
}

export default DarkModeControl;