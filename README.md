# Promethée
### A cruel angel's thesis

## Introduction

This project is the front end of a small game developed in the context of a Jam.<br>
The game is a 1vAll where the player aim to keep it's olympic flame alive as long as possible while the other players try to extinguish it.<br>

## Running the project

To run the project, you need to have Node.js installed on your machine.<br>
Then, you can run the following commands:

```bash
npm install
npm run dev
```

## Rules

Each player wait for his turn to play.<br>
During his turn, the player has 3 possible actions:

- Play a card
- Discard a card
- Gamble

### Play a card

The player has 2 cards in his hand. He can play one of them.<br>
Each card has a value between 1 and 6, with each card getting progressively more rare has it's value increase.<br>
A card can perform 2 actions:
- Heal the flame of the player by the value of the card.
- Attack the flame of another player by the value of the card.

When choosing to attack, the player must choose a target among the other players.<br>

### Discard a card

The player can discard a card from his hand.<br>
This action is useful when the player has a card he doesn't want to play or when he has too many cards in his hand.<br>
After a discard, the player draws a new card from the deck.<br>
With the draw come two possible actions:
- Play the card immediately
- Keep the card in his hand and end his turn

### Gamble

The gamble mechanic is the core of the game action.<br>
Each player can call a gamble one time per match.<br>
When gambling, all players must choose a card from their hand and play it face down.<br>
After the selection, a question is asked to all players.<br>
Depending on the answer:

- ##### The player answer correctly:
    - The card gambled is return to the player hand, and he can play a new card with the same value.
- ##### The player answer incorrectly:
    - The card gambled is discarded and the player take 2 times the value of the card in damage.

When a player call a gamble, it doesn't end his turn.<br>

## Team

- [Charles MADJERI](charles.madjeri@epitech.eu)
- [Mathieu Borel](mathieu.borel@epitech.eu)
- [Yohann Mangenot](yohann.mangenot@epitech.eu)
- [Tom Blancheton](tom.blancheton@epitech.eu)
- [Mathieu Coulet](mathieu.coulet@epitech.eu)
- [Mael RABOT](mael.rabot@epitech.eu)
