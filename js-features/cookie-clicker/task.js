const elementCookie = document.getElementById('cookie');
const elementCounter = document.getElementById('clicker__counter');
const elementSpeed = document.getElementById('clicker__speed');
let clickCounter = Number(elementCounter.textContent);
let time = new Date();
elementCookie.onclick = function() {
	let clickTime = new Date();
	let sec = (clickTime - time) / 1000;			// прошло секунд с последнего клика
	let speed = (1 / sec).toFixed(2);					// кликов в секунду
	elementSpeed.textContent = speed;
	time = clickTime;
	clickCounter += 1;
	elementCounter.textContent = clickCounter;
	
	elementCookie.width = elementCounter.textContent % 2 ? 250 : 200;
	// if (elementCookie.width === 200) {
	// 	elementCookie.width = 250;
	// } else {
	// 	elementCookie.width = 200;
	// }
};