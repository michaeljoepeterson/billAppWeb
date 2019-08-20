import React from 'react';
import arrow from '../assets/arrow.png';
import "../styles/arrow.css";

//position left/right should be slideshow margin - image width / 2
//will need a window change event listener
export default class Arrow extends React.Component{

	render(){
		console.log('arrow margin: ',this.props.margin);
		let arrowStyle = {
			top:this.props.slideHeight
		};
		let rightClass = this.props.right ? 'arrowRight' : '';
		let arrowId = this.props.right ? 'rightArrow' : 'leftArrow';
		if(rightClass !== ''){
			arrowStyle.right = this.props.margin;
		}
		else{
			arrowStyle.left = this.props.margin;
		}
		return(
			<div>
				<img id={arrowId} style={arrowStyle} className={"arrow " + rightClass} onClick={(e) => this.props.arrowClicked(e,this.props.slideId)} src={arrow} alt='arrow button'/>
			</div>
		);
	}
}