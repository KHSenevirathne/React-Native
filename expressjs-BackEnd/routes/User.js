const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../configs/db.configs');
const { query } = require('express');

const connection = mysql.createConnection(db.database);

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to the MySQL Server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS users (fullName VARCHAR(255), contact INT, username VARCHAR(255) PRIMARY KEY,password VARCHAR(255))";
        connection.query(userTableQuery, function (err, result) {
            if (result.warningCount === 0) {
                console.log("User table created");
            }
        })
    }
})

router.post('/', (req, res) => {
    const fullName = req.body.fullName;
    const contact = req.body.contact;
    const username = req.body.username;
    const password = req.body.password;

    var query = "INSERT INTO users (fullName,contact,username,password) VALUES (?,?,?,?)";

    connection.query(query, [fullName, contact, username, password], (err) => {
        if (err) {
            res.send({
                "status": "500",
                "message": "Username Already Exists!"
            });
        } else {
            res.send({
                "status": "200",
                "message": "User saved successfully"
            });
        }
    })

});

router.get('/login/:username/:password', (req, res) => {
    const username = req.params.username
    const password = req.params.password;

    var query = "SELECT * FROM users WHERE username=? AND password=?";

    connection.query(query, [username, password], (err, row) => {
        if (err) {
            console.log(err);
        } else {
            res.send(row);
        }
    })
})

module.exports = router