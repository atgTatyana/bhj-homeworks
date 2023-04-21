const aAll = document.querySelectorAll('.has-tooltip');

aAll.forEach(a => {
	let tooltip = document.createElement('div');
	tooltip.textContent = a.getAttribute('title');
	tooltip.setAttribute('class', 'tooltip');

	const {x, width} = a.getBoundingClientRect();
	if (Number(x.toFixed()) < 150) {
		tooltip.dataset.position = 'bottom';
	} else if (Number((window.innerWidth - x - width).toFixed()) < 150) {
		tooltip.dataset.position = 'left';
	} else {
		tooltip.dataset.position = 'top';
	}

	a.insertAdjacentElement("afterend", tooltip);
})

function tooltipStyle(a, pos) {
	const {x, y, width, height} = a.getBoundingClientRect();
	let style;

	switch (pos) {
		case 'top':
			style = `left: ${x.toFixed()}px; bottom: ${(window.innerHeight - y).toFixed()}px;`;
			break;
		case 'bottom':
			style = `left: ${x.toFixed()}px; top: ${(y + height).toFixed()}px;`;
			break;
		case 'left':
			style = `right: ${(window.innerWidth - x).toFixed()}px; top: ${y.toFixed()}px;`;
			break;
		case 'right':
			style = `left: ${(x + width).toFixed()}px; top: ${y.toFixed()}px;`;
			break;
	}

	return style;
}

aAll.forEach(a => a.addEventListener('click', (e) => {
	const pos = e.target.nextElementSibling.dataset.position;
	e.target.nextElementSibling.style = tooltipStyle(a, pos);

	e.target.nextElementSibling.classList.toggle('tooltip_active');

	[...aAll].filter(elem => elem.nextElementSibling !== a.nextElementSibling)
		.forEach(elem => elem.nextElementSibling.classList.remove('tooltip_active'));
	
	e.preventDefault();
}))

window.onscroll = () => {
	aAll.forEach(elem => elem.nextElementSibling.classList.remove('tooltip_active'));
}