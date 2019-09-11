import axios from 'axios';

export const checkIfUserExists = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await axios.get('/users/checkUsernameExists/?username=' + user);
            resolve(result.data.data);
        } catch (err) {
            reject(err);
        }
    })
}

export const checkLogin = async (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await axios.get(`/users/loginCheck/?username=${username}&password=${password}`);
            resolve(result.data.data);
        } catch (err) {
            reject(err);
        }
    })
}



export const putNewUser = async (username, password, display_name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await axios({
                url: '/users/newUser/',
                method: "put",
                data: {
                    username: username,
                    password: password,
                    display_name: display_name
                }
            });
            resolve(result);
        } catch (err) {
            reject(err);
        }
    })
}

export const checkIfLoggedIn = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await axios.get('/general/checkedIfLoggedIn');
            resolve(result.data.data);
        } catch (err) {
            reject(err);
        }
    })
}

export const getUserList = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await axios.get('/users/');
            resolve(result);
        } catch (err) {
            reject(err);
        }
    })
}

export const logoutFromUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await axios.post('/general/logout/');
            resolve(true);
        } catch (err) {
            reject(err);
        }
    })
}

export const pushMessage = (fromId, toId, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await axios({
                url: '/messages/',
                method: 'PUT',
                data: {
                    fromId: fromId,
                    toId: toId,
                    message: message
                }
            });
            resolve(result);
        } catch (err) {
            reject(err);
        }
    })
}

export const getSelfId = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await axios.get('/general/selfId/');
            resolve(result);
        } catch (err) {
            reject(err);
        }
    })
}

export const getMessages = (from, to) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = `/messages/?from=${from}&to=${to}`;
            let result = await axios.get(url);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    })
}

export const updateSocketId = (id, socketId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = `/general/updateSocket/`
            let result = await axios({
                url: url,
                method: "POST",
                data: {
                    id: id,
                    socketId: socketId
                }
            })

            resolve(result);
        }catch(err) {
            reject(err);
        }
    })
}

export const getSocketById = (id) => {
    return new Promise(async (resolve,reject) => {
        try {
            let url = `general/getSocket/?id=${id}`
            let result = await axios.get(url);
            resolve(result);
        }catch(err) {
            reject(err);
        }
    })
}