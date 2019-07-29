export default class SlideTransition{
	constructor(slideWidth,slideClass){
		this.slideWidth = slideWidth;
		this.slides = document.getElementsByClassName(slideClass);
		console.log(this.slides);
	}
}