import {Typography, Card, CardContent, Box, List, styled} from '@mui/material';
import { ListItem as MuiListItem } from '@mui/material';
import { ToastContainer } from "react-toastify";
import { useState, useEffect, JSX } from 'react';
import { animateScroll as scroll } from 'react-scroll';

// @ts-ignore
import background from '../assets/HomeBackground.png';

const createColoredListItem = (color: string) => {
    return styled(MuiListItem)(({theme}) => ({
        color: 'white',
        fontFamily: 'Courier New, monospace',
        fontWeight: 'bold',
        '&::before': {
            content: '""',
            display: 'inline-block',
            width: '20px',
            height: '20px',
            minWidth: '20px',
            minHeight: '20px',
            maxWidth: '20px',
            maxHeight: '20px',
            border: `3px solid ${color}`,
            borderRadius: '50%',
            marginRight: theme.spacing(1),
        },
    }));
};

const ListItemBlue = createColoredListItem('#0078D0');
const ListItemYellow = createColoredListItem('#FFB114');
const ListItemWhite = createColoredListItem('#FFFFFF');
const ListItemGreen = createColoredListItem('#00A651');
const ListItemRed = createColoredListItem('#F0282D');

const GameTypography = styled(Typography)(({theme}) => ({
    color: 'white',
    fontFamily: 'Courier New, monospace',
    fontWeight: 'bold',
    textAlign: 'center',
}));

const GameCard = styled(Card)(({theme}) => ({
    backgroundColor: 'transparent',
    borderRadius: '15px',
    padding: '20px',
    margin: '10px',
    flex: 1,
}));

const StyledBox = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '20px',
    border: '2px solid white',
}));

const createGameCard = (title: string, listItems: JSX.Element[]) => (
    <GameCard>
        <StyledBox>
            <CardContent>
                <Typography variant="h4" style={{
                    color: 'white',
                    fontFamily: 'Courier New, monospace',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}>{title}</Typography>
            </CardContent>
            <CardContent>
                <List>{listItems}</List>
            </CardContent>
        </StyledBox>
    </GameCard>
);

const Rules = () => {
    const gameCards = [
        createGameCard("Jouer une carte", [
            <ListItemBlue>Le joueur a 2 cartes en main. Il en joue une.</ListItemBlue>,
            <ListItemYellow>Chaque carte a une valeur allant de 1 à 6.</ListItemYellow>,
            <ListItemWhite>Plus la valeur de la carte est grande, plus elle est rare.</ListItemWhite>,
            <ListItemWhite>Une carte peut effectuer 2 actions : Soigner la flamme du joueur de la valeur de la carte. Attaquer la flamme d'un autre joueur de la valeur de la carte.</ListItemWhite>,
            <ListItemGreen>Lorsqu'il choisit d'attaquer, le joueur doit choisir une cible parmi les autres joueurs.</ListItemGreen>
        ]),
        createGameCard("Défausser une carte", [
            <ListItemBlue>Le joueur peut défausser une carte de sa main.</ListItemBlue>,
            <ListItemYellow>Cette action est utile lorsque le joueur a une carte qu'il ne veut pas jouer ou lorsqu'il a trop de cartes en main.</ListItemYellow>,
            <ListItemWhite>Après une défausse, le joueur pioche une nouvelle carte dans le deck.</ListItemWhite>,
            <ListItemGreen>Avec le tirage viennent deux actions possibles : Jouer la carte immédiatement. Garder la carte en main et terminer son tour.</ListItemGreen>
        ]),
        createGameCard("Parier", [
            <ListItemBlue>Le mécanisme de pari est au cœur de l'action du jeu.</ListItemBlue>,
            <ListItemYellow>Chaque joueur peut appeler un pari une fois par match.</ListItemYellow>,
            <ListItemWhite>Lorsqu'il mise, tous les joueurs doivent choisir une carte de leur main et la jouer face cachée.</ListItemWhite>,
            <ListItemGreen>Après la sélection, une question est posée à tous les joueurs. Selon la réponse : Le joueur répond correctement : La carte misée est retournée dans la main du joueur, et il peut jouer une nouvelle carte avec la même valeur. Le joueur répond incorrectement : La carte misée est défausser et le joueur subit 2 fois la valeur de la carte en dégâts.</ListItemGreen>,
            <ListItemRed>Lorsqu'un joueur appelle un pari, cela ne met pas fin à son tour.</ListItemRed>
        ])
    ];

    const [autoScroll, setAutoScroll] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAutoScroll(true);
        }, 3000);

        const handleScroll = () => {
            setAutoScroll(true);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (autoScroll) {
            scroll.scrollToBottom({
                duration: 1000,
                smooth: "easeInOutQuart"
            });
        }
    }, [autoScroll]);

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
                <StyledBox>
                    <GameTypography variant="h1" gutterBottom>Règles</GameTypography>
                    <GameTypography variant="h5" gutterBottom>Chaque joueur attend son tour pour jouer.</GameTypography>
                    <GameTypography variant="h5" gutterBottom>Pendant son tour, le joueur a 3 actions possibles :</GameTypography>
                </StyledBox>
              <Box display="flex" justifyContent="space-between">
                  {gameCards}
              </Box>
            </Box>
        </div>
    );
};

export default Rules;
