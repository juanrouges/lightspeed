const express = require('express');
const app = express();
const itemsRouter = require('./routes/items');
const ExpressError = require('./expressError');

app.use(express.json());
app.use('/items', itemsRouter);

// ========================================
// 404 Handler
// ========================================
app.use((request, response, next) => {
  throw new ExpressError('Path not found', 404);
});
// ========================================
// Global error handler
// ========================================
app.use((error, request, response, next) => {
  response.status(error.status || 500);

  return response.json({
    error: error.message,
  });
});

module.exports = app;
