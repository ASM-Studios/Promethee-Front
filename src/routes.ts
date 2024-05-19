import axios from 'axios';

// @ts-ignore
const edt = import.meta.env.VITE_ENDPOINT as string;
// @ts-ignore
const port = import.meta.env.VITE_PORT as string;

const endpoint = `http://${edt}:${port}`;

const ping = endpoint + '/ping';
const enterLobbyById = endpoint + '/enter_lobby_by_id';
const playCard = endpoint + '/play_card';
const update = endpoint + '/update';
const draw = endpoint + '/draw';
const questionUrl = endpoint + '/question';
const endOfTurn = endpoint + '/end_of_turn';

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
    update,
    draw,
    questionUrl,
    endOfTurn,
};
