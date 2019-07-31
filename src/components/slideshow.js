import React from 'react';
import "../styles/slideshow.css";
import {Slides} from './slides';

export default class Slideshow extends React.Component{
	constructor(props){
		super(props);
		this.slideWidth = 0;
	}

	componentDidMount(){
	   	this.getWidth();
	   	this.setState();
	}

	windowResized(event){
		let slideshow = document.getElementById(this.props.slideId);
		let slideWidth = slideshow.clientWidth;
		let slides = document.getElementsByClassName('slide');
		let normalTransition = 'all ' + this.props.slideTransition + 'ms';
		//console.log(slideshow.clientWidth,slides,normalTransition);
		for(let i = 0;i < slides.length;i++){
			if(!slides[i].classList.contains('active-slide')){
				slides[i].style.transition = 'none';
				let currentWidth = slides[i].style.transform.replace('translateX(',"").replace('px)','');
				if(currentWidth < 0){
					slides[i].style.transform = 'translateX(' + -1 *slideWidth + 'px)';
				}
				else{
					slides[i].style.transform = 'translateX(' + slideWidth + 'px)';
				}
				setTimeout(function(){
					slides[i].style.transition = normalTransition;
				},this.props.slideTransition - 100);
				
			}
		}
	}

	getWidth(){
		let slideshow = document.getElementById(this.props.slideId);
		let slideWidth = slideshow.clientWidth;
		this.slideWidth = slideWidth;
	}

	render(){
		window.addEventListener("resize", this.windowResized.bind(this));
		
		return(
			<div className="slideshow-container" id={this.props.slideId}>
				<Slides billData={this.props.billData} slideWidth={this.slideWidth}/>
			</div>
		)
	}
}