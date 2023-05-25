import { PlayerType } from "../../constants";
import { Position } from "../../models/Position";
import {isSquareEmptyOrOccupiedByOpponent } from "./genralRule";
export function knightMove(initialPostion, desiredPosition, plType, boardState) {
    // current position   y row  =3 x col =4 
    const pawnDirection = (plType === PlayerType.Me) ? 1 : -1
    if ((desiredPosition.y - initialPostion.y === - 2 * pawnDirection || desiredPosition.y - initialPostion.y === 2 * pawnDirection) &&
        (desiredPosition.x - initialPostion.x === 1 || desiredPosition.x - initialPostion.x === -1)) {
        if (isSquareEmptyOrOccupiedByOpponent(desiredPosition, boardState, plType)) {
            return true
        }
    } else if ((desiredPosition.x - initialPostion.x === - 2 * pawnDirection || desiredPosition.x - initialPostion.x === 2 * pawnDirection) &&
        (desiredPosition.y - initialPostion.y === 1 || desiredPosition.y - initialPostion.y === -1)) {
        if (isSquareEmptyOrOccupiedByOpponent(desiredPosition, boardState, plType)) {
            return true
        }
    }
    return false
}
export function getPossibleKnightMoves(knight, boardstate){
    const possibleMoves = [];
  
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        const verticalMove = new Position(knight.position.x + j, knight.position.y + i * 2);
        const horizontalMove = new Position(knight.position.x + i * 2, knight.position.y + j);
  
        if(isSquareEmptyOrOccupiedByOpponent(verticalMove, boardstate, knight.playerType)) {
          possibleMoves.push(verticalMove);
        }
  
        if(isSquareEmptyOrOccupiedByOpponent(horizontalMove, boardstate, knight.playerType)) {
          possibleMoves.push(horizontalMove);
        }
      }
    }
  
    return possibleMoves;
  }