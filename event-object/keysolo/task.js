class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.handlerKey = this.handler.bind(this);
    this.timerId = 0;

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  setTimer(timer) {
    const timerElement = this.container.querySelector('.timer');
    timerElement.textContent = timer;
    this.timerId = setInterval(() => {
      timerElement.textContent -= 1
      if (timerElement.textContent < 0) {
        this.fail();
      }
    }, 1000);
  }

  handler(event) {
    // console.log(String.fromCharCode(event.keyCode).toLowerCase());
    // document.querySelector('.symbol_current').textContent;   - если контекст потерялся
    if (event.key !== 'Control' && event.key !== 'Shift' && event.key !== 'CapsLock') {
      if (event.key.toLowerCase() === this.currentSymbol.textContent.toLowerCase()) {
        this.success();
      } else {
        this.fail();
      }
    } 
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */
    // keyup - чтобы не было автоповтора нажатия при keydown
    document.addEventListener('keyup', this.handlerKey);
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      clearInterval(this.timerId);
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      clearInterval(this.timerId);
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    clearInterval(this.timerId);
    const word = this.getWord();
    const timer = word.length;

    this.renderWord(word);
    this.setTimer(timer);
  }

  getWord() {
    const words = [
        'bob',
        'Привет',
        'awesome',
        'домашняя работа',
        'netology',
        'я люблю kitkat',
        'Hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'Javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))