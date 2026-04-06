import { Ship } from "./ship"



class Gameboard{

    constructor(){

        this.ships =[]
        this.attackedCoordinates = []
        this.missedCoordinates = []
    }

    #validCoordinates(coordinate){

        if(coordinate[0]<0 || coordinate[0]>9 || coordinate[1]<0 || coordinate[1]>9) return false;
        else return true


    }
    
    #validCoordinateArray(coordinateArray){

       if(coordinateArray == null || coordinateArray.length == 0) return false
       else {
        return  !(coordinateArray.some(coordinate =>

            coordinate[0]<0 || coordinate[0]>9 || coordinate[1]<0 || coordinate[1]>9

        ))
       }
       


    }

    #matchCoordinatesToArray(attackCoordinates, coordinateArray){

        for(let i= 0; i<coordinateArray.length; i++){

        if(coordinateArray[i][0] == attackCoordinates[0] && coordinateArray[i][1] == attackCoordinates[1]) return true
        }
        return false
    }

    #placedShipCoordinates(){

        let placedShipCoordinates = []

        this.ships.forEach(ship=>
            placedShipCoordinates.push(ship.shipCoordinates))

            return placedShipCoordinates.flat()
    }

    #overlappingCoordinates(coordinateArray){

        let existingCoordinates = this.#placedShipCoordinates()

        for(let i =0; i < existingCoordinates.length; i++){

            for(let j=0; j< coordinateArray.length; j++){

                if(coordinateArray[j][0] == existingCoordinates[i][0] && coordinateArray[j][1] == existingCoordinates[i][1]) return true
            }
            
        }
        return false
    }

    #usedShip(currentShip){
    
       return this.ships.some(ship =>
            
            currentShip.type == ship.ship.type
        )

    }

    placeShip(startCoordinate, currentShip, direction){

        if(!this.#validCoordinates(startCoordinate)) return new Error("Enter Valid Cooridnates")
        
        if( direction != "horizontal" && direction != "vertical") return new Error("enter valid direction")
        
        if (!(currentShip instanceof Ship)) return new Error ("enter valid ship")
        
        if(this.#usedShip(currentShip)) return new Error("Ship has already been used!")
        
        let coordinateArray = []

        for(let i =0;  i < currentShip.length; i++){

            if(direction == "horizontal"){

                coordinateArray.push([startCoordinate[0]+i, startCoordinate[1]])
            }

            if(direction == "vertical"){

                coordinateArray.push([startCoordinate[0], startCoordinate[1]+i])
            }
        }

        if(this.#validCoordinateArray(coordinateArray)&& !this.#overlappingCoordinates(coordinateArray)){

                this.ships.push({ship : currentShip, shipCoordinates : coordinateArray})
            } else{

                return new Error ("Place Ship Again!")
            }
        
    }

    recieveAttack(attackCoordinates){

        if(!this.#validCoordinates(attackCoordinates)) return new Error("Enter Valid Coordinates!")
        
        if (this.#matchCoordinatesToArray(attackCoordinates, this.attackedCoordinates) ||this.#matchCoordinatesToArray(attackCoordinates, this.missedCoordinates)) return new Error ("Coordinates have been used!")

        const attackedShip = this.ships.find(ship => this.#matchCoordinatesToArray(attackCoordinates, ship.shipCoordinates))


        if(attackedShip != undefined && !attackedShip.ship.isSunk()){

            attackedShip.ship.hit()
            this.attackedCoordinates.push(attackCoordinates)
            return "hit"
        } else{

            this.missedCoordinates.push(attackCoordinates)

            return "miss"
        }

        
    }

    allShipsSunk(){

        if(this.ships.length !=0){

            return this.ships.every(ship => ship.ship.isSunk())
        } else return false

        
    }

    resetGameBoard(){

        this.ships = [];
        this.attackedCoordinates = []
        this.missedCoordinates = []


    }

    allShipsPlaced(){

        if(this.ships.length == 5) return true
        else return false
    }

    hasShipAt([x,y]){

        return this.ships.some(ship=>

            this.#matchCoordinatesToArray([x, y], ship.shipCoordinates)


        )
    }

    hasShip(currentShip){

        return this.#usedShip(currentShip)
    }

}

export {Gameboard}