import { renderShips, selectShip} from "./shipRender"

function createGameBoard(player){
    
    let gameBoard = document.createElement("div")
    gameBoard.classList.add("gameboard-div")
    gameBoard.dataset.player = player.name

    for(let y=9; y>=0 ; y--){

        for(let x=0 ; x<10; x++){

            let cell = document.createElement("div")

            cell.classList.add("cell")

            if(player.gameboard.hasShipAt([x,y])){

                cell.classList.add("ship-cell-occupied")
            }
            
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.dataset.player = player.name
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
    let shipsDiv = renderShips()
    mainBody.appendChild(shipsDiv)

    //create next button//
    const nextButton = document.createElement("button")
    nextButton.classList.add("button")
    nextButton.textContent = "NEXT"
    mainBody.appendChild(nextButton)

    //ship and cell selection//
    selectCell(gameController, player);
    selectShip(gameController);



    //handle next screen prompt//
    nextButton.addEventListener('click', ()=>{

       onNext(gameController)
       
    } )
}

function renderBattleBoard(gameController){

    const mainBody = document.querySelector(".main-board")
    mainBody.innerHTML = ""

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


        if(gameController.playerOne.gameboard.allShipsPlaced() && gameController.gamePhase == "playerOne-setup") gameController.gamePhase ="battle"

    }



}

function onNext(gameController){

    checkGameState(gameController)
    renderScreen(gameController)

}

function renderScreen(gameController){

    if(gameController.gamePhase == "playerOne-setup") {

        return renderPlayerScreen(gameController.playerOne, onNext, gameController)
    
    } else if(gameController.gamePhase == "playerTwo-setup") {
        renderPlayerScreen(gameController.playerTwo, onNext, gameController)
    } else if(gameController.gamePhase == "battle") {

        renderBattleBoard(gameController)
    }
}

function initializeGame(gameController){

    renderPlayerScreen(gameController.playerOne, onNext, gameController)


}

function selectCell(gameController, player){

    const playerGameBoard = document.querySelector(".gameboard-div")


    playerGameBoard.addEventListener('click', (e)=>{

        const gameBoardCell = e.target.closest(".cell")

        if(!gameBoardCell) return

        if(gameController.selectedShip !=null){
            player.gameboard.placeShip([Number(gameBoardCell.dataset.x), Number(gameBoardCell.dataset.y)], gameController.selectedShip, "horizontal")

            console.log(gameController)

            // gameController.selectedShip = null;

            renderScreen(gameController)
        }      


    })
}





export { initializeGame}

