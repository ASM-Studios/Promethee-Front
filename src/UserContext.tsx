import { createContext } from 'react';

type UserContextType = {
    username: string;
    setUsername: (value: string) => void;
    lobbyId: string;
    setLobbyId: (value: string) => void;
};

const UserContext = createContext<UserContextType>({
    username: '',
    setUsername: () => {},
    lobbyId: '',
    setLobbyId: () => {},
});

export default UserContext;
