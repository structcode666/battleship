import { renderShips, selectShip, renderRotatedShip} from "./shipRender"
import { addMainEventListeners, addGlobalEventListeners, battleEventListeners} from "./eventListeneners"

function createGameBoard(player){
    
    let gameBoard = document.createElement("div")
    gameBoard.classList.add("gameboard-div")
    gameBoard.dataset.player = player.name

    for(let y=9; y>=0 ; y--){

        for(let x=0 ; x<10; x++){




            let cell = document.createElement("div")
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.dataset.player = player.name

            cell.classList.add("cell")

            if(player.gameboard.hasShipAt([x,y])){

                cell.classList.add("ship-cell-occupied")
            }

            if(player.gameboard.hitCoordinate([x,y])) {

                cell.classList.add("hit")
            }
            if(player.gameboard.missedCoordinate([x,y])) {

                cell.classList.add("miss")
            }
            
            
            

            gameBoard.appendChild(cell)
        }
    }

    return gameBoard

}
function renderPlayerScreen(player, onNext, gameController){

     //create gameboard//
    const mainBody = document.querySelector(".main-board")
    mainBody.innerHTML = ""

    let playerBoard = createGameBoard(player)

    mainBody.appendChild(playerBoard)

    //render player name//
    let gameTitle = document.querySelector(".game-title")
    gameTitle.innerHTML = `BATTLESHIP - ${player.name}'s Battle Board`
    

    //render ships//
    let shipsDiv = renderShips(player)
    mainBody.appendChild(shipsDiv)

    //create next button//
    const nextButton = document.createElement("button")
    nextButton.classList.add("button")
    nextButton.textContent = "NEXT"
    mainBody.appendChild(nextButton)

    //ship and cell selection//
    // selectCell(gameController, player);
    // selectShip(gameController);
    // renderRotatedShip(gameController)

    //handle next screen prompt//
    nextButton.addEventListener('click', ()=>{

       onNext(gameController)
       
    } )
}

function renderBattleBoard(gameController){

    const mainBody = document.querySelector(".main-board")
    mainBody.innerHTML = ""

    const gameTitle = document.querySelector(".game-title")

    if(!gameController.gameWinner) gameTitle.innerHTML = `BEGIN BATTLE - ${gameController.currentPlayer.name}'s turn`
    if(gameController.gameWinner) gameTitle.innerHTML = `${gameController.gameWinner.name}'s Won`


    let playerBoard = createGameBoard(gameController.playerOne)

    let opponentBoard = createGameBoard(gameController.playerTwo)

    mainBody.appendChild(playerBoard)
    mainBody.appendChild(opponentBoard)

    // selectCell()

}

function checkGameState(gameController){

    if(!gameController.playerTwo.isComputer){

        if(gameController.playerOne.gameboard.allShipsPlaced() && gameController.gamePhase == "playerOne-setup") gameController.gamePhase = "playerTwo-setup"

        else if(gameController.playerTwo.gameboard.allShipsPlaced() && gameController.gamePhase == "playerTwo-setup") gameController.gamePhase = "battle"
    } else if (gameController.playerTwo.isComputer){

        


        if(gameController.playerOne.gameboard.allShipsPlaced() && gameController.gamePhase == "playerOne-setup") {
            //place computer ships//
            gameController.playerTwo.gameboard.placeComputerShips()

            //reset current player to playerOne//
            gameController.currentPlayer = gameController.playerOne

            //change game phase to battle!//
            gameController.gamePhase ="battle"
        }

    }
}


function onNext(gameController){

    checkGameState(gameController)
    renderScreen(gameController)
    console.log(gameController.gamePhase)
    console.log(gameController.currentPlayer)

}

function renderScreen(gameController){

    if(gameController.gamePhase == "playerOne-setup") {

        renderPlayerScreen(gameController.playerOne, onNext, gameController)
    
    } else if(gameController.gamePhase == "playerTwo-setup") {
        renderPlayerScreen(gameController.playerTwo, onNext, gameController)
    } else if(gameController.gamePhase == "battle") {

        renderBattleBoard(gameController)
        battleEventListeners(gameController)
    }
}

function initializeGame(gameController){

    renderPlayerScreen(gameController.playerOne, onNext, gameController)
    addMainEventListeners(gameController, gameController.currentPlayer)
    addGlobalEventListeners(gameController, gameController.currentPlayer)

}








export { initializeGame, renderScreen, renderBattleBoard}

