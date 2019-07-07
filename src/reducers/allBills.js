import{
	GET_BILLS_REQUEST,
	GET_BILLS_SUCCESS,
	GET_BILLS_ERROR
} from '../actions/allBillActions';

const initialState  = {
	loading:null,
	error:null,
	message:null,
	limit:20,
	bills:[]
};

export default function reducer(state = initialState,action){
	if(action.type === GET_BILLS_REQUEST){
		return Object.assign({},state,{
			loading:true,
			error:null,
			message:null
		});
	}

	else if(action.type === GET_BILLS_SUCCESS){
		console.log("state: ",state,action)
		return Object.assign({},state,{
			loading:null,
			error:null,
			message:"success",
			bills:action.billData.data
		});
	}

	else if(action.type === GET_BILLS_ERROR){
		return Object.assign({},state,{
			loading:null,
			error:null,
			message:"error getting bills",
			error:action.billError
		});
	}

	return state;
}