// @ts-ignore
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, TextField, CardContent } from '@mui/material';
import { toast, ToastContainer } from "react-toastify";
// @ts-ignore
import background from '../assets/HomeBackground.png';
import UserContext from "../UserContext";

const Actions = () => {
    const { username, lobbyId, setUsername, setLobbyId } = useContext(UserContext);

    const launchGame = () => {
        if (username === '') {
            toast.error('Veuillez renseigner un pseudo');
            return;
        }
        if (lobbyId === '') {
            toast.error('Veuillez renseigner un identifiant de partie');
            return;
        }
        window.location.href = `/game/${lobbyId}`;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px', border: '2px solid white' }}>
            <CardContent>
                <Box sx={{ padding: 2, margin: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                        <h1 style={{ color: 'white' }}>🔥 Promethée</h1>
                    </Box>
                    <Box sx={{ paddingBottom: 2 }}>
                        <TextField
                            label="pseudo"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            InputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }}
                        />
                    </Box>
                    <Box sx={{ paddingBottom: 2 }}>
                        <TextField
                            label="Identifiant de partie"
                            value={lobbyId}
                            onChange={(e) => {
                                const newValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
                                setLobbyId(newValue);
                            }}
                            fullWidth
                            InputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }}
                        />
                    </Box>
                    <Box sx={{ paddingTop: 2 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={launchGame}
                            disabled={ username === '' || lobbyId === '' || lobbyId.length != 5 }
                            style={{ color: 'white' }}
                        >Lancer la partie</Button>
                    </Box>
                    <Box sx={{ paddingTop: 2, display: 'flex', justifyContent: 'center' }}>
                        <Link to="/rules" style={{ color: 'white', textDecoration: 'underline'}}>comment jouer ?</Link>
                    </Box>
                </Box>
            </CardContent>
            </Box>
        </Box>
    )
};

Actions.propTypes = {
    username: PropTypes.string.isRequired,
    setUname: PropTypes.func.isRequired,
    lobbyId: PropTypes.string.isRequired,
    setLId: PropTypes.func.isRequired,
};

const Home = () => {
    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <ToastContainer />
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 0
            }} />
            <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
                <Actions/>
            </Box>
        </div>
    );
}

export default Home;
