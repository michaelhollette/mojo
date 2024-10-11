const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card } = require('./Card.js')
const {db}  = require('../db/config')

// define in global scope
let card

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  card = await Card.create({ 
    name: 'card 1',
    mojo: 5,
    staminaCost: 7,
    imgUrl: "https://images.squarespace-cdn.com/content/v1/52f39be3e4b0b5c2c6475649/1453200955078-RJOEL90LW7L0PX0MZ5TA/image-asset.png",
})
})

// clear db after tests
afterAll(async () => await db.close())

describe('Card', () => {
  test ('has an id', async () => {
    expect(card).toHaveProperty('id')
  });

  test ('has a name', async () => {
    expect(card).toHaveProperty('name')
  });

  test('has the correct name', async () => {
    expect(card.name).toBe('card 1');
  });

  test('id is a number in JavaScript', async () => {
    expect(typeof card.id).toBe('number');
  });
  test ('name is a string in JavaScript', async () => {
    expect(typeof card.name).toBe('string');
  });

  test('id is an INTEGER in SQL', async () => {
    const attributes = Card.rawAttributes;
    expect(attributes.id.type.key).toBe('INTEGER');
  });

  test('username is a STRING in SQL', async () => {
    const attributes = Card.rawAttributes;
    expect(attributes.name.type.key).toBe('STRING');
  });



 
})
