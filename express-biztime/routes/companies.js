const db = require('../db');
const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');

router.get('/', async (req, res, next) => {
  try {
    const companiesList = await db.query('SELECT * FROM companies');
    return res.json({ companies: companiesList.rows });
  } catch (err) {
    return next(err);
  }
});

router.get('/:code', async (req, res, next) => {
  const companyCode = req.params.code;
  try {
    const foundCompany = await db.query(
      'SELECT * FROM companies WHERE code = $1',
      [companyCode]
    );

    if (foundCompany === 0) {
      let notFoundErr = new Error(
        `There is no company found with the code ${companyCode}`
      );
      notFoundErr.status = 404;
      throw notFoundErr;
    }
    return res.json({ company: foundCompany.rows[0] });
  } catch (err) {
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  const newCompany = {
    code: req.body.code,
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const addCompany = await db.query(
      `INSERT INTO companies (code, name, description) 
      VALUES ($1, $2, $3) 
      RETURNING code, name, description`,
      [newCompany.code, newCompany.name, newCompany.description]
    );

    return res.status(201).json({ company: addCompany.rows[0] });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
