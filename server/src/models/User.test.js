const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { User } = require('.')
const {db}  = require('../db/config')

// define in global scope
let user

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  user = await User.create({ username: 'gandalf' })
})

// clear db after tests
afterAll(async () => await db.close())

describe('User', () => {
  test ('has an id', async () => {
    expect(user).toHaveProperty('id')
  });

  test ('has a username', async () => {
    expect(user).toHaveProperty('username')
  });

  test('has the correct username', async () => {
    expect(user.username).toBe('gandalf');
  });

  test('id is a number in JavaScript', async () => {
    expect(typeof user.id).toBe('number');
  });
  test ('username is a string in JavaScript', async () => {
    expect(typeof user.username).toBe('string');
  });

  test('id is an INTEGER in SQL', async () => {
    const attributes = User.rawAttributes;
    expect(attributes.id.type.key).toBe('INTEGER');
  });

  test('username is a STRING in SQL', async () => {
    const attributes = User.rawAttributes;
    expect(attributes.username.type.key).toBe('STRING');
  });



 
})
