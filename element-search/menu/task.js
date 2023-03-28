// Если много меню, получить нужное
const menuMain = document.querySelector('.menu_main');

const links = menuMain.querySelectorAll('.menu__link');

for (let link of links) {
	link.onclick = function() {
		let parentLink = link.closest('.menu__item');
		let child = parentLink.querySelector('.menu_sub');

		if (child) {
			function deleteMenuActive() {				// проверка, есть ли открытые меню
				let menuActive = menuMain.querySelector('.menu_active');
				if (menuActive) {
					menuActive.className = 'menu menu_sub';
				}
			}

			if (child.className === 'menu menu_sub menu_active') {
				child.className = 'menu menu_sub';
				deleteMenuActive();
			} else {
				deleteMenuActive();
				child.className = 'menu menu_sub menu_active';
			}
			return false;
		} 
	}
}