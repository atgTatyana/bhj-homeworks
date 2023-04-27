const xhr = new XMLHttpRequest();

xhr.addEventListener('readystatechange', () => {
	if (xhr.readyState === xhr.DONE) {
		const serverResponse = JSON.parse(xhr.responseText);

		let question = serverResponse.data.title;
		let answers = serverResponse.data.answers;
		let pollId = serverResponse.id;
		
		drawPoll(question, answers);
		sendResult(pollId, answers);
	}
})

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();

function drawPoll(question, answers) {
	const pollAnswers = document.getElementById('poll__answers');
	const pollTitle = document.getElementById('poll__title');

	pollTitle.innerText = question;

	for (let i = 0; i < answers.length; i++) {
		let button = document.createElement('button');
		button.setAttribute('class', 'poll__answer');
		button.innerText = answers[i];
		pollAnswers.appendChild(button);
	}
}

function sendResult(pollId, answers) {
	const pollAnswers = document.getElementById('poll__answers').querySelectorAll('.poll__answer');
	pollAnswers.forEach((el) => {
		el.addEventListener('click', (e) => {
			alert('Спасибо, ваш голос засчитан!');
			let pollIndex = answers.findIndex(answer => answer === e.target.innerText);

			const xhr = new XMLHttpRequest();
			xhr.addEventListener('readystatechange', () => {
				if (xhr.readyState === xhr.DONE) {
					const serverResponse = JSON.parse(xhr.responseText);
			
					drawResult(serverResponse.stat);
				}
			})
			
			xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send(`vote=${pollId}&answer=${pollIndex}`);
		});
	})
}

function drawResult(result) {
	const pollAnswers = document.getElementById('poll__answers');
	pollAnswers.innerHTML = '';

	let votes = 0;
	for (let i = 0; i < result.length; i++) {
		votes += result[i].votes;
	}

	for (let i = 0; i < result.length; i++) {
		let div = document.createElement('div');
		let percent = ((result[i].votes * 100) / votes).toFixed(2);
		div.innerText = `${result[i].answer}: ${percent}%`;
		pollAnswers.appendChild(div);
	}
}