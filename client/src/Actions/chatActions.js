import { SET_CURRENT_CHAT_USER, SET_SELF_ID, SET_MESSAGES } from './types';
import { getMessages } from '../Modules/APIGateway';

export function setChatUser(id, name, myId) {
    return function (dispatch) {
        getMessages(id, myId).then( data => {
            dispatch({
                type: SET_CURRENT_CHAT_USER,
                payload: {
                    id: id,
                    name: name,
                    messages: data.data.data
                }
            })
        })
    }
}

export function fetchMessages(from, to) {
    return function(dispatch) {
        getMessages(from,to).then( data => {
            dispatch({
                type: SET_MESSAGES,
                payload: data.data.data
            })
        })
    }
}

export function setSelfId(id) {
    return function (dispatch) {
        dispatch({
            type: SET_SELF_ID,
            payload: id
        })
    }
}