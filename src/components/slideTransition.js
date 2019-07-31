export default class SlideTransition{
	constructor(slideWidth,slideClass,transitionTime,slideId){
		this.slideWidth = slideWidth;
		this.transitionTime = transitionTime;
		this.slideshow = document.getElementById(slideId);
		this.slides = document.getElementsByClassName(slideClass);
		this.activeSlide = 0;
		console.log(this.slides);
		console.dir(this.slideshow);
	}

	getWidth(){
		return this.slideshow.offsetWidth;
	}

	getActiveSlide(){
		//console.log('test',this.slides.length,this.slides);
		for(let i = 0;i < this.slides.length;i++){
			if(this.slides[i].classList.includes('active-slide')){
				return i;
			}
		}
	}

	moveSlide(slide,width,transition){
		let promise = new Promise((resolve,reject) =>{
			setTimeout(function(){
				slide.style.transform = 'translateX(' + width + ')'; 
				resolve();
			}.bind(this),transition);		
		});

		return promise;
	}

	transitionRight(){
		if(this.activeSlide === this.slides.length - 1){
			return;
		}
		else{
			const widthLeft = this.getWidth() * -1 + 'px';
			//console.log(width);
			return this.moveSlide(this.slides[this.activeSlide],widthLeft,0)

			.then(()=>{
				this.slides[this.activeSlide].classList.remove('active-slide');
				this.activeSlide++;
				this.slides[this.activeSlide].classList.add('active-slide');
				console.log('moved left');
				return this.moveSlide(this.slides[this.activeSlide],0,this.transitionTime)
			})

			.catch(err => {
				console.log(err);
			})
		}
	}
}