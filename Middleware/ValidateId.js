
const Users = require("../users/userDb.js");

const validateUserId = (req, res, next) => {
    const { id } = req.params;

    Users.getById(id)
    .then(user => {
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({message: "invalid user id"})
        }
    })
}

module.exports = validateUserId;