const checkIfUsernameExists = async (username, db) => {
    return new Promise((resolve,reject) => {
        try{
            db.query('SELECT COUNT(*) as num FROM users WHERE username = ?',
                [
                    username
                ],
                function (err, result) {
                    if (err) throw err;
                    resolve(!(result[0].num === 0));
                })
        }catch(err){

        }
    })
}

const authRegister = async (username, password, display_name, db_con) => {
    let result = {
        valid: false,
        error_message: ""
    }

    if (!username || !password || !display_name) {
        result.error_message = "You are not authorized!";
        return result;
    }

    if (username === "" || password === "") {
        result.error_message = "You must enter username and password";
        return result;
    }

    if (username.length < 4) {
        result.error_message = "Username must be atleast 4 characters long";
        return result;
    }

    

    let userExists = await checkIfUsernameExists(username, db_con);
    if (userExists) {
        result.error_message = "User already exists";
        return result;
    }

    if (password.length < 6) {
        result.error_message = "Password must be atleast 6 characters long";
        return result;
    }

    if (display_name.length < 4) {
        result.error_message = "Display name must be atleast 6 characters long";
        return result;
    }


    result.valid = true;
    return result;
}

module.exports = {
    authRegister
}