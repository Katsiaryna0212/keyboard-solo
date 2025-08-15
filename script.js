const container = document.querySelector('.word');
const correctCount = document.querySelector('.correct-count');
const wrongCount = document.querySelector('.wrong-count');
const wordMistakes = document.querySelector('.word-mistakes');
let word = '';
let letterIndex = 0;

const words = ['apple', 'banana', 'language', 'popcorn', 'family', 'weather', 'google'];

function randomWord() {
  container.innerHTML = '';
  const randomIndex = Math.floor(Math.random() * words.length);

  word = words[randomIndex];

  for (let i = 0; i < word.length; i++) {
    const letter = document.createElement('span');
    letter.textContent = word[i];
    container.append(letter);
  }
};

function stopGame() {
  if (+correctCount.textContent === 5) {
    clearInterval(intervalId);
    alert(`Победа! Ваше время ${timer.textContent}`);
  } else if (+wrongCount.textContent === 5) {
    clearInterval(intervalId);
    alert('Вы проиграли!');
  }
}

randomWord();


document.addEventListener('keydown', function(event) {
    const letterSpans = container.querySelectorAll('span');
    const letterWord = word[letterIndex];
    if (event.key === letterWord) {
      letterSpans[letterIndex].classList.remove('w');
      letterSpans[letterIndex].classList.add('c');
      letterIndex++;
      if (letterIndex === word.length) {
        if (+wordMistakes.textContent !== 0) {
          wrongCount.textContent = ++wrongCount.textContent;
        } else {
          correctCount.textContent = ++correctCount.textContent;
        }
        letterIndex = 0;
        randomWord();
        wordMistakes.textContent = 0; 
      }
    } else {
      letterSpans[letterIndex].classList.add('w');
      wordMistakes.textContent = ++wordMistakes.textContent;
    }
    stopGame();
});

const timer = document.querySelector('#timer');
const timeString = timer.textContent;
const timeArray = timeString.split(':');
let minutes = +timeArray[0];
let seconds = +timeArray[1];

let intervalId = setInterval(() => {
  if (seconds === 60) {
    minutes++;
    seconds = 1;
  } else {
    seconds++;
  }
  const formatMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formatSeconds = seconds < 10 ? '0' + seconds : seconds;
  timer.textContent = `${formatMinutes}:${formatSeconds}`;
}, 1000);