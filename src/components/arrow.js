import React from 'react';
import arrow from '../assets/arrow.png';
import "../styles/arrow.css";

//position left/right should be slideshow margin - image width / 2
//will need a window change event listener
export default class Arrow extends React.Component{

	render(){
		let arrowStyle = {
			top:this.props.slideHeight
		};
		let rightClass = this.props.right ? 'arrowRight' : '';
		return(
			<div>
				<img style={arrowStyle} className={"arrow " + rightClass} onClick={(e) => this.props.arrowClicked(e,this.props.slideId)} src={arrow} alt='arrow button'/>
			</div>
		);
	}
}