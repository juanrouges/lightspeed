const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

/**
 * dataToUpdate = request data to be change
 * jsToSql = sql keys
 **/

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  console.log("DATA TO UPDATE", dataToUpdate);
  console.log("JS TO SQL", jsToSql);

  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  console.log("KEYS", keys);

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    // Why jsToSql[colName] if not exist why colName
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  console.log(
    keys.map((colName, idx) =>
      console.log("JS TO SQL COL NAME", jsToSql[colName])
    )
  );
  console.log(keys.map((colName, idx) => console.log("COL NAME", colName)));

  console.log("COLS", cols);

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
