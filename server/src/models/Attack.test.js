const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Attack } = require('./Attack.js')
const {db}  = require('../db/config')

// define in global scope
let attack;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  attack = await Attack.create({ 
    title: 'attack 1',
    mojoCost: 50,
    staminaCost: 50,

   })
})

// clear db after tests
afterAll(async () => await db.close())

describe('Attack', () => {
  test ('has an id', async () => {
    expect(attack).toHaveProperty('id')
  });

  test ('has a title', async () => {
    expect(attack).toHaveProperty('title')
  });

  test('has the correct title', async () => {
    expect(attack.title).toBe('attack 1');
  });

  test('id is a number in JavaScript', async () => {
    expect(typeof attack.id).toBe('number');
  });
  test ('title is a string in JavaScript', async () => {
    expect(typeof attack.title).toBe('string');
  });

  test('id is an INTEGER in SQL', async () => {
    const attributes = Attack.rawAttributes;
    expect(attributes.id.type.key).toBe('INTEGER');
  });

  test('username is a STRING in SQL', async () => {
    const attributes = Attack.rawAttributes;
    expect(attributes.title.type.key).toBe('STRING');
  });



 
})
