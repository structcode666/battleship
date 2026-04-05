import { Player } from "./player";
import { Gamecontroller } from "./gameController";
import { renderPlayerScreen, initializeGame} from "./gameBoardRender";




function initializePage(){

    const mainBody = document.querySelector(".main-board")

    mainBody.innerHTML = "";

    const initialPage = document.createElement("div")
    initialPage.classList.add("start-container")

    const playerOneInput = document.createElement("input")
    playerOneInput.type = "text";
    playerOneInput.classList.add("player-input")
    playerOneInput.dataset.player = "player"
    playerOneInput.placeholder = "Player One"
    playerOneInput.value = "You"
    initialPage.appendChild(playerOneInput)

    const versus = document.createElement("div")
    versus.classList.add("versus")
    versus.innerHTML = "V/S"
    initialPage.appendChild(versus)


    const playerTwoInput = document.createElement("input");
    playerTwoInput.type = "text";
    playerTwoInput.classList.add("player-input")
    playerTwoInput.dataset.player = "opponent"
    
    playerTwoInput.placeholder = "Opponent";
    playerTwoInput.value = "Computer";
    initialPage.appendChild(playerTwoInput)

    const nextButton = document.createElement("button")
    nextButton.classList.add("button")
    nextButton.textContent = "NEXT"
    initialPage.appendChild(nextButton)

    mainBody.appendChild(initialPage)

}

function createGame(){

    const button = document.querySelector(".button");
    const mainBody = document.querySelector(".main-board")
    const playerOneInput = document.querySelector(`[data-player = "player"]`)
    const playerTwoInput = document.querySelector(`[data-player = "opponent"]`)
    
    button.addEventListener('click', ()=>{
        const playerOne = new Player(playerOneInput.value)
        const playerTwo = new Player(playerTwoInput.value)

        if(playerTwoInput.value.trim().toLowerCase() == "computer") 
            {playerTwo.isComputer = true};

        let currentGame = new Gamecontroller(playerOne,playerTwo)

        initializeGame(currentGame)
    })
}

export {initializePage, createGame}