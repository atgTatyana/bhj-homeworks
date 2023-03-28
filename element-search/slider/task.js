const left = document.querySelector('.slider__arrow_prev');
const right = document.querySelector('.slider__arrow_next');
const slides = document.querySelectorAll('.slider__item');
const dots = Array.from(document.querySelectorAll('.slider__dot'));

let nowSlide = 0;
dots[0].className = 'slider__dot slider__dot_active';
let nextSlide, prevSlide;

function showSlide(slide) {
	document.querySelector('.slider__dot_active').className = 'slider__dot';
	slides.item(nowSlide).className = 'slider__item';	
	slides.item(slide).className = 'slider__item slider__item_active';	
	dots[slide].className = 'slider__dot slider__dot_active';
	nowSlide = slide;
}

left.onclick = function() {
	prevSlide = (nowSlide === 0) ? 4: nowSlide - 1;
	showSlide(prevSlide);
};

right.onclick = function() {
	nextSlide = (nowSlide === 4) ? 0: nowSlide + 1;
	showSlide(nextSlide);
};

// смена слайдов при нажатии точек
for (let dot of dots) {
	dot.onclick = function() {
		showSlide(dots.indexOf(dot));
	}
}