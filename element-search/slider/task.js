const slides = Array.from(document.querySelectorAll('.slider__item'));
const dots = Array.from(document.querySelectorAll('.slider__dot'));

dots[0].className = 'slider__dot slider__dot_active';

function showSlide(nowSlide, nextSlide) {
	dots[nowSlide].className = 'slider__dot';
	slides[nowSlide].className = 'slider__item';	
	slides[nextSlide].className = 'slider__item slider__item_active';	
	dots[nextSlide].className = 'slider__dot slider__dot_active';
}

// смена слайдов при нажатии точек
for (let dot of dots) {
	dot.onclick = function() {
		const nowDot = dots.findIndex(dot => dot.className === 'slider__dot slider__dot_active');
		showSlide(nowDot, dots.indexOf(dot));
	}
}

const arrows = document.querySelectorAll('.slider__arrow');
for (let arrow of arrows) {
	arrow.onclick = function() {
		let nextSlide;
		const nowSlide = slides.findIndex(slide => slide.className === 'slider__item slider__item_active');
		if (arrow.className === 'slider__arrow slider__arrow_prev') {
			nextSlide = (nowSlide === 0) ? slides.length - 1: nowSlide - 1;
		} else {
			nextSlide = (nowSlide === slides.length - 1) ? 0: nowSlide + 1;
		}
		showSlide(nowSlide, nextSlide);
	}
}