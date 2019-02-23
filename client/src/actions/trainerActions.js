import axios from "axios";

import {GET_CLIENT_LIST} from "./types";

// Get current profile
export const getCurrentClients = () => dispatch => {
	axios.get("/api/users/clients")
	.then(res => 
		dispatch({
			type: GET_CLIENT_LIST,
			payload: res.data
		})
	)
	.catch(err => 
		dispatch({
			type: GET_CLIENT_LIST,
			payload: {}
		})
	)
}