const bcrypt = require('bcrypt');
const db = require('../db');
const expressError = require('../expressError');
const { BCRYPT_WORK_FACTOR } = require('../config');
/** User class for message.ly */

/** User of the site. */

class User {
  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register(username, password, first_name, last_name, phone) {
    const usernameExists = await db.query(
      `SELECT username FROM users WHERE username = $1`,
      [username]
    );

    if (usernameExists) {
      return new expressError(
        'Username already exist, please try another',
        409
      );
    }

    const hashedPass = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const joinAt = new Date();

    const userToRegister = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, phone, join_at) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [username, hashedPass, first_name, last_name, phone, joinAt]
    );

    return userToRegister.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {}

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {}

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const users = await db.query(
      `SELECT 
      username, first_name, last_name, phone, join_at 
      FROM users
    `
    );
    return users.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);

    if (result.rows.length == 0) {
      return new expressError("User doesn't exist", 404);
    }

    return result.rows[0];
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {}

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {}
}

module.exports = User;
