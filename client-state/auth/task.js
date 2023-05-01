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

	xhr.addEventListener('readystatechange', () => {
		if (xhr.readyState === xhr.DONE) {
			const serverResponse = JSON.parse(xhr.responseText);
			console.log(serverResponse);

			if (serverResponse.success) {
				localStorage.setItem('user_id', serverResponse.user_id);
				setWelcome(serverResponse.user_id);

			} else {
				signinForm.querySelectorAll('.control').forEach(el => el.value = '');
				alert('Неверный логин/пароль');
			}
		}
	})

	let formData = new FormData(signinForm);
	xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
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

	localStorage.clear();
	welcome.classList.remove('welcome_active');
	signin.classList.add('signin_active');
	signinForm.querySelectorAll('.control').forEach(el => el.value = '');
})