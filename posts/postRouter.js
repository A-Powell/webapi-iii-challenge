const express = require('express');

const db = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', validatePostId, (req, res) => {

});

router.delete('/:id', validatePostId, (req, res) => {

});

router.put('/:id', validatePostId, (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;

    db.getById(id)
    .then(post => {
        if (post) {
            req.post = post;
            next();
        } else {
            res.status(400).json({message: "invalid post id"})
        }
    })
};

module.exports = router;