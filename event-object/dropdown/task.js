// Если много кнопок, получить нужную
const dropdown = document.querySelector('.dropdown');

const list = dropdown.querySelector('.dropdown__list');
const button = dropdown.querySelector('.dropdown__value');
const items = dropdown.querySelectorAll('.dropdown__item');

button.addEventListener('click', function() {
	list.className = list.className === 'dropdown__list' ? 'dropdown__list dropdown__list_active' : 'dropdown__list';	
});

for (let item of items) {
	item.addEventListener('click', function(event) {
		list.className = 'dropdown__list';
		button.textContent = item.textContent;
		event.preventDefault();    		   // отмена перехода по ссылке
	});

	// item.onclick = function() {
	// 	list.className = 'dropdown__list';
	// 	button.textContent = item.textContent;
	// 	return false;
	// }
}