import api from "@/config/api";
import * as actionTypes from "./ActionTypes";


export const sendMessage = (messageData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.SEND_MESSAGE_REQUEST })
        try {
            const response = await api.post(
                "/api/messages/send",
                messageData
            );
            dispatch({
                type: actionTypes.SEND_MESSAGE_SUCCESS,
                message: response.data,
            });
            console.log("message sent", response.data)
        } catch (error) {
            console.log("Error sending message", error);
            if (error.response) {
                console.log("Error Response:", error.response);
                // You can log the full response to see any data the server might be sending
            }
            dispatch({
                type: actionTypes.SEND_MESSAGE_FAILURE,
                error: error.message,
            });
        }
        
    };
};

export const fetchChatByProject = (projectId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_CHAT_BY_PROJECT_REQUEST });
        try{
            const reponse = await api.get(
                `/api/projects/${projectId}/chat`
            );
            console.log("fetch chat ", reponse.data)
            dispatch({
                type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
                chat : reponse.data
            });
        }catch(error){
            console.log("error --", error)
            dispatch({
                type: actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE,
                error: error.message,
            })
        }
    };
};

export const fetchChatMessages = (chatId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_CHAT_MESSAGES_REQUEST });
        try{
            const response = await api.get(
                `/api/messages/chat/${chatId}`
            );
            console.log("fetch messages ",response.data)
            dispatch({
                type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS, // ✅ Correct action type!
                chatId,
                messages: response.data,
              });
              
        }catch(error){
            console.log("error --",error)
            dispatch({
                type: actionTypes.FETCH_CHAT_MESSAGES_FAILURE,
                error: error.message,
            });
        }
    };
};