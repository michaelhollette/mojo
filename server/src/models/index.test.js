
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const { User, Deck, Card, Attack } = require('./index'); // import models
const {db} = require('../db/config');

// clear db and create new instances before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterAll(async () => await db.close());

describe('User and Deck', () => {
  test('has a one-to-one association ', async () => {
    const user = await User.create({ username: 'gandalf' });
    const deck = await Deck.create({ name: 'My Deck', xp: 50000, userId: user.id });

    const userDeck = await user.getDeck();
    expect(userDeck).toBeDefined();
    expect(userDeck.name).toBe('My Deck');


    const deckOwner = await deck.getUser();
    expect(deckOwner).toBeDefined();
    expect(deckOwner.username).toBe('gandalf');
    });
});

describe('Deck and Card ', () => {
    it('has a one-to-many association', async () => {
        const deck = await Deck.create({ name: 'My Deck', xp: 50000 });
        const card1 = await Card.create({ 
            name: 'Fire',
            mojo: 5,
            staminaCost: 7,
            imgUrl: "https://images.squarespace-cdn.com/content/v1/52f39be3e4b0b5c2c6475649/1453200955078-RJOEL90LW7L0PX0MZ5TA/image-asset.png",
            deckId: deck.id
        });
        const card2 = await Card.create({ 
            name: 'Thunder',
            mojo: 5,
            staminaCost: 7,
            imgUrl: "https://images.squarespace-cdn.com/content/v1/52f39be3e4b0b5c2c6475649/1453200955078-RJOEL90LW7L0PX0MZ5TA/image-asset.png",    
            deckId: deck.id });

        const deckCards = await deck.getCards();
        expect(deckCards.length).toBe(2);
        expect(deckCards[0].name).toBe('Fire');
        expect(deckCards[1].name).toBe('Thunder');

        const cardDeck1  = await card1.getDeck();
        expect(cardDeck1.name).toBe('My Deck');

        const cardDeck2  = await card2.getDeck();
        expect(cardDeck2.name).toBe('My Deck');
    });
});

describe('Card and Attack', () => {
    it('has a many-to-many association', async () => {
        const card1 = await Card.create({ 
            name: 'Fire',
            mojo: 5,
            staminaCost: 7,
            imgUrl: "https://images.squarespace-cdn.com/content/v1/52f39be3e4b0b5c2c6475649/1453200955078-RJOEL90LW7L0PX0MZ5TA/image-asset.png",});
        const card2 = await Card.create({ 
            name: 'Lava',
            mojo: 5,
            staminaCost: 7,
            imgUrl: "https://images.squarespace-cdn.com/content/v1/52f39be3e4b0b5c2c6475649/1453200955078-RJOEL90LW7L0PX0MZ5TA/image-asset.png",});
        const attack1 = await Attack.create({ 
            title: 'Fireball',
            mojoCost: 50,
            staminaCost: 50,

        });
        const attack2 = await Attack.create({ 
            title: 'Heat Wave',
            mojoCost: 50,
            staminaCost: 50,
 });

        //Add Attacks to Cards
        await card1.addAttacks([attack1, attack2]);
        await card2.addAttacks([attack1, attack2]);

        //Check Cards have multiple Attacks
        const card1Attacks = await card1.getAttacks();
        expect(card1Attacks.length).toBe(2);
        expect(card1Attacks[0].title).toBe('Fireball');
        expect(card1Attacks[1].title).toBe('Heat Wave');

        const card2Attacks = await card2.getAttacks();
        expect(card2Attacks).toBe(2);
        expect(card2Attacks[0].title).toBe('Fireball');
        expect(card2Attacks[1].title).toBe('Heat Wave');

        //Check Attacks belong to many Cards
        const attack1Cards = await attack1.getCards();
        expect(attack1Cards.length).toBe(2);
        expect(attack1Cards[0].name).toBe('Fire');
        expect(attack1Cards[1].name).toBe('Lava');

        const attack2Cards = await attack2.getCards();
        expect(attack2Cards.length).toBe(2);
        expect(attack2Cards[0].name).toBe('Fire');
        expect(attack2Cards[1].name).toBe('Lava');

    });
});









