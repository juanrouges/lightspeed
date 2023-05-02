const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Node Express Exercise');
});

app.get('/mean', (req, res) => {
  const numsQuery = req.query.nums;
  const nums = numsQuery.split(',');
  let numSum = 0;

  for (let item of nums) {
    numSum = numSum + Number(item);
  }

  let mean = numSum / nums.length;

  res.send(`The average number of num is ${mean}`);
});

app.get('/median', (req, res) => {
  res.send('Median route');
});

app.get('/mode', (req, res) => {
  res.send('Mode route');
});

app.listen(3000, function () {
  console.log('App on port 3000');
});
