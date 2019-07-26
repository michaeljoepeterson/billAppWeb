import React from 'react';
import {Slide} from './slide';

export class Slides extends React.Component{
	
	renderSlides(bills){
		if(bills.length !== 0){
			let slideComponents = [];
			for(let i = 0;i < bills.length;i++){
				let isFirstSlide = false;
				if(i === 0){
					isFirstSlide = true;
				}
				slideComponents.push(<Slide key={i} bill={bills[i]} slideWidth={this.props.slideWidth} firstSlide={isFirstSlide}/>);
			}

			return slideComponents;
		}
	}

	render(){
		//console.log("inside slides ", this.props.billData,this.props.slideWidth);
		let slides = this.renderSlides(this.props.billData.bills);
		return(
			<div className="slide-container">
				{slides}
			</div>
		)
	}
}