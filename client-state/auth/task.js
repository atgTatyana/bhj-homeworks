const signinBtn = document.getElementById('signin__btn');
const logoutBtn = document.getElementById('logout__btn');
const signinForm = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
const signin = document.getElementById('signin');

const storedId = localStorage.getItem('user_id');
if (storedId) {
	setWelcome(storedId);
}

signinBtn.addEventListener('click', (e) => {
	e.preventDefault();

	const xhr = new XMLHttpRequest();

	xhr.addEventListener('load', () => {
		const serverResponse = xhr.response;
		console.log(serverResponse);

		if (serverResponse.success) {
			localStorage.setItem('user_id', serverResponse.user_id);
			setWelcome(serverResponse.user_id);

		} else {
			signinForm.reset();		// сброс всех элементов формы
			alert('Неверный логин/пароль');
		}
	})

	let formData = new FormData(signinForm);
	xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');

	// чтобы не парсить ответ сервера, в xhr.response будет уже готовый объект:
	xhr.responseType = 'json';

	xhr.send(formData);
})

function setWelcome(id) {
	const userId = document.getElementById('user_id');
	userId.textContent = id;
	signin.classList.remove('signin_active');
	welcome.classList.add('welcome_active');
}

logoutBtn.addEventListener('click', (e) => {
	e.preventDefault();

	localStorage.removeItem('user_id');
	welcome.classList.remove('welcome_active');
	signin.classList.add('signin_active');
	signinForm.reset();
})