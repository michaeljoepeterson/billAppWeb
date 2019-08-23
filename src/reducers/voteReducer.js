import{
	GET_VOTES_REQUEST,
	GET_VOTES_SUCCESS,
	GET_VOTES_ERROR,
	VOTE_REQUEST,
	VOTE_SUCCESS,
	VOTE_ERROR

} from '../actions/voteActions';

const initialState  = {
	loading:null,
	error:null,
	message:null,
	limit:20,
	voteResult:null
};

export default function reducer(state = initialState,action){
	if(action.type === GET_VOTES_REQUEST){
		return Object.assign({},state,{
			loading:true,
			error:null,
			message:null
		});
	}

	else if(action.type === GET_VOTES_SUCCESS){
		//console.log("state: ",state,action)
		return Object.assign({},state,{
			loading:null,
			error:null,
			message:"success",
			voteResult:action.voteData.data
		});
	}

	else if(action.type === GET_VOTES_ERROR){
		return Object.assign({},state,{
			loading:null,
			error:null,
			message:"error getting votes",
			error:action.voteError
		});
	}

	else if(action.type === VOTE_REQUEST){
		return Object.assign({},state,{
			loading:true,
			error:null,
			message:null
		});
	}

	else if(action.type === VOTE_SUCCESS){
		return Object.assign({},state,{
			loading:null,
			message:'successful vote',
			voteResult:action.results
		});
	}

	else if(action.type === VOTE_ERROR){
		return Object.assign({},state,{
			loading:null,
			message:'error',
			voteResult:action.error
		});
	}

	return state;
}