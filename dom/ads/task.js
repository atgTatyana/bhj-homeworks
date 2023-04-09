const rotators = document.querySelectorAll('.rotator');
for (let rotator of rotators) {
	const rotatorCases = [...rotator.querySelectorAll('.rotator__case')];

	let timer = [];
	for (let i = 0; i < rotatorCases.length; i++) {
		rotatorCases[i].style.color = rotatorCases[i].dataset.color;
		timer[i] = rotatorCases[i].dataset.speed;
	}

	function changeText() {
		const indexActiveEl = rotatorCases.findIndex(el => el.classList.contains('rotator__case_active'));
		
		setTimeout(() => {
			rotatorCases[indexActiveEl].classList.remove('rotator__case_active');
			if (indexActiveEl === rotatorCases.length - 1) {
				rotatorCases[0].classList.add('rotator__case_active');
			} else {
				rotatorCases[indexActiveEl + 1].classList.add('rotator__case_active');
			}
			changeText();
		}, timer[indexActiveEl]);
	}
	
	changeText();

	// без изменения скорости смены текстов
	//  setInterval(() => {
	// 	const indexActiveEl = rotatorCases.findIndex(el => el.classList.contains('rotator__case_active'));
	// 	rotatorCases[indexActiveEl].classList.remove('rotator__case_active');

	// 	if (indexActiveEl === rotatorCases.length - 1) {
	// 		rotatorCases[0].classList.add('rotator__case_active');
	// 	} else {
	// 		rotatorCases[indexActiveEl + 1].classList.add('rotator__case_active');
	// 		// rotatorCases[indexActiveEl].nextElementSibling.classList.add('rotator__case_active');
	// 	}
	// }, 1000);
}