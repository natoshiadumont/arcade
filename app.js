/*
Create following variables
gameGrid -> grid element
restartButton -> retart-game element
worm -> default placement and color of worm
wormColor -> palevioletred
*/

let gameScreen = document.getElementById('game-grid');
let restartButton = document.getElementById('restart-game');
let worm = {
   body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
   nextDirection: [1, 0]
}
let wormColor = 'palevioletred';

// state
let state;


//setting initial state of game before pressing 'play'
function buildInitialState() {
 

}
buildInitialState();



// render
function renderState() {

}

// maybe a dozen or so helper functions for tiny pieces of the interface

let fruitCounter = 1;

//make randomRow and Random Column variables
const randomRow = Math.floor(Math.random(100) * 17);
const randomColumn = Math.floor(Math.random(100) * 20);
//create placeFruit function to randomly place fruit on grid
function placeFruit(){
const fruits = ['apple', 'banana', 'blackberry', 'orange', 'pear'] ; 
function randomFruit(){
   return Math.floor(Math.random(100) * fruits.length)
}
let fruit = `images/fruit-icons/${fruits[randomFruit()]}.png`;
while(fruitCounter <= 3){
   //use arrow function to add attribute randomFruit into randomRow RandomColum
   ()=>{
     document.getElementById(`row: ${randomRow} column: ${randomColumn} `).setAttribute(`${fruit.src}`);
   }
   fruitCounter++;
} 
}
placeFruit();
// listeners
restartButton.addEventListener('click', ()=>{
   document.location.reload();
})
function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState() // show the user the new state
}
gameScreen.addEventListener('keydown', changeDirection)
const board = document.getElementById('board');
board.addEventListener('click', onBoardClick); // etc

// add to above
function tick() {
   // this is an incremental change that happens to the state every time you update...
 
   renderState()
 }
 
 setInterval(tick, 1000 / 30) // as close to 30 frames per second as possible
 
 // now you might have things like
 document.addEventListener('keydown', function (event) {
   // here you might read which key was pressed and update the state accordingly
 })


