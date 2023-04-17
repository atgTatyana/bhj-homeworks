const checkboxes = document.querySelectorAll('.interest__check');
for (const checkbox of checkboxes) {
	checkbox.addEventListener('change', () => {
		const parent = checkbox.closest('.interest');
		const children = parent.querySelectorAll('.interest__check');
		const childrenNumber = parent.querySelectorAll('.interest__check').length;

		if (childrenNumber > 1) {
			if (checkbox.checked) {
				children.forEach((child) => {
					child.checked = true;
				})
			} else {
				children.forEach((child) => {
					child.checked = false;
				})
			}
		}
		
		function listTreeUp() {
			if (list) {
				let listName = list.closest('.interest').querySelector('input');
				if ([...list.querySelectorAll('.interest__check')].every(el => el.checked === true)) {
					listName.indeterminate = false;
					listName.checked = true;
				} else if ([...list.querySelectorAll('.interest__check')].some(el => el.checked === true)) {
					listName.indeterminate = true;
				} else {
					listName.indeterminate = false;
					listName.checked = false;
				}

				list = list.closest('.interest').closest('.interests_active');
				listTreeUp();

			} else {
				return;
			}
		}

		let list = checkbox.closest('.interests_active');
		listTreeUp();	
	})
}