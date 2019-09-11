var express = require('express');
var httpResponse = require('../modules/httpResponse');
var mysql = require('mysql');
var router = express.Router();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat"
});

/************************ SESSION MANAGMENT ************************/
// Check if session exists(user logged in)
router.get('/checkedIfLoggedIn/', function (req, res, next) {
    var response = new httpResponse();
    response.message = "Checked if user is authorized to see this page.";
    response.data = req.session.loggedIn ? true : false;
    res.json(response);
});

// Delete session = logout
router.post('/logout/', function (req, res, next) {
    req.session.loggedIn = false;
    var response = new httpResponse();
    response.message = "Logout completed";
    res.json(response);
})

router.get('/selfId/', function (req, res, next) {
    var response = new httpResponse();
    if (req.session.loggedIn) {
        response.data = req.session.loginId;
        response.message = "Got self id";
    }

    res.json(response);
})


/********************** SOCKET MANAGMENT ****************/
router.post('/updateSocket/', function (req, res, next) {
    var response = new httpResponse();

    if (!req.session.loggedIn) {
        response.setError("Not logged in");
        console.log("Not logged in GET /users/");
        res.json(response);
        return;
    } // Not authorized

    let id = req.body.id;
    let socketId = req.body.socketId;

    if (!id || !socketId) {
        response.setError("Not authorized");
        console.log("Not authorized GET users/id/");
        res.json(response);
        return;
    }


    let q = `UPDATE open_sockets SET socket_id = ? WHERE user_id = ?`;
    con.query(q, [socketId, id], function (err, result) {
        if (err) {
            response.setError("Could not connect to the database");
            console.log("Could not connect to the database PUT users/newUser/");
            res.json(response);
            return;
        }

        response.message = "Socket id updated succesfuly";
        res.json(response);
    })
})

router.get('/getSocket/', function (req, res, next) {
    var response = new httpResponse();

    if (!req.session.loggedIn) {
        response.setError("Not logged in");
        console.log("Not logged in GET /users/");
        res.json(response);
        return;
    } // Not authorized

    let id = req.query.id;

    if (!id) {
        response.setError("Not authorized");
        console.log("Not authorized GET users/id/");
        res.json(response);
        return;
    }


    let q = `SELECT * FROM open_sockets WHERE user_id = ?`;
    con.query(q, [id], function (err, result) {
        if (err) {
            response.setError("Could not connect to the database");
            console.log("Could not connect to the database PUT users/newUser/");
            res.json(response);
            return;
        }

        response.message = "Socket id fetched";
        response.data = result;
        res.json(response);
    })
})

module.exports = router;