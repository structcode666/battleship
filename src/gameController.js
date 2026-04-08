import {Player} from "./player"
import { Gameboard } from "./gameBoard"

class Gamecontroller{

    constructor(playerOne, playerTwo){

        this.playerOne = playerOne
        this.playerTwo = playerTwo
        this.currentPlayer = this.playerOne
        this.gameWinner = null
        this.gamePhase = "playerOne-setup"
        this.selectedShip = null
    }


    checkWinner(){

        if(this.playerOne.gameboard.allShipsSunk()) return this.gameWinner =this.playerTwo
        else if(this.playerTwo.gameboard.allShipsSunk()) return this.gameWinner = this.playerOne
        else return
    }

    playOneRound(attackCoordinates){

        if(this.gameWinner == null){

            let result

            if(this.currentPlayer == this.playerOne){

                result = this.playerOne.attackPlayer(this.playerTwo, attackCoordinates)

                if(result instanceof Error) return result

                this.checkWinner()
                if(!this.gameWinner) this.currentPlayer = this.playerTwo

                return result

                
                
            } else if(this.currentPlayer == this.playerTwo){

                result = this.playerTwo.attackPlayer(this.playerOne, attackCoordinates)
                if(result instanceof Error) return result
                this.checkWinner()
                if(!this.gameWinner)this.currentPlayer = this.playerOne

                return result
                
                
            }
        }
    }

    changeCurrentPlayer(){

        if(this.playerOne.gameboard.ships.length == 5){

            this.currentPlayer = this.playerTwo
        }
        if(this.playerOne.gameboard.ships.length == 5 &&this.playerTwo.gameboard.ships.length == 5){

            this.currentPlayer = this.playerOne
        }
    }

}


export {Gamecontroller} 