const express = require('express');
const app = express();
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const client = redis.createClient('redis://localhost:6379');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
   <html lang="en">
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <meta http-equiv="X-UA-Compatible" content="ie=edge" />
         <title>Document</title>
      </head>
      <body>
         hi there
         <form action="/" method="post">
            <input type="number" name="number" placeholder="a number" />
            <input type="submit" />
         </form>
      </body>
   </html>
`);
});

const getResultFromCache = (number, res) => {
  let CacheTime = Date.now();
  client.get(number, (error, result) => {
    if (result) {
      console.log('Cache request took', Date.now() - CacheTime, 'Milliseconds');
      // redirect to display the result & source
      res.redirect('/done?result=' + result + '&from=cache');
    } else {
      console.log('error');
    }
  });
};

const getResultFromAPI = (number, res) => {
  let ApiTime = Date.now();
  axios
    .post('http://localhost:3000/', {
      number: number,
    })
    .then((response) => {
      console.log('API Request took', Date.now() - ApiTime, 'Milliseconds');
      let result = response.data.result;
      client.set(number, result);
      client.expire(number, 60);
      res.redirect('/done?result=' + result + '&from=API');
    })
    .catch((error) => {
      console.log(error);
    });
};

app.post('/', (req, res) => {
  let number = req.body.number;
  client.exists(number, (error, result) => {
    if (result) {
      getResultFromCache(number, res);
    } else {
      getResultFromAPI(number, res);
    }
  });
});

app.get('/done', (req, res) => {
  res.send(`
   <html>
      <head>
      </head>
      <body>
      The Result is: ${req.query.result}
      <br/>
      So the original value is ${req.query.result / 2}
      <br/>
      And comes from: ${req.query.from}
      </body>
   </html>
   `);
});

app.listen(8080);
