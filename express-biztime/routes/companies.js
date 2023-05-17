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
      `SELECT * FROM companies 
      WHERE code = $1`,
      [companyCode]
    );

    if (foundCompany.rows.length === 0) {
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

router.put('/:code', async (req, res, next) => {
  try {
    let { name, description } = req.body;
    let code = req.params.code;

    const result = await db.query(
      `UPDATE companies 
      SET name=$1, description=$2 
      WHERE code = $3 
      RETURNING code, name, description`,
      [name, description, code]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`No such company: ${code}`, 404);
    } else {
      return res.json({ company: result.rows[0] });
    }
  } catch (err) {
    return next(err);
  }
});

router.delete('/:code', async (req, res, next) => {
  try {
    let code = req.params.code;

    const result = await db.query(
      `DELETE FROM companies 
      WHERE code=$1 
      RETURNING code`,
      [code]
    );

    if (result.rows.length == 0) {
      throw new ExpressError(`No such company: ${code}`, 404);
    } else {
      return res.json({ status: 'deleted' });
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
