const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.get('/', (req, res) => {
    res.json({
        message: 'The Sprint Challenge Authentication API is up'
    })
});

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate(), jokesRouter);

module.exports = server;
