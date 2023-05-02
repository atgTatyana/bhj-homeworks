const editor = document.getElementById('editor');
const button = editor.nextElementSibling;

const storedText = localStorage.getItem('text');	// null  - если нет
console.log(storedText, localStorage.text);				// null(метод) undefined(свойство)
editor.value = storedText;

editor.addEventListener('input', () => {
	setLocalStorage(editor.value.trim());
})

button.addEventListener('click', () => {
	editor.value = '';
	localStorage.removeItem('text');
})

function setLocalStorage(text) {
	localStorage.setItem('text', text);
}
