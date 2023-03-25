const elementDead = document.getElementById('dead');
const elementLost = document.getElementById('lost');
let moleDead = Number(elementDead.textContent); 
let moleLost = Number(elementLost.textContent);

const getHole = index => document.getElementById(`hole${index}`); 
function finish() {
	moleDead = 0;
	moleLost = 0;
	elementDead.textContent = moleDead;
	elementLost.textContent = moleLost;
}

for (let i = 1; i <= 9; i++) {
	let elementHole = getHole(i);
	elementHole.onclick = function() {
		if (elementHole.className === 'hole hole_has-mole') {
			moleDead += 1;
			elementDead.textContent = moleDead;
			if (moleDead === 10) {
				finish();
				alert('Вы победили!')
			}
		} else {
			moleLost += 1;
			elementLost.textContent = moleLost;
			if (moleLost === 5) {
				finish();
				alert('Вы проиграли...')
			}
		}
	}
}