var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/animaldb';
var randomNumberGen = require('../modules/randomNumberGen');

app.listen( 3000, "localhost", function(req, res){
  console.log("Server listening on 3000");
});

app.use(express.static('public'));

app.get("/", function(req, res){
  console.log("From base url");
  res.sendFile(path.resolve('./views/index.html'));
});

app.post("/createAnimal", urlencodedParser, function(req, res){
  console.log("in POST with: " + req.body.name);

  pg.connect( connectionString, function(err, client, done){
    var query = client.query("INSERT INTO animal_table2 (animal_name, animal_quantity) VALUES ($1, $2)", [req.body.name, randomNumberGen()]);
    query.on('end', function(){
      console.log("POST END");
      return res.end();
    });
  });


});

app.get("/update", function(req, res){

  console.log("in /update");
  var results = [];

  pg.connect( connectionString, function(err, client, done){
    var query = client.query("SELECT * FROM animal_table2");
    var rows = 0;
    query.on( 'row', function ( row ){
      results.push( row );
    });
    query.on( 'end', function (){
      return res.json( results );
    });
  });

});
