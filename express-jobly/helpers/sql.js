const { BadRequestError } = require('../expressError');

// THIS NEEDS SOME GREAT DOCUMENTATION.

/**
 * params:
 * dataToUpdate = request data to be change
 * jsToSql = sql key map js format to sql format
 **/
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  console.log('DATA TO UPDATE', dataToUpdate);
  console.log('JS TO SQL', jsToSql);

  const keys = Object.keys(dataToUpdate);
  // if resquest data is null thro error
  if (keys.length === 0) throw new BadRequestError('No data');

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    // use jsToSql object to set keys, otherwise use request data keys
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  console.log(
    keys.map((colName, idx) =>
      console.log('JS TO SQL COL NAME', jsToSql[colName])
    )
  );
  console.log(keys.map((colName, idx) => console.log('COL NAME', colName)));

  console.log('COLS', cols.join(', '));
  // COLS "first_name"=$1, "last_name"=$2

  console.log('VALUES', Object.values(dataToUpdate));
  // VALUES [ 'Colin', 'Wood' ]

  return {
    setCols: cols.join(', '),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
