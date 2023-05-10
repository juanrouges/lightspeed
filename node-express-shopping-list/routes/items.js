const express = require('express');
const router = new express.Router();
const items = require('../fakeDb');
const ExpressError = require('../expressError');

router.get('/', (request, response) => {
  response.json({ items });
});

router.post('/', (request, response) => {
  const newItem = { name: request.body.name, price: request.body.price };
  items.push(newItem);
  response.status(201).json({ item: newItem });
});

router.get('/:name', (request, response) => {
  const foundItem = items.find((item) => item.name === request.params.name);
  if (!foundItem) {
    throw new ExpressError('This item does not exist', 404);
  }
  return response.json({ item: foundItem });
});

router.patch('/:name', (request, response) => {
  const foundItem = items.find((item) => item.name === request.params.name);
  if (!foundItem) {
    throw new ExpressError('This item does not exist', 404);
  }

  foundItem.name = request.body.name;
  foundItem.price = request.body.price;

  return response.json(foundItem);
});

router.delete('/:name', (request, response) => {
  const foundItem = items.find((item) => item.name === request.params.name);
  if (!foundItem) {
    throw new ExpressError('This item does not exist', 404);
  }
  items.splice(foundItem, 1);
  return response.json({ message: 'Item succesfully deleted' });
});

module.exports = router;
