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
		this.arrowMargin = '';
		this.state = {
			slideHeight:""
		};
	}
	componentDidMount(){
	    this.props.dispatch(getBills(10));
	    this.getSlideHeight();
	    this.getSlideMargin();
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

	getSlideMargin(){
		let slideshow = document.getElementById(this.slideId);
		let style = window.getComputedStyle(slideshow)
		let marginRight = parseInt(style.marginRight.replace('px',''));
		console.log(style.marginRight);
		//margin left and right the same
		this.arrowMargin = this.calcArrowMargin(marginRight) + 'px';

	}

	calcArrowMargin(margin){
		let arrow = document.getElementById('rightArrow');
		let arrowWidth = arrow.clientWidth;
		let adjustedPostiion = Math.abs(margin - arrowWidth) / 2;
		return adjustedPostiion;
	}

	arrowReposition(){
		
	}

	render(){
		let loader;

		if(this.props.billData.loading){
			loader = <Loader/>;
		}
		return(
			<div>
				{loader}
				{this.props.billData.bills.length}
				<Arrow margin={this.arrowMargin} slideHeight={this.state.slideHeight} slideId={this.slideId} arrowClicked={this.leftArrow}/>
				<Slideshow slideId={this.slideId} billData={this.props.billData} slideTransition={this.slideTransition}/>
				<Arrow margin={this.arrowMargin} right={true} slideHeight={this.state.slideHeight} slideId={this.slideId} arrowClicked={this.rightArrow}/>
				<button onClick={(e)=>this.buttonClicked(e)}>test</button>
			</div>
		);
		
	}
}

const mapStateToProps = state => ({
    billData: state.bills
});

export default connect(mapStateToProps)(App);