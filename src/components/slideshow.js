import React from 'react';
import "../styles/slideshow.css";
import {Slides} from './slides';

export default class Slideshow extends React.Component{

	windowResized(event){
		let slideshow = document.getElementById(this.props.slideId);
		let slideWidth = slideshow.clientWidth;
		let slides = document.getElementsByClassName('slide');
		let normalTransition = 'all ' + this.props.slideTransition + 'ms';
		console.log(slideshow.clientWidth,slides,normalTransition);
		for(let i = 0;i < slides.length;i++){
			if(!slides[i].classList.contains('active-slide')){
				slides[i].style.transition = 'none';
				slides[i].style.transform = 'translateX(' + slideWidth + 'px)';
				setTimeout(function(){
					slides[i].style.transition = normalTransition;
				},this.props.slideTransition - 100);
				
			}
		}
	}

	render(){
		window.addEventListener("resize", this.windowResized.bind(this));
		return(
			<div className="slideshow-container" id={this.props.slideId}>
				<Slides billData={this.props.billData}/>
			</div>
		)
	}
}