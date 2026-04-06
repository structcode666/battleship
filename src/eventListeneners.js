import { Player } from "./player";
import { Gamecontroller } from "./gameController";
import { Ship } from "./ship";
import {renderScreen} from "./gameBoardRender"



function addMainEventListeners(gameController, player){

    const mainBoard = document.querySelector(".main-board")
    

    mainBoard.addEventListener('click', (e)=>{

        const shipCell = e.target.closest(".ship-cell")
        //select ship//
        if(shipCell) {

            const shipContainer = shipCell.closest(".ship-container")

            //remove selected ship class from any existing shipcontainers//
            document.querySelectorAll(".ship-container").forEach(container => container.classList.remove("selected"))

            //add ship selected class
            shipContainer.classList.add("selected")

            //add selected ship to gameboard//
            gameController.selectedShip = {ship: new Ship(shipCell.dataset.name, Number(shipCell.dataset.length)), orientation: "horizontal"}

        }

        //select cell//
        const gameBoardCell = e.target.closest(".cell")

        if(gameBoardCell){

            if(gameController.selectedShip !=null){
            gameController.currentPlayer.gameboard.placeShip([Number(gameBoardCell.dataset.x), Number(gameBoardCell.dataset.y)], gameController.selectedShip.ship, gameController.selectedShip.orientation)
            gameController.selectedShip = null;
            gameController.changeCurrentPlayer();
            console.log(gameController.currentPlayer)
            renderScreen(gameController)
        } 

        }

    })


}


function addGlobalEventListeners(gameController){

    document.addEventListener('click', (e)=>{

        const selectedShipContainer = e.target.closest(".ship-container")

        //remove selected ship if not cicked on ship cell//
        if(!selectedShipContainer){

            document.querySelectorAll(".ship-container").forEach(container => container.classList.remove("selected"))
            gameController.selectedShip = null;
            }
        })


        

        window.addEventListener("keydown", (e)=>{

            if(gameController.selectedShip != null){
            
                const selectedShip = document.querySelector(".selected")

                if(selectedShip){

                    if(e.key == "v"){

                    selectedShip.classList.remove("horizontal")

                    selectedShip.classList.add("vertical")

                    gameController.selectedShip.orientation = "vertical"

                    } else if(e.key == "h"){

                        selectedShip.classList.remove("vertical")
                        selectedShip.classList.add("horizontal")

                        gameController.selectedShip.orientation = "horizontal"
                    }


                }

                
            }

            
        })


}

export {addMainEventListeners, addGlobalEventListeners}
