import React from 'react';
import arrow from '../assets/arrow.png';
import "../styles/arrow.css";

//position left/right should be slideshow margin - image width / 2
export default function Arrow (props){

	//render(){
		//console.log('arrow margin: ',this.props.margin);
		let arrowStyle = {
			top:props.slideHeight
		};
		let rightClass = props.right ? 'arrowRight' : '';
		let arrowId = props.right ? 'rightArrow' : 'leftArrow';
		if(rightClass !== ''){
			arrowStyle.right = props.margin;
		}
		else{
			arrowStyle.left = props.margin;
		}
		return(
			<div>
				<img id={arrowId} style={arrowStyle} className={"arrow " + rightClass} onClick={(e) => props.arrowClicked(e,props.slideId)} src={arrow} alt='arrow button'/>
			</div>
		);
	//}
}