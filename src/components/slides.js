import React from 'react';
import {Slide} from './slide';

export class Slides extends React.Component{
	
	renderSlides(bills){
		return [<Slide key="1"/>,<Slide key="2"/>]
	}

	render(){
		console.log("inside slides ", this.props.billData);
		let slides = this.renderSlides();
		return(
			<div className="slide-container">
				{slides}
			</div>
		)
	}
}