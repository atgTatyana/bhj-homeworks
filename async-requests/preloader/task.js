let currencyArr = [];
if (localStorage.length && localStorage.getItem('key')) {
	document.getElementById('loader').classList.remove('loader_active');
	// преобразует формат JSON (строку) в массив объектов
	currencyArr = JSON.parse(localStorage.getItem('key'));
	getCurrencyRate(currencyArr);
}

const xhr = new XMLHttpRequest();

xhr.addEventListener('readystatechange', () => {
	if (xhr.readyState === xhr.DONE) {
		document.getElementById('loader').classList.remove('loader_active');

		const serverResponse = JSON.parse(xhr.responseText);
		let pairsArr = Object.entries(serverResponse.response.Valute);
		for (let i = 0; i < pairsArr.length; i++) {
			currencyArr[i] = {charcode: pairsArr[i][1].CharCode, value: pairsArr[i][1].Value};
		}

		getCurrencyRate(currencyArr);
		console.log(currencyArr)
		setDataLocalStorage(currencyArr);
	}
})

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.send();

function getCurrencyRate(currencyArr) {
	const items = document.getElementById('items');

	for (let i = 0; i < currencyArr.length; i++) {
		let currencyItem = document.createElement('div');
		currencyItem.setAttribute('class', 'item');
		currencyItem.insertAdjacentHTML('beforeend', `<div class="item__code">${currencyArr[i].charcode}</div>`);
		currencyItem.insertAdjacentHTML('beforeend', `<div class="item__value">${currencyArr[i].value}</div>`);
		currencyItem.insertAdjacentHTML('beforeend', '<div class="item__currency"> руб.</div>');
		items.appendChild(currencyItem);
	}
}

function setDataLocalStorage(currencyArr) {
	// преобразует массив объектов в формат JSON (строку)
	localStorage.setItem('key', JSON.stringify(currencyArr));
}