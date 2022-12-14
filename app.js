/*
Create following variables
gameGrid -> grid element
restartButton -> retart-game element
worm -> default placement and color of worm
wormColor -> palevioletred
*/
let gameOver = false;
let gameGrid = document.getElementById('game-grid');
let restartButton = document.getElementById('restart-game');
let play = document.getElementById('playButton');
let gameOverMessage = document.getElementById('gameOverMessage');
//create dynamic score keeper that populates inside of score id innerHTML
//declare variable score to equal current amount of fruit eatent
let currentScore = 0;
let scoreText = document.getElementById('score');//get score html element
scoreText.innerHTML = `Score: ${currentScore}`;
//set innerHTML to be able to change with score

// make move const that has initial movement change of 0:0
let moveState = { x: 0, y: 0 };
let lastMoveState = { x: 0, y: 0 };

//WORM VARIABLES
let worm = [
   { x: 11, y: 11 }
]

let wormSpeed = 10;
const wormGrowth = 1;

let fruits = ['apple', 'banana', 'strawberry', 'pear', 'blackberry', 'orange'];

//generate random index to choose a fruit class each time it moves
let randomIdx = (array) => Math.floor(Math.random(100) * array.length);

const fruitElement = document.createElement('div');
fruitElement.setAttribute('id', `blackberry`);
//FRUIT VARIABLES
let fruit = { x: 11, y: 5, id: randomFruitImg() };



//CREATE AN ARRAY WITH STRINGS OF FRUIT ICON NAMES



//setting initial state of game before pressing 'play'
function buildInitialState() {
   //reset food in a new random grid area
   //reset worm to {x:11, y:11}
   //reset current score to zero
   //move fruit into new random grid spot

   fruit = { x: 11, y: 5, id: randomFruitImg() };
   moveState = { x: 0, y: 0 };
   lastMoveState = { x: 0, y: 0 };
   worm = [
      { x: 11, y: 11 },
   ]
   currentScore = 0;
   scoreText.innerHTML = `Score: ${currentScore}`;
   randomFruitImg();
   toggleSpeed();
   gameOver = false;
   restartButton.innerText = 'Restart Game';
}

// restart listener that bring game back to initial state


//create a variable that captures the last time the screen image was rendered
let lastRender = 0;
// render
function lessThan10(){
   if(currentScore === 0){
      return `The worm wasn't able to eat at all.
      Not cool, dude...`;

   }
   else if(currentScore === 1){
      return `The worm ate once.
       She's not impressed.`;

   }
   else{
      return `The worm was able to eat ${currentScore} times.
      She's not impressed.`;
   }
}

function renderState(currentTime) {
   if (gameOver) {
      if(currentScore < 10){
         gameOverMessage.innerText = `
         GAME OVER!!!
         ${lessThan10()}

         #starving
         #yourebetterthanthis
         #PressRestartGame`;
         return;
      }
      else if(currentScore < 20){
         gameOverMessage.innerText = `
   
         Sorry... Game Over.
      
         The worm was able to eat ${currentScore} times.
         Not bad! 
         Practice makes perfect.
      
         #yougotthis
         #PressRestartGame`;
         return
      }
      else if(currentScore < 30){
         gameOverMessage.innerText = `
   
         Acheivment Unlocked:
      
         The worm is full after eating 
         ${currentScore} times!
         Looks like you don't need practice!
      
         #GreatJob
         #AchievmentUnlocked`;
         return;
      }
         gameOverMessage.innerText = `
   
         CONGRATULATIONS! YOU WIN!
      
         The worm is totally stuffed after eating 
         ${currentScore} times!
         You play like a PRO!
      
         #YOUROCK
         #EXPERTLAYER`;
         
      return;
   }

      
   window.requestAnimationFrame(renderState)
   const lastRenderTime = (currentTime - lastRender) / 1000;
   if (lastRenderTime < 1 / wormSpeed) {
      return;
   }
   //console.log('rendering');
   lastRender = currentTime;
   moveWorm();
   drawWorm();
   moveFruit();
   renderFruit(gameGrid);
   toggleSpeed();
   isAlive();
}


//WORM RENDER/MOVEMENT FUNCTIONS//////////////////////////////////////
//create function to set second snack unit to a darker pink
function drawWorm() {
   gameGrid.innerHTML = '';
   renderWorm(gameGrid);

}

//add event listener that tracks pressing the arroS keys to determine worm movenment.
window.addEventListener('keydown', e => {
   //update: create conditional to avoid moving worm in on itself.
   //BUG: worm can move in direction that goes on top of itself. ugh
   // here you might read which key was pressed and update the state accordingly
   //make switch cases to update worm direction
   switch (e.key) {
      case 'ArrowUp':
         if (lastMoveState.y !== 0) { break; }
         moveState = { x: 0, y: -1 };
         break;
      case 'ArrowDown':
         if (lastMoveState.y !== 0) { break; }
         moveState = { x: 0, y: 1 }
         break;
      case 'ArrowLeft':
         if (lastMoveState.x !== 0) { break; }
         moveState = { x: -1, y: 0 }
         break;
      case 'ArrowRight':
         if (lastMoveState.x !== 0) { break; }
         moveState = { x: 1, y: 0 }
         break;
   }
})



//helper function returns the movement of the worm. Used in render func
function movementFunc() {
   lastMoveState = moveState;
   return moveState;
}



