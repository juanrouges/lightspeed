const express = require('express');
const router = new express.Router();

const User = require('../models/user');

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async function (req, res, next) {
  try {
    const { username, password } = req.body;

    const userExists = await User.authenticate(username);

    return res.json({ user: userExists });
  } catch (err) {
    return next(err);
  }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register', async function (req, res, next) {
  try {
    const { username, password, first_name, last_name, phone } = req.body;

    const register = await User.register(
      username,
      password,
      first_name,
      last_name,
      phone
    );

    return res.json(register);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
