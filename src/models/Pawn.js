import { PicesType } from "../constants";
import { Pices } from "./Piece";

export class Pawn extends Pices{
    enPassent;
    constructor(position, playerType, hasMoved, enPassent = false,  possibleMoves = []) {
        super(position,PicesType.Pawn,playerType, hasMoved, possibleMoves)
        this.enPassent = enPassent
    }

    clone(){
        return new Pawn(this.position.clone(), this.playerType, this.hasMoved, this.enPassent, this.possibleMoves.map(m => m.clone()))
    }
}