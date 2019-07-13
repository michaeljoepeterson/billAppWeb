import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {getBills} from "../actions/allBillActions";
import {Slideshow} from './slideshow';
import Loader from './loader';

export class App extends React.Component{

	constructor(props){
		super(props);
		this.slideId = "test-slideshow";
	}
	componentDidMount(){
	    this.props.dispatch(getBills(10));
	}
	//will need to do something like this to render buttons outside of box and still interact with box
	buttonClicked(event){
		let slideshow = document.getElementById(this.slideId);
		console.log(slideshow);
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
				<Slideshow slideId={this.slideId}/>
				<button onClick={(e)=>this.buttonClicked(e)}>test</button>
			</div>
		);
		
	}
}

const mapStateToProps = state => ({
    billData: state.bills
});

export default connect(mapStateToProps)(App);