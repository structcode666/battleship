import { Ship } from "./ship"
import { Gamecontroller } from "./gameController"

function renderShips(){

    const ships = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Cruiser", 3), new Ship("Submarine", 3), new Ship("Destroyer", 2)]

    let shipsDiv = document.createElement("div")
    shipsDiv.classList.add("ships-container")

    ships.forEach(ship=>{

        let shipDiv = document.createElement("div")
        shipDiv.classList.add(`ship-container`)


        for(let i=0 ; i<ship.length; i++){



            let shipCell = document.createElement("div")

            shipCell.classList.add(`ship-cell`)
            shipCell.dataset.name = `${ship.type}`
            shipCell.dataset.length = `${ship.length}`
            
            shipCell.dataset.i = i;
            shipDiv.appendChild(shipCell)
        }

        shipsDiv.appendChild(shipDiv)

    })

    
    return shipsDiv


}

function selectShip(gameController){

    const cells = document.querySelectorAll(".ship-cell")

    cells.forEach(cell=>{

        cell.addEventListener('click', (e)=>{

            e.stopPropagation()

            //select ship cell clicked and closest ship container" 

            const shipCell = e.target;

            const shipContainer = shipCell.closest(".ship-container")

            //remove selected ship class from any existing shipcontainers//
            document.querySelectorAll(".ship-container").forEach(container => container.classList.remove("selected"))

            //add ship selected class
            shipContainer.classList.add("selected")

            //add style//

            //add selected ship to gameboard//
            gameController.selectedShip = new Ship(shipCell.dataset.name, Number(shipCell.dataset.length))
            console.log(gameController)

        })
    
    })

    document.addEventListener('click', (e)=>{

    const selectedShipContainer = e.target.closest(".ship-container")
    

    if(!selectedShipContainer){

        document.querySelectorAll(".ship-container").forEach(container => container.classList.remove("selected"))
        gameController.selectedShip = null;
        console.log(gameController)
    }
    })



}


export {renderShips, selectShip}