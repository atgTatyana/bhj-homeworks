const input = document.getElementById('task__input');
const list = document.getElementById('tasks__list');
const button = document.getElementById('tasks__add');

// myStorage = {};
// myStorage = window.localStorage;
// if (myStorage) {
// 	for (let property in myStorage) {
// 		list.appendChild(myStorage[property]);
// 	}
// }

button.addEventListener('click', (e) => {
	if (input.value.trim() !== '') {
		let element = document.createElement('div');
		element.setAttribute('class', 'task');
		element.insertAdjacentHTML('afterbegin', `<div class="task__title">${input.value}</div>`);
		element.insertAdjacentHTML('beforeend', '<a href="#" class="task__remove">&times;</a>');
		list.appendChild(element);		

		// let key = input.value;
		// 	myStorage[key] = element;

		input.value = '';

		element.querySelector('.task__remove').addEventListener('click', () => {
			element.remove();

			// delete myStorage[key];
		})

	} else {
		input.value = input.value.trim();
	}

	e.preventDefault();
})