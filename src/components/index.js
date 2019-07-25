import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {getBills} from "../actions/allBillActions";
import Slideshow from './slideshow';
import Arrow from './arrow';
import Loader from './loader';

export class App extends React.Component{

	constructor(props){
		super(props);
		this.slideId = "test-slideshow";
		this.slideTransition = 500;
		this.state = {
			slideHeight:""
		};
	}
	componentDidMount(){
	    this.props.dispatch(getBills(10));
	    this.getSlideHeight();
	    this.setState();
	}
	//will need to do something like this to render buttons outside of box and still interact with box
	buttonClicked(event,slideId){
		let slideshow = document.getElementById(slideId);
		console.log(this.slideId,slideId);
		console.log(slideshow);
	}

	rightArrow(event,slideId){
		let slideshow = document.getElementById(slideId);
		console.log("right clicked",slideId);
		console.log(slideshow);
	}

	leftArrow(event,slideId){
		let slideshow = document.getElementById(slideId);
		console.log("left clicked",slideId);
		console.log(slideshow);
	}

	getSlideHeight(){
		let slideshow = document.getElementById(this.slideId);
		let slideHeight = slideshow.clientHeight / 2 + "px";
		this.setState({
			slideHeight:slideHeight
		});
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
				<Arrow slideHeight={this.state.slideHeight} slideId={this.slideId} arrowClicked={this.leftArrow}/>
				<Slideshow slideId={this.slideId} billData={this.props.billData} slideTransition={this.slideTransition}/>
				<Arrow right={true} slideHeight={this.state.slideHeight} slideId={this.slideId} arrowClicked={this.rightArrow}/>
				<button onClick={(e)=>this.buttonClicked(e)}>test</button>
			</div>
		);
		
	}
}

const mapStateToProps = state => ({
    billData: state.bills
});

export default connect(mapStateToProps)(App);