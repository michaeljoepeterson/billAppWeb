import React from 'react';
import "../styles/slideshow.css";
import {Slides} from './slides';

export class Slideshow extends React.Component{
	render(){
		return(
			<div className="slideshow-container" id={this.props.slideId}>
				<Slides billData={this.props.billData}/>
			</div>
		)
	}
}