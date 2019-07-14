import React from 'react';

export class Slide extends React.Component{

	render(){
		console.log("inside slides ", this.props.billData);
		return(
			<div className="slide">
				<p>test</p>
			</div>
		)
	}
}