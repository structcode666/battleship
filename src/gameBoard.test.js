import {Gameboard} from "./gameBoard"
import { Ship } from "./ship"



test.skip("checks validCoordinate array helper method", ()=>{

    let testGameBoard = new Gameboard ()

    let testArrayOne = [[1,2], [3,6], [5,5]]
    let testArrayTwo = [[2,1], [3,3],[4,4],[-1,5]]
    let testArrayThree = []
    
    expect(testGameBoard.validCoordinateArray(testArrayOne)).toBe(true)
    expect(testGameBoard.validCoordinateArray(testArrayTwo)).toBe(false)
    expect(testGameBoard.validCoordinateArray(testArrayThree)).toBe(false)
    

})

test.skip("checks matchCoordinatesToArray helper method", ()=>{

    let testGameBoard = new Gameboard ()
    let attackCoordinates = [3,6]
    let attackCoordinatesTwo = [-5,-5]

    let testArrayOne = [[1,2], [3,6], [5,5]]
    let testArrayTwo = [[2,1], [3,3],[4,4],[-1,5]]
    let testArrayThree = []
    
    expect(testGameBoard.matchCoordinatesToArray(attackCoordinates, testArrayOne)).toBe(true)
    expect(testGameBoard.matchCoordinatesToArray(attackCoordinates, testArrayTwo)).toBe(false)
    expect(testGameBoard.matchCoordinatesToArray(attackCoordinates, testArrayThree)).toBe(false)
    expect(testGameBoard.matchCoordinatesToArray(attackCoordinatesTwo, testArrayTwo)).toBe(false)
    

})

test("checks placeShips method", ()=>{

    let shipOptions = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Cruiser", 3), new Ship("Submarine", 3), new Ship("Destroyer", 2)]

    let testGameBoard = new Gameboard () 
    
    const [carrier, battleship, cruiser, submarine, destroyer] = shipOptions

    testGameBoard.placeShip([2,5], carrier, "horizontal");
    

    expect(testGameBoard.ships).toEqual( [{ship:  carrier, shipCoordinates: [[2,5],[3,5],[4,5],[5,5],[6,5]]}]);


    testGameBoard.placeShip([7,1], battleship, "vertical");
    expect(testGameBoard.ships).toEqual( [{ship: carrier, shipCoordinates: [[2,5],[3,5],[4,5],[5,5],[6,5]]}, {ship: battleship, shipCoordinates: [[7,1],[7,2],[7,3],[7,4]]}])


    expect(testGameBoard.placeShip([8,8], cruiser, "horizontal")).toEqual(Error("Place Ship Again!"))
    expect(testGameBoard.placeShip([-1,2], destroyer, "horizontal")).toEqual(Error("Enter Valid Cooridnates"))
    expect(testGameBoard.placeShip([5,5], carrier, "horizontal")).toEqual(Error("Ship has already been used!"))
    expect(testGameBoard.placeShip([2,5], submarine, "horizontal")).toEqual(Error("Place Ship Again!"))


})


test("checks recieveAttack method", ()=>{

    let shipOptions = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Cruiser", 3), new Ship("Submarine", 3), new Ship("Destroyer", 2)]

    let testGameBoard = new Gameboard () 
    
    const [carrier, battleship, cruiser, submarine, destroyer] = shipOptions

    testGameBoard.placeShip([2,5], carrier, "horizontal");
    testGameBoard.placeShip([1,3], battleship, "vertical");
    testGameBoard.placeShip([3,6], cruiser, "horizontal");


    expect(testGameBoard.recieveAttack([-1,-3])).toEqual(Error("Enter Valid Coordinates!"))

    expect(testGameBoard.recieveAttack([3,5])).toEqual("hit")

    expect(testGameBoard.attackedCoordinates).toEqual([[3,5]])

    testGameBoard.recieveAttack([1,5])

    expect(testGameBoard.attackedCoordinates).toEqual([[3,5], [1,5]])

    expect(testGameBoard.recieveAttack([8,8])).toEqual("miss")

    expect(testGameBoard.missedCoordinates).toEqual([[8,8]])

    expect(testGameBoard.recieveAttack([3,5])).toEqual(Error("Coordinates have been used!"))

    


})


test("checks allShips Sunk Method", ()=>{

    let shipOptions = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Cruiser", 3), new Ship("Submarine", 3), new Ship("Destroyer", 2)]

    let testGameBoard = new Gameboard () 
    
    const [carrier, battleship, cruiser, submarine, destroyer] = shipOptions

    testGameBoard.placeShip([2,2], destroyer, "horizontal")

    testGameBoard.recieveAttack([2,2])
    testGameBoard.recieveAttack([3,2])

    expect(testGameBoard.allShipsSunk()).toEqual(true)
})

test("checks resetGameBoard method", ()=>{

    let shipOptions = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Cruiser", 3), new Ship("Submarine", 3), new Ship("Destroyer", 2)]

    let testGameBoard = new Gameboard () 
    
    const [carrier, battleship, cruiser, submarine, destroyer] = shipOptions

    testGameBoard.placeShip([2,2], destroyer, "horizontal")

    testGameBoard.placeShip([1,1], carrier, "horizontal")
    testGameBoard.placeShip([5,5], submarine, "vertical")

    testGameBoard.recieveAttack([2,2])
    testGameBoard.recieveAttack([3,2])

    expect((testGameBoard.ships)).toEqual([{ship: destroyer, shipCoordinates: [[2,2],[3,2]]}, {ship: carrier, shipCoordinates: [[1,1],[2,1],[3,1],[4,1], [5,1]]}, {ship: submarine, shipCoordinates: [[5,5],[5,6],[5,7]]}])

    expect(testGameBoard.attackedCoordinates).toEqual([[2,2],[3,2]])


    testGameBoard.resetGameBoard();

    expect(testGameBoard.ships).toEqual([])
    expect(testGameBoard.attackedCoordinates).toEqual([])

})

test("checks hasShips method", ()=>{

    let shipOptions = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Cruiser", 3), new Ship("Submarine", 3), new Ship("Destroyer", 2)]

    let testGameBoard = new Gameboard () 
    
    const [carrier, battleship, cruiser, submarine, destroyer] = shipOptions

    testGameBoard.placeShip([2,2], destroyer, "horizontal")

    testGameBoard.placeShip([1,1], carrier, "horizontal")
    testGameBoard.placeShip([5,5], submarine, "vertical")

    expect((testGameBoard.ships)).toEqual([{ship: destroyer, shipCoordinates: [[2,2],[3,2]]}, {ship: carrier, shipCoordinates: [[1,1],[2,1],[3,1],[4,1], [5,1]]}, {ship: submarine, shipCoordinates: [[5,5],[5,6],[5,7]]}])

    expect(testGameBoard.hasShipAt([3,2])).toEqual(true)
    expect(testGameBoard.hasShipAt([4,5])).toEqual(false)





})

