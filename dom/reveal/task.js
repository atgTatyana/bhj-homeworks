document.addEventListener('scroll', () => {
	const reveal = document.querySelectorAll('.reveal');
	reveal.forEach(rev => {
		const { top, bottom } = rev.getBoundingClientRect();
		if (bottom > 0 && top < window.innerHeight) {
			if (!rev.classList.contains('reveal_active')) {
				rev.classList.add('reveal_active');
			}
		} else if (rev.classList.contains('reveal_active')) {
			rev.classList.remove('reveal_active');
		}
	})
})