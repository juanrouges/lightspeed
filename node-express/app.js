const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Node Express Exercise');
});

app.get('/mean', (req, res) => {
  const numsQuery = req.query.nums;
  const numsString = numsQuery.replace(/\D/g, '');
  const nums = [];
  let numSum = 0;

  for (let num of numsString) {
    nums.push(num);
  }

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
