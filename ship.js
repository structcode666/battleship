class Ship{

    constructor(type, length){

        this.type = type
        this.length  = length
        this.hits = 0
    }

    hit(){

        if(this.hits < this.length) ++this.hits
    }

    isSunk(){

        if(this.hits == this.length) return true
        else return false

    }

}

export {Ship}