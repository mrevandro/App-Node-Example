var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var config = require(__dirname + '/../../config/config.json')['development'];
var connectionString = 'postgres://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.database;


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});


router.post('/api/v1/aluno', function (req, res) {

    var results = [];

    // Grab data from http request
    var data = {nome: req.body.nome, email: req.body.email};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO aluno(nome, email) values($1, $2)", [data.nome, data.email]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM aluno ORDER BY nome ASC");

        // Stream results back one row at a time
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });


    });
});

router.get('/api/v1/aluno', function (req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM aluno ORDER BY nome ASC;");

        // Stream results back one row at a time
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });

    });

});

router.put('/api/v1/aluno/:aluno_id', function (req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.aluno_id;

    // Grab data from http request
    var data = {nome: req.body.nome, email: req.body.email};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).send(json({success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE aluno SET nome=($1), email=($2) WHERE id=($3)", [data.nome, data.email, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM aluno ORDER BY nome ASC");

        // Stream results back one row at a time
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });

});

router.delete('/api/v1/aluno/:aluno_id', function (req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.aluno_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM aluno WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM aluno ORDER BY nome ASC");

        // Stream results back one row at a time
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });

});


module.exports = router;