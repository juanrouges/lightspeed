const express = require('express');
const router = new express.Router();
const items = require('../fakeDb');

router.get('/', (request, response) => {
  response.json({ items });
});

router.post('/', (request, response) => {
  const newItem = { name: request.body.name, price: request.body.price };
  items.push(newItem);
  response.status(201).json({ item: newItem });
});

module.exports = router;
