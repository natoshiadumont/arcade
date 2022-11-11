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
   {x:13, y:11},
   {x:12, y:11},
   {x:11, y:11},
   {x:10, y:11},
   {x:9, y:11},
]
const wormSpeed = 1;
let score = 0;

// state
let state;

//create a variable that captures the last time the screen image was rendered
let lastRender = 0;
// render
function renderState(currentTime) {
   window.requestAnimationFrame(renderState)
   const lastRenderTime = (currentTime - lastRender)  / 1000;
   if(lastRenderTime < 1 / wormSpeed){
      return;
   }
  //console.log('rendering');
   lastRender = currentTime;

   moveWorm();
   drawWorm();
}
window.requestAnimationFrame(renderState);


//HELPER FUNCTIONS

//function shoudl update worm with each render
function moveWorm(){
   //console.log('updateWorm') -> this puppy is WORKING
   //use for loop to iterate over worm from second to last element, since last element will disapear when moving
   for(let i = worm.length - 2; i >= 0; i--){
      worm[i + 1] = { ...worm[i] }
      
   }
   worm[0].x += 1;
   worm[0].y += 0;
}
//create function to set second snack unit to a darker pink

//function should represrent what the worm looks like when rendered in html
function drawWorm(){
   gameGrid.innerHTML = '';
   renderWorm(gameGrid);
}

function renderWorm(wormGrid){
   //console.log('makeWorm'); // -> this puppy is WORKING
   worm.forEach(square =>{
      const wormElement = document.createElement('div');
      wormElement.style.gridRowStart = square.y;
      wormElement.style.gridColumnStart = square.x;
      
      if(square === worm[1] || square === worm[2]){
         wormElement.classList.add('alternateWormClass');
      }
      else{
         wormElement.classList.add('worm');
      }
      wormGrid.appendChild(wormElement);
   })

}



//setting initial state of game before pressing 'play'
function buildInitialState() {

}
buildInitialState();


// listeners
restartButton.addEventListener('click', ()=>{
   location.reload();
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


