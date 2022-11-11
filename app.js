/*
Create following variables
gameGrid -> grid element
restartButton -> retart-game element
worm -> default placement and color of worm
wormColor -> palevioletred
*/
let gameGrid = document.getElementById('game-grid');
let restartButton = document.getElementById('restart-game');
let worm = [
   {x:10, y:11},
   {x:11, y:11},
   {x:12, y:11}
]
const wormSpeed = 1;
let score = 0;

// state
let state;

//HELPER FUNCTIONS

//function shoudl update worm with each render
function moveWorm(){
   gameGrid.innerHTML = ''
   //console.log('updateWorm') -> this puppy is WORKING
   //use for loop to iterate over worm from second to last element, since last element will disapear when moving
   for(let i = worm.lenth -2; i >= 0; i--){
      worm[i +1] = {...worm[i]}

   }
   worm[0].x += 1;
   worm[0].y += 0;

}
//create function to set second snack unit to a darker pink

//function should represrent what the worm looks like when rendered in html
function renderWorm(wormGrid){
   //console.log('makeWorm'); // -> this puppy is WORKING
   worm.forEach(singleSquare =>{
      const wormElement = document.createElement('div');
      wormElement.style.gridRowStart = singleSquare.y;
      wormElement.style.gridColumnStart = singleSquare.x;
      wormElement.classList.add('worm');
      wormGrid.appendChild(wormElement);
   })
  
}




//setting initial state of game before pressing 'play'
function buildInitialState() {

}
buildInitialState();


//create a variable that captures the last time the screen image was rendered
let lastRender = 0;
// render
function renderState(currentTime) {
   window.requestAnimationFrame(renderState)
   const lastRenderTime = (currentTime - lastRender)  / 1000;
   if(lastRenderTime < 1 / wormSpeed){
      return;
   }
   console.log('rendering');
   lastRender = currentTime;
   moveWorm();
   renderWorm(gameGrid);
}
window.requestAnimationFrame(renderState);



// listeners
restartButton.addEventListener('click', ()=>{
   document.location.reload();
})
function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState() // show the user the new state
}

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


