const subscribeModal = document.getElementById('subscribe-modal');
const modalClose = subscribeModal.querySelector('.modal__close');

if (document.cookie) {
	const pairs = document.cookie.split('; ');
	const cookieModalClosed = pairs.find(pair => pair.startsWith('modalClosed='));
	if (!cookieModalClosed) {
		subscribeModal.classList.add('modal_active');
	}
} else {
	subscribeModal.classList.add('modal_active');
}

modalClose.addEventListener('click', () => {
	subscribeModal.classList.remove('modal_active');
	setCookie('modalClosed', true);
})

function setCookie(name, value) {
	document.cookie = name + '=' + encodeURIComponent(value);
	console.log(document.cookie);
}

// удалить куку:
// document.cookie = 'modalClosed=; expires=Thu, 01 Jan 1970 00:00:00 GMT';