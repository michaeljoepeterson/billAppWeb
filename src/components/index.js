import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {getBills} from "../actions/allBillActions";
import {bulkGetVotes} from "../actions/voteActions";
import Slideshow from './slideshow';
import SlideTransition from './assists/slideTransition';
import Arrow from './arrow';
import Loader from './loader';

export class App extends React.Component{

	constructor(props){
		super(props);
		this.slideId = "test-slideshow";
		this.slideTransition = 500;
		this.arrowMargin = '';
		this.slideHandler = null;
		this.state = {
			slideHeight:"",
			slideWidth:'',
			activeSlide:0
		};
		//this.activeSlide = 0;
	}
	componentDidMount(){
	    this.props.dispatch(getBills(10));
	    this.getSlideHeight();
	    this.getSlideMargin();
	    this.setSlideHandler();
	    this.setState();
	    
	}
	setSlideHandler(){
		console.log('creating slide handler==========');
		this.slideHandler = new SlideTransition(this.state.slideWidth,'slide',this.slideTransition,this.slideId);
	}

	rightArrow(event,slideId){
		//let slideshow = document.getElementById(slideId);
		//console.log("right clicked",slideId);
		//console.log(slideshow);
		const slideMoved = this.slideHandler.transitionRight();
		if(slideMoved){
			const newSlide = this.state.activeSlide + 1;
			this.setState({
				activeSlide:newSlide
			});
		}
	}

	leftArrow(event,slideId){
		//let slideshow = document.getElementById(slideId);
		//console.log("left clicked",slideId,this.slideHandler);
		//console.log(slideshow);
		const slideMoved =this.slideHandler.transitionLeft();

		if(slideMoved){
			const newSlide = this.state.activeSlide + 1;
			this.setState({
				activeSlide:newSlide
			});
		}
	}

	getSlideHeight(){
		let slideshow = document.getElementById(this.slideId);
		let slideHeight = slideshow.clientHeight / 2 + "px";
		this.setState({
			slideHeight:slideHeight
		});
	}

	getSlideWidth(){
		let slideshow = document.getElementById(this.slideId);
		let slideWidth = slideshow.clientWidth;
		this.setState({
			slideWidth:slideWidth
		});
	}

	getSlideMargin(){
		let slideshow = document.getElementById(this.slideId);
		let style = window.getComputedStyle(slideshow)
		let marginRight = parseInt(style.marginRight.replace('px',''));
		//console.log(style.marginRight);
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
		let rightArrow = document.getElementById('rightArrow');
		let leftArrow = document.getElementById('leftArrow');
		this.getSlideMargin();
		rightArrow.style.right = this.arrowMargin;
		leftArrow.style.left = this.arrowMargin;
	}

	render(){
		/*
		if(this.slideHandler){
			//this.slideHandler.setSlide(this.state.activeSlide);
			console.log('active slide in render: ',this.state.activeSlide);
		}
		*/
		console.log('active slide in render: ',this.state.activeSlide);
		let loader;
		window.addEventListener("resize", this.arrowReposition.bind(this));
		console.log('bill data ',this.props.billData);
		if(this.props.billData.loading || this.props.voteData.loading){
			loader = <Loader/>;
		}
		console.log('vote data ',this.props.voteData);
	    if(this.props.billData.bills.length > 0 && !this.props.voteData.loading && this.props.voteData.voteResult === null){
	    	if(this.props.voteData.error){
	    			if(this.props.voteData.error.code === 422){
	    				console.log('==========dispatching get votes due to vote already');
	    				this.props.dispatch(bulkGetVotes(this.props.billData.bills));
	    				this.slideHandler.setSlide(this.state.activeSlide);
	    			}
	    		}
	    		else{
	    			console.log('==========dispatching get votes');
	    			this.props.dispatch(bulkGetVotes(this.props.billData.bills));
	    			this.slideHandler.setSlide(this.state.activeSlide);
	    		}
	    	
	    }
	    else if(this.props.billData.bills.length > 0 && !this.props.voteData.loading && this.props.voteData.voteResult !== null){
	    	try{
	    		if(this.props.voteData.error){
	    			if(this.props.voteData.error.code === 422){
	    				console.log('dispatch due to vote already')
	    				this.props.dispatch(bulkGetVotes(this.props.billData.bills));
	    				this.slideHandler.setSlide(this.state.activeSlide);
	    			}
	    		}
	    		else if(this.props.voteData.voteResult.message === 'Voted'){
	    			console.log('==========dispatching get votes after voting');
	    			this.props.dispatch(bulkGetVotes(this.props.billData.bills));
	    			this.slideHandler.setSlide(this.state.activeSlide);
	    		}
	    	}
	    	catch(err){
	    		console.log('error at getting votes after vote',err);
	    	}
	    	
	    }

		return(
			<div>
				{loader}
				<Arrow margin={this.arrowMargin} slideHeight={this.state.slideHeight} slideId={this.slideId} arrowClicked={this.leftArrow.bind(this)}/>
				<Slideshow slideId={this.slideId} billData={this.props.billData} slideTransition={this.slideTransition} voteData={this.props.voteData} activeSlide={this.state.activeSlide}/>
				<Arrow margin={this.arrowMargin} right={true} slideHeight={this.state.slideHeight} slideId={this.slideId} arrowClicked={this.rightArrow.bind(this)}/>
			</div>
		);
		
	}
}

const mapStateToProps = state => ({
    billData: state.bills,
    voteData: state.votes
});

export default connect(mapStateToProps)(App);