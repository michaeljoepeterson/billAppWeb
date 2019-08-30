import React from 'react';
import Slide from './slide';

export class Slides extends React.Component{
	
	renderSlides(bills){
		if(bills.length !== 0){
			let slideComponents = [];
			for(let i = 0;i < bills.length;i++){
				let isFirstSlide = false;
				if(i === 0){
					isFirstSlide = true;
				}
				slideComponents.push(<Slide key={i} bill={bills[i]} slideWidth={this.props.slideWidth} firstSlide={isFirstSlide} billId={'bill' + i} vote={this.props.voteData.voteResult[i]}/>);
			}

			return slideComponents;
		}
	}

	render(){
		//console.log("inside slides ", this.props.billData,this.props.slideWidth,this.props.voteData);
		let slides;
		if(this.props.billData && this.props.voteData.voteResult){
			try{
				if(this.props.voteData.voteResult.message !== 'Voted'){
					console.log('not voted');
					slides = this.renderSlides(this.props.billData.bills);
				}
			}
			catch(err){
				console.log('error in slides: ',err);
			}
		}
		
		return(
			<div className="slide-container">
				{slides}
			</div>
		)
	}
}