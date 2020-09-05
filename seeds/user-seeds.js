const { User } = require('../models');

const userData = [
    {
        username: "dave",
        email: "dave@gmail.com",
        password: "davePassword"
    },
    {
        username: "bob",
        email: "bob@gmail.com",
        password: "bobPassword"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
