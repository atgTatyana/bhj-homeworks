const book = document.getElementById('book');
const a = book.querySelectorAll('a');
const fontSize = book.querySelectorAll('.font-size');
const textColor = book.querySelectorAll('.book__control_color > a');
const bgColor = book.querySelectorAll('.book__control_background > a');

const onClick = (event) => {
	let div, active, bookClass = '';
	if (event.target.classList.contains('font-size')) {
		div = fontSize;
		active = 'font-size_active';
		bookClass = event.target.dataset.size !== undefined ? 'book_fs-' + event.target.dataset.size : '';
		book.classList.remove('book_fs-big', 'book_fs-small');
		
	} else if (event.target.classList[1].split('_')[0] === 'text') {
		div = textColor;
		active = 'color_active';
		bookClass = 'book_color-' + event.target.dataset.textColor;
		book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');

	} else {
		div = bgColor;
		active = 'color_active';
		bookClass = 'book_bg-' + event.target.dataset.bgColor;
		book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');
	}

	[...div].filter(el => el.classList.contains(active))
	.forEach(el => el.classList.remove(active));
	event.target.classList.add(active);
	event.preventDefault();

	if (bookClass) {
		book.classList.add(bookClass);
	}
}

a.forEach(element => element.addEventListener('click', onClick));

// fontSize.forEach(element => element.addEventListener('click', (event) => {
// 	[...fontSize].filter(el => el.classList.contains('font-size_active'))
// 	.forEach(el => el.classList.remove('font-size_active'));
// 	element.classList.add('font-size_active');
// 	event.preventDefault();

// 	if (element.dataset.size === 'small') {
// 		book.className = 'book book_fs-small';
// 	} else if (element.dataset.size === 'big') {
// 		book.className = 'book book_fs-big';
// 	} else {
// 		book.className = 'book';
// 	}
// }))