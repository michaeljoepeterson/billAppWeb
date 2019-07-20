import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {getBills} from "../actions/allBillActions";
import Slideshow from './slideshow';
import arrow from '../assets/arrow.png';
import Loader from './loader';

export class App extends React.Component{

	constructor(props){
		super(props);
		this.slideId = "test-slideshow";
		this.slideTransition = 500;
	}
	componentDidMount(){
	    this.props.dispatch(getBills(10));
	    this.getSlideWidth();
	    this.setState();
	    //console.log(this.slideWidth);
	}
	//will need to do something like this to render buttons outside of box and still interact with box
	buttonClicked(event){
		let slideshow = document.getElementById(this.slideId);
		console.dir(this.props);
		console.log(slideshow.clientWidth);
	}

	getSlideWidth(){
		let slideshow = document.getElementById(this.slideId);
		this.slideWidth = slideshow.clientWidth + "px";
	}

	render(){
		let loader;
		//react way wont work since calls to api will be called on resize
		//can use the initial width from here on first render
		//will need to adjust transform on resze with js on the existing slides
		//need to use initial width so that if a rerender occrurs slides will be in correct place

		if(this.props.billData.loading){
			loader = <Loader/>;
		}
		return(
			<div>
				{loader}
				{this.props.billData.bills.length}
				<Slideshow slideId={this.slideId} billData={this.props.billData} slideTransition={this.slideTransition}/>
				<button onClick={(e)=>this.buttonClicked(e)}>test</button>
			</div>
		);
		
	}
}

const mapStateToProps = state => ({
    billData: state.bills
});

export default connect(mapStateToProps)(App);