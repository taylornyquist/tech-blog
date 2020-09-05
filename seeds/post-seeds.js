const { Post } = require('../models');

const postData = [
    {
        title: "test title 123",
        post_text: "text text 1",
        user_id: 1
    },
    {
        title: "test title 345",
        post_text: "text text 2",
        user_id: 1
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;




