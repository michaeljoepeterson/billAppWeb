import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';

export const GET_VOTES_REQUEST = "GET_VOTES_REQUEST";

export const get_votes_request = () =>({
	type:GET_VOTES_REQUEST
});

export const GET_VOTES_SUCCESS = "GET_VOTES_SUCCESS";

export const get_votes_success = (voteData) =>({
	type:GET_VOTES_SUCCESS,
	voteData
});

export const GET_VOTES_ERROR = "GET_VOTES_ERROR";

export const get_votes_error = (voteError) =>({
	type:GET_VOTES_ERROR,
	voteError
});

export const VOTE_REQUEST = 'VOTE_REQUEST';

export const voteRequest = () => ({
	type: VOTE_REQUEST
});

export const VOTE_SUCCESS = 'VOTE_SUCCESS';

export const voteSuccess = (results) => ({
	type: VOTE_SUCCESS,
	results
});

export const VOTE_ERROR = 'VOTE_ERROR';

export const voteError = (error) => ({
	type: VOTE_ERROR,
	error
});

export const castVote = (legId,vote,email) => (dispatch) => {
	dispatch(voteRequest());
	return(
		fetch(`${API_BASE_URL}/vote?legid=${legId}`,{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				vote,
				email
			})
		})
		.then(res => res.json())
		.then(data => dispatch(voteSuccess(data)))
		.catch(err => {
			dispatch(voteError(err));
		})
	);
}