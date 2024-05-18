import { Box, Typography } from '@mui/material';
import { toast, ToastContainer } from "react-toastify";
// @ts-ignore
import background from '../assets/HomeBackground.png';
// @ts-ignore
import deck from '../assets/deck.png';
// @ts-ignore
import board from '../assets/board.png';
import UserContext from "../UserContext";
import { useContext } from "react";
import { useEffect, useState } from "react";

const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

const Game = () => {
    const { username, lobbyId, players, lobbyCreator } = useContext(UserContext);
    const [deckDimensions, setDeckDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const img = new Image();
        img.src = deck;
        img.onload = () => {
            setDeckDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        };
    }, []);

    const GameLayout = () => {
        return (
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <Box sx={{
                    flex: '1 1 auto',
                    backgroundImage: `url(${deck})`,
                    backgroundSize: 'cover',
                    padding: '20px',
                    margin: '20px',
                }}>
                    {/* card box */}
                </Box>
                <Box sx={{
                    flex: '1 1 66%',
                    backgroundImage: `url(${board})`,
                    backgroundSize: 'cover',
                    padding: '20px',
                    margin: '20px',
                }}>
                    {/* players box */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        position: 'relative',
                    }}>
                        {players.map((player, index) => {
                            const rotation = (360 / players.length) * index;

                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'absolute',
                                        transform: `rotate(${rotation}deg) translate(200px) rotate(-${rotation}deg)`,
                                        backgroundColor: getRandomColor(),
                                        borderRadius: '20px',
                                        padding: '20px',
                                        width: `20ch`,
                                        textAlign: 'center'
                                    }}
                                >
                                    <Typography variant="h6" style={{color: 'white'}}>{player}</Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        )
    }

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
                <GameLayout/>
            </Box>
        </div>
    );
}


export default Game;
