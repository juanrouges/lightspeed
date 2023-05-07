const express = require("express");
const axios = require("axios");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

async function fetchDevData(name) {
  try {
    const { data } = await axios.get(`https://api.github.com/users/${name}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

app.post("/", async function (req, res, next) {
  const results = [];

  try {
    const developers = req.body.developers;

    for (let item of developers) {
      const dev = await fetchDevData(item);
      results.push({ name: dev.name, bio: dev.bio });
    }

    return res.json(results);
  } catch (err) {
    next(err);
  }
});

// ========================================
// 404 Handler
// ========================================
app.use((request, response, next) => {
  throw new ExpressError("Path not found", 404);
});
// ========================================
// Global error handler
// ========================================
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: `HELLO ${err.message}`,
  });
});

app.listen(3000, function () {
  console.log("App running on port 3000");
});
