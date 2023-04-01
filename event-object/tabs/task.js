const tabs1 = document.getElementById('tabs1');

const tabs = Array.from(tabs1.querySelectorAll('.tab'));
const contents = tabs1.querySelectorAll('.tab__content');

for (let tab of tabs) {
	tab.addEventListener('click', function() {
		tabs1.querySelector('.tab_active').className = 'tab';
		tab.className = 'tab tab_active';
		tabs1.querySelector('.tab__content_active').className = 'tab__content';
		contents[tabs.indexOf(tab)].className = 'tab__content tab__content_active';
	});
}