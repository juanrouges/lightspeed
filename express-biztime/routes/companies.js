const db = require('../db');
const express = require('express');
const router = new express.Router();

router.get('/', async (req, res) => {
  return res.json({ test: 'Hello World' })
})

module.exports = router;