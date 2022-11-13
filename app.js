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
   {x:11, y:11},
]
const wormSpeed = 3;
let score = 0;
// make move const that has initial movement change of 0:0
let moveState = {x:0, y:0};
let lastMoveState = {x:0, y:0};
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



//create function to set second snack unit to a darker pink
function drawWorm(){
   gameGrid.innerHTML = '';
   renderWorm(gameGrid);
}

//add event listener that tracks pressing the arro keys.
window.addEventListener('keydown', e =>{
   //update: create conditional to avoid moving worm in on itself.
   //BUG: worm can move in direction that goes on top of itself. ugh
   // here you might read which key was pressed and update the state accordingly
   //make switch cases to update worm direction
   switch(e.key){
      case 'ArrowUp':
         if(lastMoveState.y !== 0){break;}
         moveState = {x:0, y:-1};
         break; 
      case 'ArrowDown':
         if(lastMoveState.y !== 0){break;}
      moveState = {x:0, y:1}
         break; 
      case 'ArrowLeft':
         if(lastMoveState.x !== 0){break;}
         moveState = {x:-1, y:0}
         break; 
      case 'ArrowRight':
         if(lastMoveState.x !== 0){break;}
         moveState = {x:1, y:0}
         break; 
   }
})


function movementFunc(){
   lastMoveState = moveState;
   return moveState;
}


//moveWorm function should handle worm movements on grid
//function should update worm with each render and have all sections following
function moveWorm(){
   const direction = moveState;
   //console.log('updateWorm') -> this puppy is WORKING
   //use for loop to iterate over worm from second to last element, since last element will disapear when moving
   for(let i = worm.length - 2; i >= 0; i--){
      worm[i + 1] = { ...worm[i] }
      
   }
   worm[0].x += direction.x;
   worm[0].y += direction.y;
   movementFunc();
}



//function should represrent what the worm looks like when rendered in html

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
 

 //event listener for arrow entires

 

 
 // now you might have things like



