// @ts-ignore
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, Button, Card, Grid, TextField, CardContent } from '@mui/material';
import { toast, ToastContainer } from "react-toastify";
// @ts-ignore
import background from '../assets/HomeBackground.png';

const Actions = ({ username, setUsername, lobbyId, setLobbyId }) => {
    const launchGame = () => {
        if (username === '') {
            toast.error('Veuillez renseigner un pseudo');
            return;
        }
        if (lobbyId === '') {
            toast.error('Veuillez renseigner un identifiant de partie');
            return;
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CardContent>
                <Box sx={{ padding: 2, margin: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                        <h1>Promethée</h1>
                    </Box>
                    <Box sx={{ paddingBottom: 2 }}>
                        <TextField
                            label="pseudo"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth/>
                    </Box>
                    <Box sx={{ paddingBottom: 2 }}>
                        <TextField
                            label="Identifiant de partie"
                            value={lobbyId}
                            onChange={(e) => setLobbyId(e.target.value)}
                            fullWidth/>
                    </Box>
                    <Box sx={{ paddingTop: 2 }}>
                        <Button variant="contained" fullWidth onClick={launchGame} disabled={username === '' || lobbyId === ''}>Se connecter</Button>
                    </Box>
                </Box>
            </CardContent>
        </Box>
    )
};

Actions.propTypes = {
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    lobbyId: PropTypes.string.isRequired,
    setLobbyId: PropTypes.func.isRequired,
};

const Home = () => {
    const [username, setUsername] = useState('');
    const [lobbyId, setLobbyId] = useState('');

    return (
        <Box sx={{ height: '100vh', width: '100vw', backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
            <ToastContainer />
            <Card sx={{ height: '100%', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <Grid container>
                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs={4}>
                        <Actions username={username} setUsername={setUsername} lobbyId={lobbyId} setLobbyId={setLobbyId} />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}

export default Home;