//gerate random row / column for fruit

function randomXY() {
   return Math.floor(Math.random(100) * (21 - 1) + 1);
}
//generate random column number for fruit
//   console.log(randomRow, randomColumn); -> working
//   console.log(fruits[randomIdx()]);-> working
// random fruit movement that will place fruit at rand

//moveWorm function should handle worm movements on grid
//function should update worm with each render and have all sections following
function moveWorm() {
   const direction = moveState;
   //console.log('updateWorm') -> this puppy is WORKING
   //use for loop to iterate over worm from second to last element, since last element will disapear when moving
   for (let i = worm.length - 2; i >= 0; i--) {
      worm[i + 1] = { ...worm[i] }
   }
   worm[0].x += direction.x;
   worm[0].y += direction.y;
   movementFunc();
}


//function should represrent what the worm looks like when rendered in html
function renderWorm(wormGrid) {
   //console.log('makeWorm'); // -> this puppy is WORKING
   worm.forEach(square => {
      const wormElement = document.createElement('div');
      wormElement.style.gridRowStart = square.y;
      wormElement.style.gridColumnStart = square.x;
      //styling worm segments to add a little EXTRAH!!! HAHAHA
      if (square === worm[2] || square === worm[3] || square === worm[4]) {
         wormElement.classList.add('alternateWormClass');
      }

      else {
         wormElement.classList.add('worm');
      }
      wormGrid.appendChild(wormElement);
   })

}



//FUNCTION RELEVANT TO WORM EATING FRUIT//////////////////////////
let newSegments = 0;

function addSegment(num) {
   newSegments += num;
   //use for loop to iterate over worm segments
   for (let i = 0; i < newSegments; i++) {
      worm[worm.length] = worm.length - 1;
   newSegments = 0;
   }
}

function wormAte(location, ignoreHead) {
   console.log("DEBUG:  ignoreHead is ", ignoreHead, worm);
   let res = worm.some((segment, index) => {
      if (ignoreHead && index === 0) {
         return false;
      }
      return sameLocation(segment, location)

   })
   console.log("DEBUG:  res:", res)
   return res;
}

function sameLocation(location1, location2) {
   if (location1 &&
      location1.x &&
      location1.y &&
      location2 &&
      location2.x &&
      location2.y) {
      //test if worm segment is in the same place as a worm
      return (location1.x === location2.x && location1.y === location2.y);
   }
   else {
      return false;
   }


}
/*moveFruit function should handle fruit randomly moving w/ different along with them being random fruit icon imageson grid
//function should update worm with each render and have all sections following*/
//add function that adds a segment to the worm once it comes in contact with a fruit

function moveFruit() {

   if (wormAte(fruit, false)) {
      console.log("DEBUG: inside wormAte: fruit hit");
      fruitElement.removeAttribute('id');
      currentScore++;
      addSegment(wormGrowth);
      randomFruitImg();
      fruit = { x: randomXY(), y: randomXY(), id: randomFruitImg() };
      while (wormAte(fruit, false)) {
         fruit = { x: randomXY(), y: randomXY(), id: randomFruitImg() };
      }
      scoreText.innerHTML = `Score: ${currentScore}`;

   }
   // console.log(fruit);
}
//function should represrent what the fruit looks like when rendered in html

function renderFruit(gameGrid) {
   //console.log('makeWorm'); // -> this puppy is WORKING
   //GENERATE RANDOM FRUIT IMAGES PER FRUIT MOVE

   const fruitElement = document.createElement('div');
   fruitElement.style.gridRowStart = fruit.y;
   fruitElement.style.gridColumnStart = fruit.x;

   if (!fruitElement.hasAttribute('class')) {
      fruitElement.classList.add(`fruit`);
      fruitElement.setAttribute('id', fruit.id);
   }
   // fruitElement.classList.add(`${fruits[randomIdx(fruits)]}`);
   gameGrid.appendChild(fruitElement);
}
function randomFruitImg() {
   return fruits[randomIdx(fruits)];
}
//console.log(fruits[randomIdx(fruits)]);

//TOGGLE DIFFICULTY
//GET SELECTOR ELEMENT
let difficulty = document.getElementById('difficulty');
function toggleSpeed() {
   if (difficulty.value === 'easy') {
      wormSpeed = 2;
   }
   if (difficulty.value === 'classic') {
      wormSpeed = 5;
   }
   if (difficulty.value === 'hard') {
      wormSpeed = 12;
   }
   return wormSpeed;
}



////PLAY BUTTON FUNCTIONALITY///////

// make event listener that remove play button on click and playButtonScreen
// should also trigger initial state

restartButton.addEventListener('click', ()=>{
   window.requestAnimationFrame(renderState);
   gameOverMessage.innerHTML = '';
   restartButton.innerText = 'Restart Game'
   buildInitialState();
   moveFruit();
})

//////END GAME FUNCTIONALITY///////////
const gridSize = 21;
function getFirstSegment() {
   return worm[0];
}
function wormIntersection() {
   return wormAte(getFirstSegment(), true);
}
function notInGrid(location) {
   return (
      location.x < 1 || location.x > gridSize ||
      location.y < 1 || location.y > gridSize);
}
function isAlive() {
   gameOver = notInGrid(getFirstSegment()) || wormIntersection();
   console.log('working');
}
