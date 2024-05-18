import ReactMarkdown from 'react-markdown';

const markdownContent = `
# Règles

Chaque joueur attend son tour pour jouer.
Pendant son tour, le joueur a 3 actions possibles :

- Jouer une carte
- Défausser une carte
- Parier

## Jouer une carte

Le joueur a 2 cartes en main. Il peut en jouer une.
Chaque carte a une valeur entre 1 et 6, chaque carte devenant progressivement plus rare à mesure que sa valeur augmente.
Une carte peut effectuer 2 actions :

- Soigner la flamme du joueur de la valeur de la carte.
- Attaquer la flamme d'un autre joueur de la valeur de la carte.

Lorsqu'il choisit d'attaquer, le joueur doit choisir une cible parmi les autres joueurs.

## Défausser une carte

Le joueur peut défausser une carte de sa main.
Cette action est utile lorsque le joueur a une carte qu'il ne veut pas jouer ou lorsqu'il a trop de cartes en main.
Après une défausse, le joueur pioche une nouvelle carte dans le deck.
Avec le tirage viennent deux actions possibles :

- Jouer la carte immédiatement
- Garder la carte en main et terminer son tour

## Parier

Le mécanisme de pari est au cœur de l'action du jeu.
Chaque joueur peut appeler un pari une fois par match.
Lorsqu'il mise, tous les joueurs doivent choisir une carte de leur main et la jouer face cachée.
Après la sélection, une question est posée à tous les joueurs.
Selon la réponse :

- Le joueur répond correctement :
    - La carte misée est retournée dans la main du joueur, et il peut jouer une nouvelle carte avec la même valeur.
- Le joueur répond incorrectement :
    - La carte misée est défausser et le joueur subit 2 fois la valeur de la carte en dégâts.

Lorsqu'un joueur appelle un pari, cela ne met pas fin à son tour.
`;

const Rules = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
    );
};

export default Rules;
