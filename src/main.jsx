import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './index.css'
import theme from "./Theme.tsx";

import Home from "./Pages/Home.tsx";

import { useState } from 'react';
import UserContext from "./UserContext";

export default function App() {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [lobbyId, setLobbyId] = useState(localStorage.getItem('lobbyId') || '');

    const setUsernameAndStore = (newUsername) => {
        setUsername(newUsername);
        localStorage.setItem('username', newUsername);
    };

    const setLobbyIdAndStore = (newLobbyId) => {
        setLobbyId(newLobbyId);
        localStorage.setItem('lobbyId', newLobbyId);
    };

    return (
        <UserContext.Provider value={{ username, setUsername: setUsernameAndStore, lobbyId, setLobbyId: setLobbyIdAndStore }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </UserContext.Provider>
    );
}

// @ts-expect-error root is not null
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <App />
    </>
);
