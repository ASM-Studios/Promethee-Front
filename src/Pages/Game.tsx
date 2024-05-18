import { Box, Typography, Button } from '@mui/material';
import { ToastContainer } from "react-toastify";
// @ts-ignore
import background from '../assets/HomeBackground.png';
// @ts-ignore
import deck from '../assets/deck.png';
// @ts-ignore
import board from '../assets/board.png';
import UserContext from "../UserContext";
import {useContext, useEffect, useState } from "react";
import { instance, draw, update } from "../routes";
// @ts-ignore
import card_1 from '../assets/card_1.png';
// @ts-ignore
import card_2 from '../assets/card_2.png';
// @ts-ignore
import card_3 from '../assets/card_3.png';
// @ts-ignore
import card_4 from '../assets/card_4.png';
// @ts-ignore
import card_5 from '../assets/card_5.png';
// @ts-ignore
import card_6 from '../assets/card_6.png';

const cardsImages = [card_1, card_2, card_3, card_4, card_5, card_6];

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
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [focusedCard, setFocusedCard] = useState(-1);

    const updatePlayers = () => {
        instance.get(update, {
            params: {
                lobbyId: lobbyId
            }
        }).then((response) => {
            setPlayers(response.data.players);
            setCurrentPlayer(response.data.currentPlayer);
        }).catch((error) => {
            console.error(error);
        });
    };

    // useEffect(() => {
    //     const interval = setInterval(updatePlayers, 10000);
    //
    //     return () => clearInterval(interval);
    // }, [updatePlayers]);

    useEffect(() => {
        if (cards.length < 3)
            instance.get(draw).then((response) => {
                setCards([...cards, response.data.value]);
            }).catch((error) => {
                console.error(error);
            });
    }, [cards, setCards]);

    const CardsButtons = () => {
        const discard = () => {
            setCards(cards.filter((_, index) => index !== focusedCard));
            setFocusedCard(-1);
        };

        const playCard = () => {

        };

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: '10px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '10px',
                    }}
                >
                    <Button variant="contained" sx={{ flex: 1 }} onClick={playCard}>Jouer</Button>
                    <Button variant="contained" sx={{ flex: 1 }} onClick={discard}>Défausser</Button>
                </Box>
                <Button variant="contained" sx={{ width: '100%' }}>Parier</Button>
            </Box>
        );
    };

    const CardsLayout = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                    }}
                >
                    {cards.slice(0, 2).map((card, index) => (
                        <Button
                            key={index}
                            style={{backgroundImage: `url(${cardsImages[index]})`, backgroundSize: 'cover'}}
                            onClick={() => setFocusedCard(index)}
                        >
                        </Button>
                    ))}
                </Box>
                {cards[2] && (
                    <Button
                        style={{backgroundImage: `url(${cardsImages[2]})`, backgroundSize: 'cover'}}
                        onClick={() => setFocusedCard(2)}
                    >
                    </Button>
                )}
            </Box>
        );
    };

    const GameLayout = () => {
        return (
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <Box sx={{
                    flex: '1 1 auto',
                    backgroundImage: `url(${deck})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    marginRight: '10px',
                    marginTop: '2%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: `362px`,
                    minWidth: 0,
                    minHeight: 0,
                    transform: 'scaleY(0.9)'
                }}>
                    {/* card box */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: '30%',
                        }}
                    >
                        <CardsLayout/>
                        <CardsButtons/>
                    </Box>
                </Box>
                <Box sx={{
                    flex: '1 1 auto',
                    backgroundImage: `url(${board})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    marginLeft: '10px',
                    marginTop: '2%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: `1152px`,
                    minWidth: 0,
                    minHeight: 0,
                    transform: 'scaleY(0.9)'
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
                                </>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        )
    };

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
};


export default Game;
