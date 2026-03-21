import { Ship } from "./ship";


test("checks initial ship state", ()=>{

    let testShip = new Ship ("testShip", 2)
    
    expect((testShip.hits)).toBe(0)
    expect((testShip.length)).toBe(2)
    expect((testShip.isSunk())).toBe(false)

})


test("checks ship methods", ()=>{

    let testShip = new Ship ("testShip", 2)

    testShip.hit()
    
    expect((testShip.hits)).toBe(1)
    expect((testShip.isSunk())).toBe(false)


    testShip.hit()
    expect((testShip.hits)).toBe(2)
    expect((testShip.isSunk())).toBe(true)

    testShip.hit()
    expect((testShip.hits)).toBe(2)
    expect((testShip.isSunk())).toBe(true)



})