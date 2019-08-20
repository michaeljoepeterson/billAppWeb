import {API_BASE_URL} from '../config';

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