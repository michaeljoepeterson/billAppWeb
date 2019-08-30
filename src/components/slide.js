import React from 'react';
import {castVote} from'../actions/voteActions';
import {connect} from 'react-redux';
import "../styles/slide.css";
import Validator from './assists/validator';
import validator from 'validator';
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

	getEmailInput(children,elementName){
		for(let i = 0;i < children.length;i++){
			if(children[i].nodeName == elementName || children[i].localName == elementName){
				if(children[i].children.length > 0){
					return this.getEmailInput(children[i].children,'input');
				}
				else{
					return children[i];
				}	
			}
		}
		return null;
	}

	vote(event){
		event.preventDefault();
		let voteOption = event.currentTarget.value == 'yes'? 1 : 2;
		let billChildren = document.getElementById(this.props.billId).children;

		let emailInput = this.getEmailInput(billChildren,'div');
		let emailValue = emailInput.value;
		console.log('voted',event.currentTarget.value,this.props.bill,this.props.billId);
		console.log(emailValue);
		this.props.dispatch(castVote(this.props.bill.legisinfo_id,voteOption,emailValue));
	}

	checkEmail(e){
		let email = e.currentTarget.value
		let error = e.currentTarget.parentElement.previousElementSibling;
		if(!validator.isEmail(email)){
			error.classList.remove('hide');
		}
		else{
			error.classList.add('hide');
		}
	}

	render(){
		//console.log("inside slide ===========", this.props.bill,this.props.vote);
		let firstSlide = this.props.firstSlide ? "active-slide" : "";
		let transformStyle = {};
		if(firstSlide === ""){
			transformStyle = {
				transform:'translateX(' + this.props.slideWidth + 'px)'
			};
		}

		return(
			<div className={"slide " + firstSlide} style={transformStyle} id={this.props.billId}>
				<p>Bill Number: {this.props.bill.bill_number}</p>
				<p>Session: {this.props.bill.session}</p>
				<p>Status: {this.statusMap[this.props.bill.status]}</p>
				<p>Introduced: {this.props.bill.introduced_date}</p>
				<p>Description: {this.props.bill.bill_description.en}</p>
				<p>Do you support this bill?</p>
				<p>Email:</p>
				<p className="hide error">Invalid Email</p>
				<div>
					<input onBlur={(e) => this.checkEmail(e)} className="emailInput" type="email"/>
				</div>
				<button value='yes' onClick={(e) => this.vote(e)}>Yes</button>
				<button value='no' onClick={(e) => this.vote(e)}>No</button>
				<p>Results: {this.props.vote.total} total votes</p>
				<p>Yes: {this.props.vote.yes}</p>
				<p>No: {this.props.vote.total - this.props.vote.yes}</p>

			</div>
		)
	}
}

const mapStateToProps = state => ({
    voteData: state.votes
});

export default connect(mapStateToProps)(Slide);