require('newrelic')
const compression = require('compression');
const express = require('express')
const app = express()

app.use(compression());
require("dotenv").config();
const port = process.env.PORT || 8080
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(cors());
app.options('*', cors());

const router = require("./routes");
router(app, "/news/api");

app.get("*", (req, res) => {
  res.send("Welcome !")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app
