import React from 'react';
import arrow from '../assets/arrow.png';
import "../styles/arrow.css";

//is it possible to make this work for left and right?
//possibly through props, determines which function is called?
export default class Arrow extends React.Component{



	render(){
		return(
			<div>
				<img className='arrow' src={arrow} alt='arrow button'/>
			</div>
		);
	}
}