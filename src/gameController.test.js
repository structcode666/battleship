import { Gamecontroller } from "./gameController"
import {Player} from "./player"
import { Ship } from "./ship"


test("check Winner Method", ()=>{

    
    let playerOne = new Player("Tasi")
    let playerTwo = new Player("Player Two")
    let testGameController = new Gamecontroller(playerOne, playerTwo)
    let shipOptions = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Cruiser", 3), new Ship("Submarine", 3), new Ship("Destroyer", 2)]
    const [carrier, battleship, cruiser, submarine, destroyer] = shipOptions

    playerOne.gameboard.placeShip([5,5], carrier, "horizontal")
    playerOne.gameboard.placeShip([1,2], battleship, "horizontal")
    playerOne.gameboard.placeShip([2,6], submarine, "vertical")
    
    playerTwo.gameboard.placeShip([3,1], destroyer, "vertical")

    playerOne.attackPlayer(playerTwo, [3,1])
    playerOne.attackPlayer(playerTwo, [3,2])
    testGameController.checkWinner()

    expect(testGameController.gameWinner).toBe(playerOne)

})


test("check Attack Player method", ()=>{

    
    let playerOne = new Player("Tasi")
    let playerTwo = new Player("Player Two")
    let testGameController = new Gamecontroller(playerOne, playerTwo)
    let shipOptions = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Cruiser", 3), new Ship("Submarine", 3), new Ship("Destroyer", 2)]
    const [carrier, battleship, cruiser, submarine, destroyer] = shipOptions

    playerOne.gameboard.placeShip([5,5], carrier, "horizontal")
    playerOne.gameboard.placeShip([1,2], battleship, "horizontal")
    playerOne.gameboard.placeShip([2,6], submarine, "vertical")
    
    playerTwo.gameboard.placeShip([3,1], destroyer, "vertical")

    testGameController.playOneRound([3,1])
    testGameController.playOneRound([5,5])
    testGameController.playOneRound([3,2])
    

    expect(testGameController.gameWinner).toBe(playerOne)

})