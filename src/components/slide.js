import React from 'react';

export class Slide extends React.Component{

	constructor(props){
		super(props);
		this.statusMap = {
	        'RoyalAssentAwaiting': 'Awaiting royal assent',
	        'RoyalAssentGiven': 'Law (royal assent given)',
	        'HouseAt2ndReading': 'Second reading (House)',
	        'SenateAt2ndReading': 'Second reading (Senate)',
	        'SenateAt3rdReading': 'Third reading (Senate)',
		}
	}

	render(){
		console.log("inside slide ", this.props.bill);
		let firstSlide = this.props.firstSlide ? "active-slide" : "";
		let transformStyle = {};
		if(firstSlide === ""){
			transformStyle = {
				transform:'translateX(' + this.props.slideWidth + 'px)'
			};

		}

		return(
			<div className={"slide " + firstSlide} style={transformStyle}>
				<p>Bill Number: {this.props.bill.bill_number}</p>
				<p>Session: {this.props.bill.session}</p>
				<p>Status: {this.statusMap[this.props.bill.status]}</p>
				<p>Introduced: {this.props.bill.introduced_date}</p>
				<p>Description: {this.props.bill.bill_description.en}</p>
				<p>Do you support this bill?</p>
				<p>Email:</p>
				<div>
					<input type="text"/>
				</div>
				<button>Yes</button>
				<button>No</button>
			</div>
		)
	}
}