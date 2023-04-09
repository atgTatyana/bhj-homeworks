const menulinks = [...document.querySelectorAll('.menu__link')];

const onClick = e => {
  const link = e.target;      // текущая (нажатая) ссылка
  const item = link.closest('.menu__item');
  const menu = item.querySelector('.menu_sub');		// кликнутое меню
	if (!menu) {				// если меню нет, а просто переход по ссылке из HTML
		return;
	}

	// menu.classList.add('menu_active');			// добавить класс
	menu.classList.toggle('menu_active');        // переключать классы по нажатию (активный/неактивный)
	// ! но, можно открывать сразу несколько подменю, а надо одно

	const mainMenu = item.closest('.menu_main');
	const restMenus = [... mainMenu.querySelectorAll('.menu')]
		.filter(m => m !== menu)			// не кликнутые меню
		.forEach(m => m.classList.remove('menu_active'));	// удалилить все открытые некликнутые меню
	
	// menu.classList.toggle('menu_active');			// не переключает, если на одно меню кликать
	
	e.preventDefault();     // чтобы не было перехода поссылке
};

menulinks.forEach(link => link.addEventListener('click', onClick)); 