const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {

    Comment.findAll({
        // Query configuration
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'post_id',
            'updated_at',
            'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// // Week 13
// router.post('/', (req, res) => {
//     Comment.create({
//         comment_text: req.body.comment_text,
//         user_id: req.body.user_id,
//         post_id: req.body.post_id
//     })
//         .then(dbCommentData => res.json(dbCommentData))
//         .catch(err => {
//             console.log(err);
//             res.status(400).json(err);
//         });

// });

// Week 14
router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            // use the id from the session
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// PUT route to update a post's title and text
router.put('/:id', withAuth, (req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbCommentData => {
            // Why did i have to add [0] here?
            if (!dbCommentData[0]) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;