const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./auth-model');

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(500).json({ message: 'All fields are required.' });
    }
    const user = await Users.findBy('username', username).first();
    console.log('is user found?', user);
    if (user) {
      return res.status(409).json({
        message: 'Username is already taken'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('entered password', password);
    console.log('hashed password', hashedPassword);
    console.log('req.body is', req.body);
    res.status(201).json(await Users.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy('username', username).first();
    // if starting with seeded data (unhashed passwords)
    // hashedPwDb = await bcrypt.hash(user.password, 10);
    // user.password = hashedPwDb;
    console.log('hashed pw in db', user.password);
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('found user in db?', user);
    console.log('validPassword', validPassword);
    if (!user || !validPassword) {  
      return res.status(500).json({
        message: 'You shall not pass! Invalid user.'
      });      
    }
    // console.log('entered password', password);
    // console.log('hashed password in db', user.password);
    if (user && validPassword) {
      const payload = {
        userId: user.id
      };
      const token = jwt.sign(payload, 'super secret');
      res.cookie('token', token);
      console.log('user', user);
      res.status(200).json({
        message: `Logged in: ${user.username}`,
        token: token
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