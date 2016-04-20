var pg = require('pg');
var config = require(__dirname + '/../../config/config.json')[env];
var connectionString = 'postgres://' + config.host + ':' + config.port + '/' + config.database;

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });