const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


//let's create a Function to Initialize the Game

function initGame (){
currentPlayer = "X";
gameGrid = ["","","","","","","","",""];
newGameBtn.classList.remove("active");
//To Empy UI For The Function InitGame in newGameBtn
boxes.forEach((box,index)=>{
    box.innerText="";
boxes[index].style.pointerEvents="all";
//Initialize box properties with css again

box.classList = `box box${index+1}`;
})
gameInfo.innerText = `Current Player - ${currentPlayer}`;
} 


//Running initgame function

initGame();


//SwapTurn Function

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer ="O";
    }else{
        currentPlayer="X";
    }
//Ui Update 

gameInfo.innerText = `Current Player - ${currentPlayer}`;

}



//CheckGame Over Function
function checkGameOver(){
let answer = "";

winningPositions.forEach((position)=>{
    if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
    && (gameGrid[position[0]]===(gameGrid[position[1]]))&& (gameGrid[position[1]])===(gameGrid[position[2]])){

        //To Check If The Winner Is X 
if(gameGrid[position[0]]==="X")
answer = "X";
else
answer = "O";

//Disable Pointer Events 

boxes.forEach((box)=>{
    box.style.pointerEvents="none";
})

//Now We Know The Winner So Adding the Winner bG Color

boxes[position[0]].classList.add("win");
boxes[position[1]].classList.add("win");
boxes[position[2]].classList.add("win");

}
});

//We have a Winner And Now time to Add the new game button

if(answer !==""){
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
}
   
let fillCount = 0;
gameGrid.forEach((box)=>{
    if(box !=="")
    fillCount++;
});



if(fillCount===9){
    gameInfo.innerText= "Game tied !";
    newGameBtn.classList.add("active");
}
}






function handleClick(index){
if(gameGrid[index]===""){
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";

    //Swapping the Turn
    swapTurn();

    //Check If Any Player Won!!
    checkGameOver();
}
}


boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index)
    })
});


newGameBtn.addEventListener("click",initGame);