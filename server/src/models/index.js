const { User } = require('./User')
// import the rest of your models above
const { Deck } = require('./Deck');
const {Attack} = require('./Attack')
const {Card} = require('./Card')


// set up the associations here
Deck.hasOne(User);
User.belongsTo(Deck)

Card.hasOne(Deck);
Deck.hasMany(Card);

Card.belongsToMany(Attack, {through: "card-attack"});
Attack.belongsToMany(Card, {through: "card-attack"});


// and then export them all below
module.exports = { User, Deck, Attack, Card }