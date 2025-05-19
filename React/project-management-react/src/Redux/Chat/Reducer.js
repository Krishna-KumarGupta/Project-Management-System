import * as actionTypes from "./ActionTypes";

const initialState = {
    projects: [],
    loading: false,
    error: null,
    chat: null,
    messages: [],
};

const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MESSAGES_REQUEST:
        case actionTypes.SEND_MESSAGE_REQUEST:
        case actionTypes.FETCH_CHAT_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.FETCH_MESSAGES_SUCCESS:
        case actionTypes.FETCH_CHAT_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.messages,
            };
        case actionTypes.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                // Add the new message to the existing messages array
                messages: [...state.messages, action.message],  // Fixed from action.messages to action.message
            };
        case actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                chat: action.chat,
            };
        case actionTypes.FETCH_MESSAGES_FAILURE:
        case actionTypes.SEND_MESSAGE_FAILURE:
        case actionTypes.FETCH_CHAT_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,  // Set error in the error field instead of chat
            };
        default:
            return state;
    }
};

export default ChatReducer;
