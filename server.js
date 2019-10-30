const express = require('express');
const server = express();
const postrouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');
const logger = require('./Middleware/Logger.js');

server.use(express.json());
server.use(logger);
server.use('/api/posts', postrouter);
server.use('/api/users', userRouter);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


module.exports = server;
