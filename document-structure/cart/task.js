const dec = document.querySelectorAll('.product__quantity-control_dec');
const inc = document.querySelectorAll('.product__quantity-control_inc');
const addButton = document.querySelectorAll('.product__add');
const cartList = document.querySelector('.cart__products');
const cart = document.querySelector('.cart');

inc.forEach(elem => elem.addEventListener('click', () => {
	elem.previousElementSibling.innerText = Number(elem.previousElementSibling.innerText) + 1;
}))

dec.forEach(elem => elem.addEventListener('click', () => {
	let quantity = Number(elem.nextElementSibling.innerText);
	if (quantity > 1) {
		elem.nextElementSibling.innerText = quantity - 1;
	}
}))

addButton.forEach(elem => elem.addEventListener('click', () => {
	let id = elem.closest('.product').dataset.id;
	let img = elem.closest('.product').querySelector('.product__image').getAttribute('src');
	let quantity = elem.closest('.product').querySelector('.product__quantity-value').innerText;

	// Корзина:   объект { id товара: количество }
	const objId = {};
	const cartItem = cart.querySelectorAll('.cart__product');
	cartItem.forEach(item => {
		objId[item.dataset.id] = item.querySelector('.cart__product-count').innerText;
	})
	let cartQuantity = (objId[id]) ? objId[id] : 0;

	// если в корзине выбранный товар отсутствует:
	if (cartQuantity === 0) {
		let element = document.createElement('div');
		element.setAttribute('class', 'cart__product');
		element.dataset.id = id; 
		element.insertAdjacentHTML('afterbegin', `<img class="cart__product-image" src="${img}">`);
		element.insertAdjacentHTML('beforeend', `<div class="cart__product-count">${quantity}</div>`);
		element.insertAdjacentHTML('beforeend', `<a href="#" class="cart__product-remove">&times;</a>`);
		cartList.appendChild(element);

		cart.classList.add('cart-on');
		
		// удаление товаров из корзины:
		element.querySelector('.cart__product-remove').addEventListener('click', () => {
			element.remove();

			// если пустая корзина - скрыть
			if (!cart.querySelectorAll('.cart__product').length) {
				cart.classList.remove('cart-on');
			}
		})

	// такой товар уже есть в корзине - c "анимацией" (перемещение товара в корзину)
	} else {
		let leftCart, topCart;
		quantity = Number(quantity) + Number(cartQuantity);
		cartItem.forEach(elem => {
			if (elem.dataset.id === id) {
				elem.querySelector('.cart__product-count').innerText = quantity;

				// img в корзине:
				let {left, top} = elem.querySelector('img').getBoundingClientRect();
				leftCart = Number(left.toFixed());
				topCart = Number(top.toFixed());
			}
		})

		// img в списке товаров:
		let {x, y} = elem.closest('.product').querySelector('.product__image').getBoundingClientRect();
		x = Number(x.toFixed());
		y = Number(y.toFixed());
		const el = elem.closest('.product').querySelector('.product__image').cloneNode(false);
		document.body.appendChild(el);
		el.style.position = 'absolute';
		el.style.left = `${x}px`;
		el.style.top = `${y}px`;

		let stepX = Number(((leftCart - x) / 5).toFixed());
		let stepY = Number(((y - topCart) / 5).toFixed());

		const interval = setInterval(() => {
			x += stepX;
			y -= stepY;
			el.style.left = `${x}px`;
			el.style.top = `${y}px`;
		}, 20);
		
		setTimeout(() => {
			clearInterval(interval)
			el.remove();
		}, 100);
	}
}))