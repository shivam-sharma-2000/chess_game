import { PicesType } from "../constants";

export class Pices {
    image;
    position;
    playerType;
    picesType;
    possibleMoves;
    hasMoved;
    constructor(position, picesType, playerType, hasMoved, possibleMoves=[]) {
        this.image = `chess-pices/${playerType}/${picesType}.png`;
        this.position = position
        this.playerType = playerType;
        this.picesType = picesType;
        this.possibleMoves = possibleMoves;
        this.hasMoved = hasMoved    
    }

    clone(){
        return new Pices(this.position.clone(), this.picesType, this.playerType, this.hasMoved, this.possibleMoves.map(m => m.clone()))
    }

    get isPawn(){
        return this.picesType === PicesType.Pawn
    }

    get isRook(){
        return this.picesType === PicesType.Rook
    }

    get isBishop(){
        return this.picesType === PicesType.Bishop
    }

    get isKnight(){
        return this.picesType === PicesType.Knight
    }

    get isQueen(){
        return this.picesType === PicesType.Queen
    }

    get isKing(){
        return this.picesType === PicesType.King
    }
}