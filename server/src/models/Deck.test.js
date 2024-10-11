const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck } = require('./Deck')
const {db}  = require('../db/config')

// define in global scope
let deck

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  deck = await Deck.create({ 
    name: 'deck 1',
    xp: 5000,
  })
})

// clear db after tests
afterAll(async () => await db.close())

describe('Deck', () => {
  test ('has an id', async () => {
    expect(deck).toHaveProperty('id')
  });

  test ('has a name', async () => {
    expect(deck).toHaveProperty('name')
  });

  test('has the correct name', async () => {
    expect(deck.name).toBe('deck 1');
  });

  test('id is a number in JavaScript', async () => {
    expect(typeof deck.id).toBe('number');
  });
  test ('name is a string in JavaScript', async () => {
    expect(typeof deck.name).toBe('string');
  });

  test('id is an INTEGER in SQL', async () => {
    const attributes = Deck.rawAttributes;
    expect(attributes.id.type.key).toBe('INTEGER');
  });

  test('name is a STRING in SQL', async () => {
    const attributes = Deck.rawAttributes;
    expect(attributes.name.type.key).toBe('STRING');
  });



 
})
