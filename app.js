// Variables so I don't have a document.querySelector mess throughout my code.

const panel = document.querySelector('.color-box');
const options = document.querySelectorAll('.option');
const optionsColors = document.querySelectorAll('.rgb-values');
const startGameBtn = document.querySelector('.game-start');
const playAgainBtn = document.querySelector('.play-again');
const selectPrompt = document.querySelector('.select-prompt');
const correctPrompt = document.querySelector('.correct')
const incorrectPrompt = document.querySelector('.incorrect')
const currentScore = document.querySelector('.current-score');
const highScore = document.querySelector('.high-score');
let currentScoreCount = 0;
let highScoreCount = 0;
let incorrect = false;

// Starts the game.
startGameBtn.addEventListener('click', game);
playAgainBtn.addEventListener('click', game);



function game() {
  // Resets some things about the game, such as adding and removing prompts.
  startGameBtn.classList.add('hidden');
  playAgainBtn.classList.add('hidden');
  selectPrompt.classList.remove('hidden')
  correctPrompt.classList.add('hidden');
  currentScore.classList.remove('hidden')
  highScore.classList.remove('hidden')
  incorrect = false;

  // Adds event listeners to the answer choice buttons and resets their borders back to black.
  for (let i = 0; i < options.length; i++) {
    options[i].style.borderColor = 'black'
    options[i].addEventListener('click', check);
  }

  // Executes the generate RGB Values function and stores the array in the 'values' variable.
  const values = generateRGBValues();
  //Generates a random number between 0 and 2 to be the correct answer.
  let answer = Math.floor(Math.random() * 3);
  //Sets the background color of the big panel to the RGB values of the correct answer.
  panel.style.backgroundColor = `rgb(${values[answer][0]}, ${values[answer][1]}, ${values[answer][2]})`;

  // Converts the numerical answer into words for the if statement on line 71.
  if (answer === 0) {
    answer = 'one';
  } else if (answer === 1) {
    answer = 'two';
  } else {
    answer = 'three';
  }

  // console.log(answer);

  // Sets the text inside of the answer choice buttons to their respective numerical RGB values.
  for (i in optionsColors) {
    optionsColors[i].innerText = `(${values[i][0]}, ${values[i][1]}, ${values[i][2]})`;
  }



  function check(e) {
    //Variables for later use.
    const selected = e.target.parentElement;
    const selectedClassName = selected.classList[1];
    let selectedClassNum;

    // Sets the numerical value of the answer choice that is clicked.
    if (selectedClassName === 'one') {
      selectedClassNum = 0;
    } else if (selectedClassName === 'two') {
      selectedClassNum = 1;
    } else {
      selectedClassNum = 2;
    }

    // Sets the border color of the answer clicked on to the respective RGB values.
    selected.style.borderColor = `rgb(${values[selectedClassNum][0]}, ${values[selectedClassNum][1]}, ${values[selectedClassNum][2]})`;



    // Executes if the clicked answer is correct.
    if (selectedClassName === answer) {
      // Removes event listeners from all answer choice buttons.
      for (let i = 0; i < options.length; i++) {
        options[i].removeEventListener('click', check);
      }

      // Sets border colors of all answer choice buttons.
      for (let i = 0; i < options.length; i++) {
        options[i].style.borderColor = `rgb(${values[i][0]}, ${values[i][1]}, ${values[i][2]})`;
      }

      // If the incorrect boolean is false (if no wrong answer was selected prior to the correct one), add one to score.
      if (!incorrect) {
        currentScoreCount++;

        // If the current score is higher than the high score, update high score to that.
        if (currentScoreCount > highScoreCount) {
          highScoreCount = currentScoreCount;
        }
      }

      // Updates the scores on the screen.
      currentScore.innerHTML = `Current score:<br>${currentScoreCount}`;
      highScore.innerHTML = `High score:<br>${highScoreCount}`;

      // Removes as well as displays content on the screen.
      playAgainBtn.classList.remove('hidden');
      selectPrompt.classList.add('hidden');
      correctPrompt.classList.remove('hidden');
      incorrectPrompt.classList.add('hidden');

      // Executes if the clicked answer is incorrect.
    } else {
      // Displays the 'incorrect prompt'.
      incorrectPrompt.classList.remove('hidden');

      // Sets boolean to true so that score is not added for this round.
      incorrect = true;

      // Resets score to 0 and displays it.
      currentScoreCount = 0;
      currentScore.innerHTML = `Current score:<br>${currentScoreCount}`;
    }
  }
}



// function generateRGBValues() {
//   // Initializes array with 3 rows.
//   let values = [
//     [],
//     [],
//     []
//   ];

//   // Populates a 3x3 array with random numbers from 0 to 255.
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       values[i][j] = Math.floor(Math.random() * 256);
//     }
//   }

//   return values;
// }

function generateRGBValues() {
  // Initializes array with 3 rows.
  let values = [
    [],
    [],
    []
  ];

  // Populates first row of the array with random numbers from 0 to 255.
  for (let i = 0; i < 3; i++) {
    values[0][i] = Math.floor(Math.random() * 256);
  }

  // Populates second and third rows according to the previous values to prevent answer choices from being too similar.
  for (i = 1; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let num = values[i - 1][j];
      num += Math.floor(Math.random() * 50 + 51);

      // Resets num back to 0 if it goes above 255.
      if (num > 255) {
        num = num - 255;
      }
      values[i][j] = num;
    }
  }

  return values;
}