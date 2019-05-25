import axios from "axios";

import { ADD_PROGRESS_UPDATE, GET_ERRORS, GET_PROGRESS_UPDATES, PROGRESS_UPDATE_LOADING, DELETE_PROGRESS_UPDATE, GET_PROGRESS_UPDATE, CLEAR_ERRORS } from "./types";

//Add progress update
export const addProgressUpdate = (progressData) => dispatch => {
	dispatch(clearErrors());
	axios.post(`/api/progress_updates/`, progressData)
	.then(res => {
		dispatch({
			type: ADD_PROGRESS_UPDATE,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};


//Add photo
export const addPhoto = (progressData) => dispatch => {
	dispatch(clearErrors());
	axios.post(`/api/progress_updates/`, progressData)
	.then(res => {
		dispatch({
			type: ADD_PROGRESS_UPDATE,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};


//Add like
export const addLike = id => dispatch => {
	axios.post(`/api/posts/like/${id}`)
	.then(res => {
		//dispatch(getPosts());
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Remove like
export const removeLike = id => dispatch => {
	axios.post(`/api/posts/unlike/${id}`)
	.then(res => {
		//dispatch(getPr());
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Delete progress update
export const deleteProgressUpdate = id => dispatch => {
	axios.delete(`/api/posts/${id}`)
	.then(res => {
		dispatch({
			type: DELETE_PROGRESS_UPDATE,
			payload: id
		})
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};


//Get progress updates
export const getProgressUpdates = (clientId) => dispatch => {
	dispatch(setProgressUpdateLoading());
	axios.get(`/api/progress_updates/${clientId}`)
	.then(res => {
		dispatch({
			type: GET_PROGRESS_UPDATES,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_PROGRESS_UPDATES,
			payload: null
		})
	);
};

//Get post
export const getProgressUpdate = (client_id, id) => dispatch => {
	dispatch(setProgressUpdateLoading());
	axios.get(`/api/posts/${client_id}/${id}`)
	.then(res => {
		dispatch({
			type: GET_PROGRESS_UPDATES,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_PROGRESS_UPDATES,
			payload: null
		})
	);
};

//Add comment
export const addComment = (postId, commentData) => dispatch => {
	dispatch(clearErrors());
	axios.post(`/api/posts/comment/${postId}`, commentData)
	.then(res => {
		dispatch({
			type: GET_PROGRESS_UPDATE,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Delete comment
export const deleteComment = (postId, commentId) => dispatch => {
	axios.delete(`/api/posts/comment/${postId}/${commentId}`)
	.then(res => {
		dispatch({
			type: GET_PROGRESS_UPDATE,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Set loading state
export const setProgressUpdateLoading = () => {
	return {
		type: PROGRESS_UPDATE_LOADING
	}
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	}
};