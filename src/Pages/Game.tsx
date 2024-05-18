import { Box, Typography } from '@mui/material';
import { ToastContainer } from "react-toastify";
// @ts-ignore
import background from '../assets/HomeBackground.png';
// @ts-ignore
import deck from '../assets/deck.png';
// @ts-ignore
import board from '../assets/board.png';
import UserContext from "../UserContext";
import { useContext } from "react";
import { useEffect, useState, useCallback } from "react";
import { instance, draw, update } from "../routes";

const getRandomColor = () => {
    const colors = [
        'rgb(0, 120, 208)',
        'rgb(255, 177, 20)',
        'rgb(0, 166, 81)',
        'rgb(240, 40, 45)',
        'rgb(0, 0, 0)',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const Game = () => {
    const {
        username,
        lobbyId,
        players, setPlayers,
        lobbyCreator,
        cards, setCards
    } = useContext(UserContext);

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
                    <></>
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
                        {players.map(({username, life}, index) => {
                            const rotation = (360 / players.length) * index;

                            return (
                                <>
                                    <Box
                                        key={index}
                                        sx={{
                                            position: 'absolute',
                                            transform: `rotate(${rotation}deg) translate(300px) rotate(-${rotation}deg)`,
                                            backgroundColor: getRandomColor(),
                                            borderRadius: '20px',
                                            padding: '20px',
                                            width: `25ch`,
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Typography variant="h6" style={{color: 'white'}}>{username || 'null'}</Typography>
                                        <Typography variant="body1" style={{color: 'white'}}>🔥 {life || 'null'}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: '50%',
                                        }}
                                    >
                                    </Box>
                                </>
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
