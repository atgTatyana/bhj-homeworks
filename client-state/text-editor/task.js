const editor = document.getElementById('editor');
const button = editor.nextElementSibling;

const storedText = localStorage.getItem('text');
if (storedText) {
	editor.value = storedText;
}

editor.addEventListener('change', () => {
	setLocalStorage(editor.value.trim());
})

button.addEventListener('click', () => {
	editor.value = '';
	setLocalStorage('');
})

function setLocalStorage(text) {
	localStorage.setItem('text', text);
}
