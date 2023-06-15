const express = require('express');
const router = new express.Router();

const User = require('../models/user');

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register', async function (req, res) {
  const { username, password, first_name, last_name, phone } = req.body;

  const register = await User.register(
    username,
    password,
    first_name,
    last_name,
    phone
  );

  console.log(register);

  return res.json({ username: username });
});

module.exports = router;
