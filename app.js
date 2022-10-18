const panel = document.querySelector('.color-box');
const options = document.querySelectorAll('.option');
const optionsColors = document.querySelectorAll('.rgb-values');
const startGameBtn = document.querySelector('.game-start');
const playAgainBtn = document.querySelector('.play-again');
const selectPrompt = document.querySelector('.select-prompt');
const correctPrompt = document.querySelector('.correct')
const incorrectPrompt = document.querySelector('.incorrect')

startGameBtn.addEventListener('click', game);
playAgainBtn.addEventListener('click', game);



function game() {
  startGameBtn.classList.add('hidden');
  playAgainBtn.classList.add('hidden');
  selectPrompt.classList.remove('hidden')
  correctPrompt.classList.add('hidden');

  for (let i = 0; i < options.length; i++) {
    options[i].style.borderColor = 'black'
    options[i].addEventListener('click', check);
  }

  const values = generateRGBValues();
  let answer = Math.floor(Math.random() * 3);
  panel.style.backgroundColor = `rgb(${values[answer][0]}, ${values[answer][1]}, ${values[answer][2]})`;

  if (answer === 0) {
    answer = 'one';
  } else if (answer === 1) {
    answer = 'two';
  } else {
    answer = 'three';
  }
  console.log(answer);

  for (i in optionsColors) {
    optionsColors[i].innerText = `(${values[i][0]}, ${values[i][1]}, ${values[i][2]})`;
  }

  function check(e) {
    const selected = e.target.parentElement;
    const selectedClassName = selected.classList[1];
    let selectedClassNum;

    if (selectedClassName === 'one') {
      selectedClassNum = 0;
    } else if (selectedClassName === 'two') {
      selectedClassNum = 1;
    } else {
      selectedClassNum = 2;
    }

    console.log(selected);
    console.log(selectedClassName);
    selected.style.borderColor = `rgb(${values[selectedClassNum][0]}, ${values[selectedClassNum][1]}, ${values[selectedClassNum][2]})`;
    console.log(answer);

    if (selectedClassName === answer) {
      for (let i = 0; i < options.length; i++) {
        options[i].removeEventListener('click', check);
      }

      playAgainBtn.classList.remove('hidden');
      selectPrompt.classList.add('hidden');
      correctPrompt.classList.remove('hidden');
      incorrectPrompt.classList.add('hidden');
    } else {
      incorrectPrompt.classList.remove('hidden');
    }

  }

}

function generateRGBValues() {
  let values = [
    [],
    [],
    []
  ];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      values[i][j] = Math.floor(Math.random() * 256);
    }
  }

  return values;
}