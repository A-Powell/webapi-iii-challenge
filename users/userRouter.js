const express = require('express');
const validateUserId = require('../Middleware/ValidateId.js');
const Users = require('./userDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error adding the user."
      });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    Post.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error adding post"
      });
    });

});

router.get('/', (req, res) => {
    Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving users."
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
    Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving user."
      });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
    Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(201).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error getting user's posts."
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
    Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been deleted."
        });
      } else {
        res.status(404).json({
          message: "The user could not be found."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error deleting the user."
      });
    });
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Users.update(id, changes)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Error updating user"
        });
      });
});

//custom middleware

function validateUser(req, res, next) {
req.body ? req.body.name ? next() : res.status(400).json({message: "missing required name field"}) : res.status(400).json({message: "missing user data"})
};

function validatePost(req, res, next) {
req.body ? req.body.text ? next() : res.status(400).json({message: "missing required text field"}) : res.status(400).json({message: "missing post data"})
};

module.exports = router;
