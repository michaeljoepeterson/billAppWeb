import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import billReducer from './reducers/allBills';

export default createStore(
	combineReducers({
		form:formReducer,
		bills:billReducer
	}),applyMiddleware(thunk)
);