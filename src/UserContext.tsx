import { createContext } from 'react';

type UserContextType = {
    username: string;
    setUsername: (value: string) => void;
    lobbyId: string;
    setLobbyId: (value: string) => void;
    players: string[];
    setPlayers: (value: string[]) => void;
    lobbyCreator: string;
    setLobbyCreator: (value: string) => void;
};

const UserContext = createContext<UserContextType>({
    username: '',
    setUsername: () => {},
    lobbyId: '',
    setLobbyId: () => {},
    players: [],
    setPlayers: () => {},
    lobbyCreator: '',
    setLobbyCreator: () => {},
});

export default UserContext;
