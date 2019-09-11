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


router.get('/', function (req, res, next) {
    var response = new httpResponse();
    let from = req.query.from;
    let to = req.query.to;
    if (!from || !to) {
        response.setError("Not authorized");
        console.log("Not authorized GET /messages/");
        res.json(response);
        return;
    }

    let q = "SELECT * FROM `messages` WHERE (from_id = ? AND to_id = ?) OR (from_id = ? AND to_id = ?)";
    con.query(q, [from, to, to, from], function(err, result) {
        if (err) {
            response.setError("Could not connect to the database");
            console.log("Could not connect to the database GET /messages/");
            res.json(response);
            return;
        }
        response.data = result;
        response.message = "Got all messages";
        res.json(response);
    })
})

router.put('/', function (req, res, next) {
    let from = req.body.fromId;
    let to = req.body.toId;
    let message = req.body.message
    let response = new httpResponse();

    if (!from || !to || !message) {
        response.setError("Not authorized");
        console.log("Not authorized PUT /messages/");
        res.json(response);
        return;
    }

    let q = "INSERT INTO `messages` (`from_id`, `to_id`, `message`) VALUES (?, ?, ?);";
    con.query(q, [from, to, message], function(err, result) {
        if (err) {
            response.setError("Could not connect to the database");
            console.log("Could not connect to the database PUT /messages/");
            res.json(response);
            return;
        }
        response.message = "Message added."
        res.json(response);
    })


});



module.exports = router;
