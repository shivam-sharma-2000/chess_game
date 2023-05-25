import { Position } from "../../models/Position";
import { isSquareOccupied, isSquareEmptyOrOccupiedByOpponent, isSquareOccupiedByOpponent } from "./genralRule";
export function rookMove(initialPosition, desiredPosition, plType, boardState) {
    if(initialPosition.x === desiredPosition.x) {
        for(let i = 1; i < 8; i++) {
          let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1;
  
          let passedPosition = new Position(initialPosition.x, initialPosition.y + (i * multiplier));
          if(passedPosition.samePosition(desiredPosition)) {
            if(isSquareEmptyOrOccupiedByOpponent(passedPosition, boardState, plType)) {
              return true;
            }
          } else {
            if(isSquareOccupied(passedPosition, boardState)) {
              break;
            }
          }
        }
      }
  
      if(initialPosition.y === desiredPosition.y) {
        for(let i = 1; i < 8; i++) {
          let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1;
  
          let passedPosition = new Position(initialPosition.x + (i * multiplier), initialPosition.y);
          if(passedPosition.samePosition(desiredPosition)) {
            if(isSquareEmptyOrOccupiedByOpponent(passedPosition, boardState, plType)) {
              return true;
            }
          } else {
            if(isSquareOccupied(passedPosition, boardState)) {
              break;
            }
          }
        }
      }

    return false
}

export function getPossibleRookMoves (rook,boardState){
  const possibleMoves = [];

  // Top movement
  for(let i = 1; i < 8; i++) {
    if(rook.position.y + i>7) break
    const destination = new Position(rook.position.x, rook.position.y + i);
      if(!isSquareOccupied(destination, boardState)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardState, rook.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
  }

  // Bottom movement
  for(let i = 1; i < 8; i++) {
    if(rook.position.y - i < 0) break
    const destination = new Position(rook.position.x, rook.position.y - i);
    if(!isSquareOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if(isSquareOccupiedByOpponent (destination, boardState, rook.playerType)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement
  for(let i = 1; i < 8; i++) {
    if(rook.position.x - i < 0) break
    const destination = new Position(rook.position.x - i, rook.position.y);
    if(7>=destination.x>=0 && 7>=destination.y>=0){
    if(!isSquareOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if(isSquareOccupiedByOpponent(destination, boardState, rook.playerType)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }}
  }

  // Right movement
  for(let i = 1; i < 8; i++) {
    if(rook.position.x + i>7) break
    const destination = new Position(rook.position.x + i, rook.position.y);
    if(!isSquareOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if(isSquareOccupiedByOpponent(destination, boardState, rook.playerType)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }}
  return possibleMoves;
}