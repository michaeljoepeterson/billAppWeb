import {API_BASE_URL} from '../config';

export const GET_BILLS_REQUEST = "GET_BILLS_REQUEST";

export const get_bills_request = () =>({
	type:GET_BILLS_REQUEST
});

export const GET_BILLS_SUCCESS = "GET_BILLS_SUCCESS";

export const get_bills_success = (billData) =>({
	type:GET_BILLS_SUCCESS,
	billData
});

export const GET_BILLS_ERROR = "GET_BILLS_ERROR";

export const get_bills_error = (billError) =>({
	type:GET_BILLS_ERROR,
	billError
});

export const getBills = (limit) => (dispatch, getState) => {
	dispatch(get_bills_request());
	return(fetch(`${API_BASE_URL}/bills?limit=${limit}`,{
			method:"GET"
		})
		.then(res => {
			return res.json()
		})
		.then(billData => {
			//console.log(billData);
			dispatch(get_bills_success(billData));
		})

		.catch(err => {
			dispatch(get_bills_error(err));
		})
	);
}