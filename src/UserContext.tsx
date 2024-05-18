import { createContext } from 'react';

type UserContextType = {
    username: string;
    setUsername: (value: string) => void;
    lobbyId: string;
    setLobbyId: (value: string) => void;
    players: { [key: string]: number }; // Updated players type
    setPlayers: (value: { [key: string]: number }) => void; // Updated setPlayers type
    lobbyCreator: string;
    setLobbyCreator: (value: string) => void;
    cards: string[];
    setCards: (value: string[]) => void;
};

const UserContext = createContext<UserContextType>({
    username: '',
    setUsername: () => {},
    lobbyId: '',
    setLobbyId: () => {},
    players: {},
    setPlayers: () => {},
    lobbyCreator: '',
    setLobbyCreator: () => {},
    cards: [],
    setCards: () => {},
});

export default UserContext;
