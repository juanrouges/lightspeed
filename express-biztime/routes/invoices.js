const db = require("../db");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");

router.get("/", async (req, res, next) => {
  try {
    const invoicesList = await db.query("SELECT * FROM invoices");
    return res.json({ invoices: invoicesList.rows });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
