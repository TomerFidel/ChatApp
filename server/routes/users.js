var express = require('express');
var {authRegister} = require('../modules/auth');
var httpResponse = require('../modules/httpResponse');
var mysql = require('mysql');
var router = express.Router();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat"
});

/*********************** USER MANAGMENT *******************/
// Get user list from server
router.get('/', function(req,res,next) {
    var response = new httpResponse();
    if (!req.session.loggedIn) {
        response.setError("Not logged in");
        console.log("Not logged in GET /users/");
        res.json(response);
        return;
    } // Not authorized

    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) {
            response.setError("Could not connect to the database");
            console.log("Could not connect to the database GET /users/");
            res.json(response);
            return;
        }

        var new_result = result.map(val => {
            return {
                id: val.id,
                display_name: val.display_name
            };
        });

        response.message = "Got all users!";
        response.data = new_result;
        res.json(response);
    });
});

//  Add new user to the database
router.put('/newUser/', async function(req, res, next) {

    var response = new httpResponse();
    let username = req.body.username;
    let password = req.body.password;
    let display_name = req.body.display_name;
    
    let auth = await authRegister(username, password, display_name, con);
    if (auth.valid) {
        // add user
        let q = 'INSERT INTO users (`username`, `password`, `display_name`) VALUES (?, ?, ?)';

        con.query(q, [ username, password, display_name ], function (err, result) {
            if (err) {
                response.setError("Could not connect to the database");
                console.log("Could not connect to the database PUT users/newUser/");
                res.json(response);
                return;
            }

            console.log(result);
            con.query(`INSERT INTO open_sockets (user_id) VALUES (${result.insertId})`, function (err2, result) {
                if (err2) {
                    response.setError("Could not connect to the database");
                    console.log("Could not connect to the database PUT users/newUser/");
                    res.json(response);
                    return;
                }
                response.message = "User added succesfully!";
                res.json(response);
            })

        })         
    } else {
        console.log("Authorization error: ", auth.error_message);
        res.end(auth.error_message);
    }
            
});
        
/*********************** REGISTRATION AUTHENTICATION ****************/     
// Check if username exists already.
router.get('/checkUsernameExists/', function (req, res, next) {
    var response = new httpResponse();
    let username = req.query.username;

    if (!username) {
        response.setError("Not authorized");
        console.log("Not authorized GET users/checkUsernameExists/");
        res.json(response);
        return;
    }
            
    let q = 'SELECT COUNT(*) as num FROM users WHERE username = ?';
    con.query(q, [ username ], function (err, result) {
        if (err) {
            response.setError("Could not connect to the database");
            console.log("Could not connect to the database GET users/checkUsernameExists/");
            res.json(response);
            return;
        }
        
        response.message = "Check ended";
        response.data = result[0].num === 0 ? false : true; // if user exists condition
        res.json(response);
    })
});

/*************************** LOGIN AUTHENTICATION *****************/
// Check if username and password is correct
router.get('/loginCheck/', function(req, res, next) {
    var response = new httpResponse();
    let username = req.query.username;
    let password = req.query.password;

    if (!username || !password) {
        response.setError("Not authorized");
        console.log("Not authorized GET /users/loginCheck/");
        res.json(response);
        return;
    }
    
    let q = 'SELECT * FROM users WHERE username = ? AND password = ?';
    con.query('SELECT * FROM users WHERE username = ? AND password = ?' , [ username, password ], function (err, result) {
        if (err) {
            response.setError("Could not connect to the database");
            console.log("Could not connect to the database GET /users/loginCheck/");
            res.json(response);
            return;
        }

        response.message = "Login check ended";
        console.log("Result: ", result);
        response.data = result.length === 0 ? false : true;

        if (response.data) {
            req.session.loggedIn = true;
            req.session.loginId = result[0].id;
        }
        res.json(response);
    })
});

module.exports = router;
