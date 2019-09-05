export default class SlideTransition{
	constructor(slideWidth,slideClass,transitionTime,slideId){
		this.slideWidth = slideWidth;
		this.transitionTime = transitionTime;
		this.slideshow = document.getElementById(slideId);
		this.slides = document.getElementsByClassName(slideClass);
		this.activeSlide = 0;
		this.isClickedRight = false;
		this.isClickedLeft = false;
		console.log('============active-slide: ',this.activeSlide);
		//console.dir(this.slideshow);
	}

	getWidth(){
		return this.slideshow.offsetWidth;
	}

	setSlide(slide){
		this.activeSlide = slide;
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
				//console.log(width);
				slide.style.transform = 'translateX(' + width + ')'; 
				resolve();
			}.bind(this),transition);		
		});

		return promise;
	}

	transitionLeft(){
		if(this.activeSlide === 0 || this.isClickedLeft){
			return;
		}
		else{
			const width = this.getWidth() + 'px';
			this.isClickedLeft = true;
			//console.log(width,this.slides[this.activeSlide]);
			return this.moveSlide(this.slides[this.activeSlide],width,0)

			.then(()=>{
				this.slides[this.activeSlide].classList.remove('active-slide');
				this.activeSlide--;
				this.slides[this.activeSlide].classList.add('active-slide');
				//console.log('moved left');
				return this.moveSlide(this.slides[this.activeSlide],0,this.transitionTime)
			})
			.then(()=>{
				this.isClickedLeft = false;
			})


			.catch(err => {
				this.isClickedLeft = false;
				console.log(err);
			})
		}
	}

	transitionRight(){
		if(this.activeSlide === this.slides.length - 1 || this.isClickedRight){
			return;
		}
		else{
			this.isClickedRight = true;
			const width = this.getWidth() * -1 + 'px';
			return this.moveSlide(this.slides[this.activeSlide],width,0)

			.then(()=>{
				this.slides[this.activeSlide].classList.remove('active-slide');
				this.activeSlide++;
				this.slides[this.activeSlide].classList.add('active-slide');
				//console.log('moved left');

				return this.moveSlide(this.slides[this.activeSlide],0,this.transitionTime)
			})

			.then(()=>{
				this.isClickedRight = false;
			})

			.catch(err => {
				this.isClickedRight = false;
				console.log(err);
			})
		}
	}
}