import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './index.css'
import theme from "./Theme.tsx";

import Header from "./header.tsx";

import Home from "./Pages/Home.tsx";
import NotFound from "./Pages/NotFound.tsx";
import Rules from "./Pages/Rules.tsx";
import Game from "./Pages/Game.tsx";

import { useState } from 'react';
import UserContext from "./UserContext";

export default function App() {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [lobbyId, setLobbyId] = useState(localStorage.getItem('lobbyId') || '');
    const [players, setPlayers] = useState(() => {
        try {
            const storedPlayers = localStorage.getItem('players');
            return storedPlayers ? JSON.parse(storedPlayers) : [];
        } catch {
            return [];
        }
    });
    const [lobbyCreator, setLobbyCreator] = useState(localStorage.getItem('lobbyCreator') || '');

    const setUsernameAndStore = (newUsername) => {
        setUsername(newUsername);
        localStorage.setItem('username', newUsername);
    };

    const setLobbyIdAndStore = (newLobbyId) => {
        setLobbyId(newLobbyId);
        localStorage.setItem('lobbyId', newLobbyId);
    };

    const setPlayersAndStore = (newPlayers) => {
        setPlayers(newPlayers);
        localStorage.setItem('players', JSON.stringify(newPlayers));
    }

    const setLobbyCreatorAndStore = (newLobbyCreator) => {
        setLobbyCreator(newLobbyCreator);
        localStorage.setItem('lobbyCreator', newLobbyCreator);
    }

    return (
        <UserContext.Provider value={{
                username, setUsername: setUsernameAndStore,
                lobbyId, setLobbyId: setLobbyIdAndStore,
                players, setPlayers: setPlayersAndStore,
                lobbyCreator, setLobbyCreator: setLobbyCreatorAndStore,
        }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/rules" element={<Rules />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="*" element={<NotFound />} />
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
        <Header />
        <App />
    </>
);
