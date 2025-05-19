import api from "@/config/api";
import * as actionTypes from "./ActionTypes";

export const fetchIssues = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ISSUE_REQUEST });
        try {
            const response = await api.get(`/api/issues/project/${id}`);
            console.log("fetch issues ", response.data)
            dispatch({
                type: actionTypes.FETCH_ISSUE_SUCCESS,
                issues: response.data,
            });
        } catch (error) {
            console.log("error ", error)
            dispatch({
                type: actionTypes.FETCH_ISSUE_FAILURE,
                error: error.message,
            });
        }
    };
};

// made changes here

export const createIssue = (issueData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });

        try {
            console.log("Sending issueData:", issueData);
            const response = await api.post("/api/issues", issueData);  
            dispatch({
                type: actionTypes.CREATE_ISSUE_SUCCESS,
                issue: response.data,
            });
            console.log("issue created successfully", response.data);

        } catch (error) {
            console.error("Error creating issue:", error);
            dispatch({
                type: actionTypes.CREATE_ISSUE_FAILURE,
                error: error.message,
            });
        }
    };
};

export const deleteIssue = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });
        try {
            const response = await api.delete(`/api/issues/${id}`);
            console.log("Issue deleted successfully", response.data);

            dispatch({
                type: actionTypes.DELETE_ISSUE_SUCCESS,
                issueId: id, // Make sure this matches your reducer!
            });
            console.log("Dispatching DELETE_ISSUE_SUCCESS with issueId:", id);
        } catch (error) {
            console.error("Error deleting issue:", error);

            dispatch({
                type: actionTypes.DELETE_ISSUE_FAILURE,
                error: error.message,
            });
        }
    };
};

//   to here

export const fetchIssueById = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });
        try {
            const response = await api.get(`/api/issues/${id}`);
            console.log("fetch issues by id ", response.data)
            dispatch({
                type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
                issues: response.data,
            });
        } catch (error) {
            console.log("error ", error)
            dispatch({
                type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE,
                error: error.message,
            });
        }
    };
};

export const updateIssueStatus = ({id, status}) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
        try {
            const response = await api.put(`/api/issues/${id}/status/${status}`);
            console.log("update issues status ", response.data)
            dispatch({
                type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
                issues: response.data,
            });
        } catch (error) {
            console.log("error ", error)
            dispatch({
                type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
                error: error.message,
            });
        }
    };
};      

export const assignedIssueToUser = (issueId, userId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
        try {
            const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
            console.log("assigned issues --- ", response.data)
            dispatch({
                type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
                issue: response.data,
            });
        } catch (error) {
            console.log("error ", error)
            dispatch({
                type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
                error: error.message,
            });
        }
    };
};