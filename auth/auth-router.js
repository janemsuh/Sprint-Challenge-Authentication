const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./auth-model');

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy('username', username).first();
    if (user) {
        return res.status(409).json({
            message: 'Username is already taken'
        });
    }
    res.status(201).json(await Users.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy('username', username).first();
    const validPassword = await bcrypt.compare(password, user.password);
    if (user && validPassword) {
        const tokenPayload = {
            userId: user.id
        };
        res.cookie('token', jwt.sign(tokenPayload, process.env.JWT_SECRET));
        res.status(200).json({
            message: `Logged in: ${user.username}`
        });
    } else {
        return res.status(401).json({
            message: 'You shall not pass! Invalid credentials.'
        });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;