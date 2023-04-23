const dec = document.querySelectorAll('.product__quantity-control_dec');
const inc = document.querySelectorAll('.product__quantity-control_inc');
const addButton = document.querySelectorAll('.product__add');
const cartList = document.querySelector('.cart__products');
const cart = document.querySelector('.cart');
// Корзина:   объект { id товара: количество }
const objId = {};

function getCartElementQuantity(id) {
	const cartItem = cart.querySelectorAll('.cart__product');
	cartItem.forEach(item => {
		objId[item.dataset.id] = item.querySelector('.cart__product-count').innerText;
	})
	let cartElementQuantity = (objId[id]) ? objId[id] : 0;
	return cartElementQuantity;
}

inc.forEach(elem => elem.addEventListener('click', () => {
	elem.previousElementSibling.innerText = Number(elem.previousElementSibling.innerText) + 1;
}))

dec.forEach(elem => elem.addEventListener('click', () => {
	let quantity = Number(elem.nextElementSibling.innerText);
	if (quantity > 1) {
		elem.nextElementSibling.innerText = quantity - 1;
	}
}))

function createCartElement(id, img, quantity) {
	let element = document.createElement('div');
	element.setAttribute('class', 'cart__product');
	element.dataset.id = id; 
	element.insertAdjacentHTML('afterbegin', `<img class="cart__product-image" src="${img}">`);
	element.insertAdjacentHTML('beforeend', `<div class="cart__product-count">${quantity}</div>`);
	element.insertAdjacentHTML('beforeend', `<a href="#" class="cart__product-remove">&times;</a>`);
	cartList.appendChild(element);

	// удаление товаров из корзины:
	element.querySelector('.cart__product-remove').addEventListener('click', () => {
		element.remove();
		delete objId[id];

		// если пустая корзина - скрыть
		if (!cart.querySelectorAll('.cart__product').length) {
			cart.classList.remove('cart-on');
		}
	})
}

addButton.forEach(elem => elem.addEventListener('click', () => {
	let id = elem.closest('.product').dataset.id;
	let img = elem.closest('.product').querySelector('.product__image').getAttribute('src');
	let quantity = elem.closest('.product').querySelector('.product__quantity-value').innerText;

	// Ищем, есть ли уже такой товар в корзине
	let cartElementQuantity = getCartElementQuantity(id);

	if (cartElementQuantity === 0) {
		cart.classList.add('cart-on');
		createCartElement(id, img, quantity);

	// такой товар уже есть в корзине - c "анимацией" (перемещение товара в корзину)
	} else {
		let leftCart, topCart;
		quantity = Number(quantity) + Number(cartElementQuantity);
		cart.querySelectorAll('.cart__product').forEach(elem => {
			if (elem.dataset.id === id) {
				elem.querySelector('.cart__product-count').innerText = quantity;

				// img в корзине:
				leftCart = elem.querySelector('img').getBoundingClientRect().x + window.scrollX;
				topCart = elem.querySelector('img').getBoundingClientRect().y + window.scrollY;
			}
		})

		// img в списке товаров:
		let x = elem.closest('.product').querySelector('.product__image').getBoundingClientRect().x + window.scrollX;
		let y = elem.closest('.product').querySelector('.product__image').getBoundingClientRect().y + window.scrollY;

		// клон элемента для анимации
		const el = elem.closest('.product').querySelector('.product__image').cloneNode(false);
		document.body.appendChild(el);
		el.style.position = 'absolute';
		el.style.left = `${x}px`;
		el.style.top = `${y}px`;

		animation(leftCart, topCart, x, y, el);		
	}
}))

function animation(leftCart, topCart, x, y, el) {
	// Рекомендуемый параметр обновления экрана: 60 кадров в секунду
	const endX = Number(leftCart.toFixed()); 	// финальное значение
	const endY = Number(topCart.toFixed());
	const startX = Number(x.toFixed()); 	// начальное значение
	const startY = Number(y.toFixed());
	const duration = 2000;	 // длительность анимации, ms
	const speed = 60/1000; 	// как часто нужно перерисовывать анимацию
	const stepsCount = duration * speed; 	// количество перерисовок
	const stepSizeX = (endX - startX) / stepsCount; 	// на сколько нужно сдвинуть элемент при перерисовке
	const stepSizeY = (startY - endY) / stepsCount;

	let count = 0;
	const interval = setInterval(() => {
		count += 1;
		x += stepSizeX;
		y -= stepSizeY;
		el.style.left = `${x}px`;
		el.style.top = `${y}px`;
		
		if (count === stepsCount) {
			clearInterval(interval)
			el.remove();
		}
	}, speed);
}