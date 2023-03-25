const element = document.getElementById('timer');
let timer = Number(element.textContent);
const interval = setInterval(() => {
	if (timer < 1) {
		alert('Вы победили в конкурсе!');
		clearInterval(interval);
	} else {
		timer--;
		element.textContent = timer;
	}
}, 1000);


const element_2 = document.getElementById('timer_2');
let hours = element_2.textContent.slice(0,2);
let minutes = element_2.textContent.slice(3,5);
let seconds = element_2.textContent.slice(-2);

function timerDraw(hours, minutes, seconds) {
	if (String(hours).length === 1) {
		hours = '0' + hours;
	}
	if (String(minutes).length === 1) {
		minutes = '0' + minutes;
	}
	if (String(seconds).length === 1) {
		seconds = '0' + seconds;
	}
	element_2.textContent = hours + ':' + minutes + ':' + seconds;
}

const interval_2 = setInterval(() => {
	if (Number(seconds) < 1) {
		if (Number(minutes) < 1) {
			if (Number(hours) < 1) {
				clearInterval(interval_2);
				location = "http://www.mozilla.org";						// переход на другой URL
			} else {
				+hours--;
				minutes = 59;
				seconds = 59;
				timerDraw(hours, minutes, seconds);
			}
		}	else {
			+minutes--;
			seconds = 59;
			timerDraw(hours, minutes, seconds);
		}
	} else {
		+seconds--;
		timerDraw(hours, minutes, seconds);
	}
}, 5);


