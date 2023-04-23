const input = document.getElementById('task__input');
const list = document.getElementById('tasks__list');
const button = document.getElementById('tasks__add');
let arrLocalStorage = [];

if (localStorage.length) {
	arrLocalStorage = JSON.parse(localStorage.getItem('key'));
	for (let i = 0; i < arrLocalStorage.length; i++) {
		createTask(arrLocalStorage[i]);
	}
}

function createTask(task) {
	let element = document.createElement('div');
	element.setAttribute('class', 'task');
	element.insertAdjacentHTML('afterbegin', `<div class="task__title">${task}</div>`);
	element.insertAdjacentHTML('beforeend', '<a href="#" class="task__remove">&times;</a>');
	list.appendChild(element);	

	element.querySelector('.task__remove').addEventListener('click', () => {
		element.remove();
		removeDataLocalStorage(task);
	})
}

button.addEventListener('click', (e) => {
	let task = input.value.trim();
	if (task !== '') {
		createTask(task);
		setDataLocalStorage(task);
		input.value = '';

	} else {
		input.value = input.value.trim();
	}

	e.preventDefault();
})

function setDataLocalStorage(value) {
	arrLocalStorage.push(value);
	localStorage.setItem('key', JSON.stringify(arrLocalStorage));
}

function removeDataLocalStorage(task) {
	arrLocalStorage = arrLocalStorage.filter(el => el !== task);
	localStorage.setItem('key', JSON.stringify(arrLocalStorage));
}