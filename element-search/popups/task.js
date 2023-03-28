const elementModal_main = document.getElementById('modal_main');
elementModal_main.className = 'modal modal_active';

const elementClose = document.querySelectorAll('.modal__close');
for (element of elementClose) {
	element.onclick = function() {
		elementModal_main.className = 'modal';
		elementModal_success.className = 'modal';
	}
}

const elementSuccess = document.querySelector('.show-success');
const elementModal_success = document.getElementById('modal_success');
elementSuccess.onclick = function() {
	elementModal_success.className = 'modal modal_active';
}