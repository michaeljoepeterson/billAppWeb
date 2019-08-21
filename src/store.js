import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import billReducer from './reducers/allBills';
import voteReducer from './reducers/voteReducer';

export default createStore(
	combineReducers({
		form:formReducer,
		bills:billReducer,
		votes:voteReducer
	}),applyMiddleware(thunk)
);