import * as actionTypes from "./ActionTypes";

const initialState = {
    comments: [],
    loading: false,
    error: null,
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_COMMENT_REQUEST:
        case actionTypes.DELETE_COMMENT_REQUEST:
        case actionTypes.FETCH_COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, action.comment],  // Changed messages to comments
            };
        case actionTypes.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: state.comments.filter(
                    (comment) => comment.id !== action.commentId
                ),
            };
        case actionTypes.FETCH_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: action.comments, // Use the fetched comments instead of adding
            };

        case actionTypes.FETCH_COMMENT_FAILURE:
        case actionTypes.DELETE_COMMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default commentReducer;
