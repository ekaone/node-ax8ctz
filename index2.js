const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req.body.number);

  res.send({
    result: req.body.number * 2,
  });
});

app.listen(3000);
