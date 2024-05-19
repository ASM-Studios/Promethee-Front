import { Box, Typography, Button, Modal, Slider } from '@mui/material';
// @ts-ignore
import background from '../assets/HomeBackground.png';
// @ts-ignore
import deck from '../assets/deck.png';
// @ts-ignore
import board from '../assets/board.png';
import UserContext from "../UserContext";
// @ts-ignore
import React, { useContext, useEffect, useState, useCallback } from "react";
import { instance, draw, update, playCard, endOfTurn, questionUrl } from "../routes";
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
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

const CardsButtons = React.memo(({ currentPlayer, focusedCard, asGamble, setCards, cards, setFocusedCard, endTurn, lobbyId, username, target, setQuestion, setIsQuestion, setSliderValue, asDraw, setAsDraw }) => {

    const discard = () => {
        setCards(cards.filter((_, index) => index !== focusedCard));
        setFocusedCard(-1);
        setAsDraw(false);
        endTurn();
    };

    const drawCard = () => {
        setAsDraw(true);
        setCards(cards.filter((_, index) => index !== focusedCard));
        instance.get(draw).then((response) => {
            setCards([...cards, response.data.value]);
            setAsDraw(true);
            setFocusedCard(cards.length - 1);
        }).catch((error) => {
            console.error(error);
        });
    };

    const playCardF = () => {
        instance.post(playCard, {
            lobbyId: lobbyId || '',
            username: username || '',
            value: cards[focusedCard] || 0,
            action: target !== username ? 'damage' : 'heal',
            target: target !== username ? target : ''
        }).then(() => {
            discard();
        }).catch((error) => {
            console.error(error);
        });
    };

    const gamble = () => {
        instance.put(questionUrl, {
            lobbyId: lobbyId,
            username: username,
        }).then((response) => {
            setQuestion({
                title: response.data.title,
                expected: response.data.expected,
                min: response.data.min,
                max: response.data.max,
                tolerance: response.data.tolerance,
            });
            setIsQuestion(true);
            setSliderValue(response.data.min)
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '10px',
                marginTop: '2vw',
                width: '15vw',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                }}
            >
                <Button
                    variant="contained"
                    sx={{ flex: 1 }}
                    onClick={ playCardF }
                    disabled={ currentPlayer !== username || focusedCard == -1 }
                >Jouer</Button>
                <Button
                    variant="contained"
                    sx={{ flex: 1 }}
                    onClick={ drawCard }
                    disabled={ currentPlayer !== username || focusedCard == -1 || asDraw }
                >Défausser</Button>
            </Box>
            <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={ gamble }
                disabled={ asGamble || (currentPlayer !== username || focusedCard == -1) }
            >Parier</Button>
            <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={ endTurn }
                disabled={ currentPlayer !== username }
            >Terminer le tour</Button>
        </Box>
    );
});

