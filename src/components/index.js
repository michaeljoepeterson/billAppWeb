import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {getBills} from "../actions/allBillActions";
import Loader from './loader';

export class App extends React.Component{
	componentDidMount(){
	    this.props.dispatch(getBills(10));
	 }
	render(){
		let loader;
		console.log(this.props.billData.loading);
		if(this.props.billData.loading){
			loader = <Loader/>;
		}
		return(
			<div>
				{loader}
				{this.props.billData.bills.length}
			</div>
		);
		
	}
}

const mapStateToProps = state => ({
    billData: state.bills
});

export default connect(mapStateToProps)(App);