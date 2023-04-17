const chatWidget = document.querySelector('.chat-widget');
const input = document.getElementById('chat-widget__input');
const messages = document.getElementById('chat-widget__messages');
const chat = document.querySelector('.chat-widget__messages-container');
let actionTime = new Date();
const robotMessages = [
	'Добрый день',
	'Как ваши дела?',
	'Покупать будете?',
	'Извините, товар закончился',
	'Приходите завтра, всё будет',
	'Мы больше не работаем',
	'Спасибо за заказ, обращайтесь ещё',
	'Хорошего дня!',
	'Смотрите информацию на сайте'
];

function getTime() {
	let enterTime = new Date();
	let hours = enterTime.getHours();
	let minutes = enterTime.getMinutes();
	hours = String(hours).length < 2 ? '0' + hours : hours;
	minutes = String(minutes).length < 2 ? '0' + minutes : minutes;
	return hours + ':' + minutes;
}

// прокрутка в конец чата
function scrollHeight() {
	const {height} = messages.getBoundingClientRect();
	chat.scrollTop = height;
}

chatWidget.addEventListener('click', () => {
	actionTime = new Date;
  chatWidget.className = 'chat-widget chat-widget_active';
})

setInterval(() => {
	let pause = Math.floor((new Date() - actionTime) / 1000);
	console.log(pause);
	if (chatWidget.classList.contains('chat-widget_active') && pause >= 30){
		messages.innerHTML += `
			<div class="message">
				<div class="message__time">${getTime()}</div>
				<div class="message__text">Есть вопросы?</div>
			</div>`;
		scrollHeight();
		actionTime = new Date();
	}
}, 1000);

input.addEventListener('input', () => {
	actionTime = new Date();
})

input.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {		
		messages.innerHTML += `
			<div class="message message_client">
				<div class="message__time">${getTime()}</div>
				<div class="message__text">${input.value}</div>
			</div>`;
		input.value = '';

		messages.innerHTML += `
			<div class="message">
				<div class="message__time">${getTime()}</div>
				<div class="message__text">${robotMessages[Math.floor(Math.random() * robotMessages.length)]}</div>
			</div>`;
	}
	scrollHeight();
})