const Game = () => {
    const {
        username,
        lobbyId,
        players, setPlayers,
        lobbyCreator,
        cards, setCards
    } = useContext(UserContext);
    const [currentPlayer, setCurrentPlayer] = useState(lobbyCreator);
    const [focusedCard, setFocusedCard] = useState(-1);
    const [target, setTarget] = useState('');
    const [question, setQuestion] = useState(
        {
            title: '',
            expected: 0,
            min: 0,
            max: 0,
            tolerance: 0,
        }
    );
    const [isQuestion, setIsQuestion] = useState(false);
    const [sliderValue, setSliderValue] = useState(question.min);
    const [asDraw, setAsDraw] = useState(false);

    const updatePlayers = useCallback(() => {
        instance.put(update, {
            lobbyId: lobbyId
        }).then((response) => {
            setPlayers(response.data.players);
            setCurrentPlayer(response.data.currentPlayer);
        }).catch((error) => {
            console.error(error);
        });
    }, [lobbyId, setPlayers]);

    useEffect(() => {
        const interval = setInterval(updatePlayers, (import.meta.env.VITE_REFRESH_INTERVAL) || 10000);

        return () => clearInterval(interval);
    }, [updatePlayers]);

    useEffect(() => {
        if (cards.length < 3)
            instance.get(draw).then((response) => {
                setCards([...cards, response.data.value]);
            }).catch((error) => {
                console.error(error);
            });
    }, [cards, setCards]);

    const endTurn = () => {
        instance.put(endOfTurn, {
            lobbyId: lobbyId
        }).then(() => {
            updatePlayers();
        }).catch((error) => {
            console.error(error);
        });
    }

    const CardsLayout = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    height: '100%',
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
                            style={{
                                backgroundImage: `url(${cardsImages[index]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                width: '8vw',
                                height: '13vw',
                                border: 'none',
                                borderRadius: '10px',
                                boxShadow: focusedCard === index ? 'inset 0 0 0 3px red' : 'none',
                            }}
                            onClick={() => setFocusedCard(index)}
                            disabled={ currentPlayer !== username || asDraw }
                        >
                        </Button>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                    }}
                >
                    {cards.slice(2, 4).map((card, index) => (
                        <Button
                            key={index+2}
                            style={{
                                backgroundImage: `url(${cardsImages[index+2]})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                width: '8vw',
                                height: '13vw',
                                border: 'none',
                                borderRadius: '10px',
                                boxShadow: focusedCard === (index + 2) ? 'inset 0 0 0 3px red' : 'none',
                            }}
                            onClick={() => setFocusedCard(index + 2)}
                            disabled={ currentPlayer !== username || asDraw }
                        >
                        </Button>
                    ))}
                </Box>
            </Box>
        );
    };

    const validateQuestion = (question: { expected: number; tolerance: number; }, answer: number, setIsQuestion: (arg0: boolean) => void) => {
        const min = question.expected - question.tolerance;
        const max = question.expected + question.tolerance;
        if (answer >= min && answer <= max) {
            setCards([...cards, cards[focusedCard]]);
        } else {
            instance.post(playCard, {
                lobbyId: lobbyId || '',
                username: username || '',
                value: parseInt(cards[focusedCard]) * 2 || 6,
                action: 'damage',
                target: username || ''
            }).catch((error) => {
                console.error(error);
            });
        }
        setIsQuestion(false);
    };

    const hasPlayerGamble = (players: { [key: string]: number; }, username: string) => {
        // @ts-ignore
        for (const player of players) {
            if (player.username === username) {
                return player.asGamble;
            }
        }
    }

    const GameLayout = () => {
        return (
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <Box sx={{
                    flex: '1 1 auto',
                    backgroundImage: `url(${deck})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    marginLeft: '20px',
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
                            marginTop: '5vw',
                            padding: '2vw',
                        }}
                    >
                        <CardsLayout/>
                        <CardsButtons
                            currentPlayer={currentPlayer}
                            focusedCard={focusedCard}
                            asGamble={hasPlayerGamble(players, username)}
                            setCards={setCards}
                            cards={cards}
                            setFocusedCard={setFocusedCard}
                            endTurn={endTurn}
                            lobbyId={lobbyId}
                            username={username}
                            target={target}
                            setQuestion={setQuestion}
                            setIsQuestion={setIsQuestion}
                            setSliderValue={setSliderValue}
                            asDraw={asDraw}
                            setAsDraw={setAsDraw}
                        />
                    </Box>
                </Box>
                <Box sx={{
                    flex: '1 1 auto',
                    backgroundImage: `url(${board})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    marginLeft: '10px',
                    marginRight: '20px',
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
                                <Button
                                    key={index}
                                    sx={{
                                        position: 'absolute',
                                        transform: `rotate(${rotation}deg) translate(15vw) rotate(-${rotation}deg)`,
                                        backgroundColor: getRandomColor(),
                                        borderRadius: '20px',
                                        marginTop: '5vw',
                                        padding: '2vw',
                                        width: `10vw`,
                                        textAlign: 'center',
                                        border: target === username ? '3px solid red' : 'none'
                                    }}
                                    onClick={() => setTarget(username)}
                                >
                                    <Typography variant="h6" style={{color: 'white'}}>
                                        {username || 'null'}
                                        <br />
                                        🔥 {life || 'null'}
                                    </Typography>
                                </Button>
                            );
                        })}
                    </Box>
                </Box>
                {/* @ts-ignore */}
                <Modal
                    open={isQuestion}
                    onClose={() => {}}
                    disableEscapeKeyDown
                    disableBackdropClick
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'white',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '10px',
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {question.title}
                        </Typography>
                        <Slider
                            aria-label="Question slider"
                            defaultValue={question.min}
                            value={sliderValue}
                            onChangeCommitted={(event, newValue) => setSliderValue(newValue)}
                            valueLabelDisplay="auto"
                            step={1}
                            min={question.min}
                            max={question.max}
                        />
                        <Button onClick={() => validateQuestion(
                            {
                                expected: question.expected,
                                tolerance: question.tolerance,
                            },
                            sliderValue,
                            setIsQuestion
                        )}>Répondre</Button>
                    </Box>
                </Modal>
            </Box>
        )
    };

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
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
