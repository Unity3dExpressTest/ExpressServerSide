console.log("Started");

var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());

var sqlite3	= require('sqlite3').verbose();
var dbName = './test.db';
var db = new sqlite3.Database(dbName);

app.get('/', function (req, res) {
  res.send('Hello World!');
});