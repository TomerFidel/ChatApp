import { SET_CURRENT_CHAT_USER, SET_SELF_ID, SET_MESSAGES } from '../Actions/types';

const initialState = {
    myId: null,
    id: null,
    name: null,
    messages: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_CHAT_USER:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                messages: action.payload.messages
            }
        case SET_SELF_ID:
            return {
                ...state,
                myId: action.payload
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
}