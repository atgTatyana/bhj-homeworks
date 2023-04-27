const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

	const xhr = new XMLHttpRequest();

	xhr.upload.onprogress = (e) => {
		let percent = Number(((e.loaded * 100) / e.total).toFixed());
		let value = `0.${Math.floor(percent / 10)}`
    console.log(`Отправлено ${e.loaded} байт из ${e.total} байт`);

		const progress = document.getElementById('progress');
		progress.value = value === '0.10' ? 1 : value;
  }

	xhr.addEventListener('readystatechange', () => {
		if (xhr.readyState === xhr.DONE) {
			console.log('Загрузка полностью завершена')
		}
	})

	xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
	const formData = new FormData(form);
	xhr.send(formData);
})