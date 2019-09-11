import { checkIfUserExists, checkLogin } from './APIGateway';

const AuthRegister = async (username, password, display_name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {
                valid: false,
                error_message: ""
            }

            if (username === "" || password === "" || display_name === "") {
                result.error_message = "You must enter all required fields";
                resolve(result);
                return;
            }

            if (username.length < 4) {
                result.error_message = "Username must be atleast 4 characters long";
                resolve(result);
                return;
            }

            let userExists = await checkIfUserExists(username);
            if (userExists) {
                result.error_message = "User already exists";
                resolve(result);
                return;
            }

            if (password.length < 6) {
                result.error_message = "Password must be atleast 6 characters long";
                resolve(result);
                return;
            }

            if (display_name.length < 4) {
                result.error_message = "Display name must be atleast 4 characters long";
                resolve(result);
                return;
            }


            result.valid = true;
            resolve(result);
        } catch (err) {
            reject(err);
        }
    })
}

const authLogin = async (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {
                valid: false,
                error_message: ""
            }
            if (username === "" || password === "") {
                result.error_message = "Please enter username and password";
                resolve(result);
                return;
            }

            let checkLoginResult = await checkLogin(username, password);
            if (!checkLoginResult) {
                result.error_message = "Wrong username or password";
                resolve(result);
                return;
            }

            result.valid = true;

            resolve(result);

        } catch (err) {
            reject(err);
        }
    })
}

export { AuthRegister, authLogin }