import React from 'react';
import {Slide} from './slide';

export class Slides extends React.Component{
	
	renderSlides(bills){
		/*
		for(let i = 0;i < bills.length;i++){

		}
		*/
		if(bills.length !== 0){
			let slideComponents = [<Slide key="0" bill={bills[0]} firstSlide={true} slideWidth={this.props.slideWidth}/>,<Slide key="1" bill={bills[1]} slideWidth={this.props.slideWidth}/>];
			return slideComponents;
		}
	}

	render(){
		console.log("inside slides ", this.props.billData,this.props.slideWidth);
		let slides = this.renderSlides(this.props.billData.bills);
		return(
			<div className="slide-container">
				{slides}
			</div>
		)
	}
}