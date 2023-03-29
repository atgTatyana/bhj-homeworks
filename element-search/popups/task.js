const ModalMain = document.getElementById('modal_main');
const ModalSuccess = document.getElementById('modal_success');
const elementClose = document.querySelectorAll('.modal__close');
const elementSuccess = document.querySelector('.show-success');

ModalMain.className = 'modal modal_active';

for (element of elementClose) {
	element.onclick = function() {
		ModalMain.className = 'modal';
		ModalSuccess.className = 'modal';
	};
}

elementSuccess.onclick = function() {
	ModalMain.className = 'modal';
	ModalSuccess.className = 'modal modal_active';
};