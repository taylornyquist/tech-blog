const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "testing 1, 2, 3",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "testing 4, 5, 6",
        user_id: 2,
        post_id: 2
    },

];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;







