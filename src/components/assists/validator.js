export default class Validator{
	constructor(emailClass){
		this.emailInputs = document.getElementsByClassName(emailClass);
		this.initInputListeners();
		console.log(this.emailInputs);
	}

	initInputListeners(){
		console.log('add them',this.emailInputs.length,this.emailInputs);
		for (var i = 0; i < this.emailInputs.length; i++) {
			console.log('adding addEventListener');
			this.emailInputs[i].addEventListener('blur',function(e){
				this.checkEmail(e);
			}.bind(this),false);
			this.emailInputs[i].addEventListener('click',function(e){
				this.checkEmail(e);
			}.bind(this),false);
		}
	}

	checkEmail(e){
		console.log('check email',e.currentTarget);
	}
}