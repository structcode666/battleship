import { Gameboard } from "./gameBoard"

class Player{

    constructor(name){

        this.name = name
        this.gameboard = new Gameboard()
        this.isComputer = false
        this.computerAttackedCoordinates = []
    }



    #checkComputerAttackCoordinates(inputCoordinates){

        if(this.computerAttackedCoordinates.length !=0){

            return this.computerAttackedCoordinates.some(coordinate => 

                coordinate[0] == inputCoordinates[0] && coordinate[1] == inputCoordinates[1]
            )
        } else return false
    }

    #generateAttackCoordinates(){

        let x = Math.floor(Math.random()*10);
        let y = Math.floor(Math.random()*10);

        if(!this.#checkComputerAttackCoordinates([x,y])){

            this.computerAttackedCoordinates.push([x,y])

            return [x,y]
        } 
        else return this.#generateAttackCoordinates()
        

    }



    attackPlayer(playerTwo, attackCoordinates = null){

        if(this.isComputer){

            return playerTwo.gameboard.recieveAttack(this.#generateAttackCoordinates())
        } else  return playerTwo.gameboard.recieveAttack(attackCoordinates)
    }
}

export {Player}