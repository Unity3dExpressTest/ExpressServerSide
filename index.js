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

//Returns all users id
app.get('/users', function (req, res) {
	db.all("SELECT id FROM users", function(err, rows) {
		console.log(rows);
		var json = JSON.stringify(rows);
		console.log(json);

		res.type('text/plain');
  		res.send(json);
	});
});

//Adds user if user doesn't exist. Updates user if user exists
app.post('/user', function (req, res) {
	var stmt = db.prepare("INSERT OR REPLACE INTO users (id,name,x,y) VALUES (?, ?, ?, ?)");
	stmt.run(req.body.id, req.body.name, req.body.x, req.body.y);
	stmt.finalize();

	//console.log("Added User");
	
	// db.each("SELECT id, name, x, y FROM users", function(err, row) {
	//   console.log(row.id + ": " + row.name + " loc: " + row.x + ", " + row.y);
	// });

	res.send(req.body);
});

app.post('/test', function (req, res) {
	console.log(req.body);

	res.send(req.body);
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});