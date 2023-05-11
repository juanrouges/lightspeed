const db = require("../db");
const express = require("express");
const router = new express.Router();

router.get("/", async (req, res) => {
  const companiesList = await db.query("SELECT * FROM companies");
  return res.json({ companies: companiesList.rows });
});

module.exports = router;
