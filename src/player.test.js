import{Player} from "./player"
import { Gameboard } from "./gameBoard"
import { Ship } from "./ship"


test("attack player method", ()=>{


    let playerOne = new Player("Tasi")
    let playerTwo = new Player("Player Two")
    let playerThree = new Player("Computer")

    playerThree.isComputer = true;

    let shipOptions = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Cruiser", 3), new Ship("Submarine", 3), new Ship("Destroyer", 2)]

    let testGameBoard = new Gameboard () 
    
    const [carrier, battleship, cruiser, submarine, destroyer] = shipOptions

    playerOne.gameboard.placeShip([5,5], carrier, "horizontal")
    playerOne.gameboard.placeShip([1,2], battleship, "horizontal")
    playerOne.gameboard.placeShip([2,6], submarine, "vertical")


    playerTwo.gameboard.placeShip([1,1], carrier, "horizontal")
    
    playerTwo.gameboard.placeShip([3,1], destroyer, "vertical")

    expect(playerOne.attackPlayer(playerTwo, [1,7])).toBe("miss")

    // expect(playerThree.attackPlayer(playerOne)).toBe("hit")

})

