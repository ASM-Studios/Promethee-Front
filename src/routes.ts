import axios from 'axios';

// @ts-ignore
const edt = import.meta.env.VITE_ENDPOINT as string;
// @ts-ignore
const port = import.meta.env.VITE_PORT as string;

const endpoint = `http://${edt}:${port}`;

const ping = endpoint + '/ping';
const enterLobbyById = endpoint + '/enter_lobby_by_id';
const playCard = endpoint + '/play_card';
const updateByUsername = endpoint + '/update_by_username';
const draw = endpoint + '/draw';
const question = endpoint + '/question';

const instance = axios.create({
    baseURL: endpoint,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

export {
    instance,
    endpoint,
    ping,
    enterLobbyById,
    playCard,
    updateByUsername,
    draw,
    question,
};
