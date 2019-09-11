import { FETCH_USERS } from './types';
import { getUserList } from '../Modules/APIGateway';
export function fetchUsers() {
    return function (dispatch) {
        getUserList().then( data => {
            dispatch({
                type: FETCH_USERS,
                payload: data.data.data
            })
        });
    }
}