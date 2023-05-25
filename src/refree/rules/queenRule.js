import { Position } from "../../models/Position";
import { isSquareOccupied, isSquareEmptyOrOccupiedByOpponent, isSquareOccupiedByOpponent } from "./genralRule";

export function queenMove(initialPosition, desiredPosition, plType, boardState) {
    for (let i = 1; i < 8; i++) {
        let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
        let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;

        let passedPosition = new Position(initialPosition.x + (i * multiplierX), initialPosition.y + (i * multiplierY));
        if (passedPosition.samePosition(desiredPosition)) {
            if (isSquareEmptyOrOccupiedByOpponent(passedPosition, boardState, plType)) {
                return true;
            }
        } else {
            if (isSquareOccupied(passedPosition, boardState)) {
                break;
            }
        }
    }
    return false
}

export function getPossibleQueenMoves(queen, boardstate){
    const possibleMoves = [];

    // Top movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(queen.position.x, queen.position.y + i);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, queen.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(queen.position.x, queen.position.y - i);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, queen.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Left movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(queen.position.x - i, queen.position.y);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, queen.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Right movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(queen.position.x + i, queen.position.y);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, queen.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Upper right movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(queen.position.x + i, queen.position.y + i);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, queen.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom right movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(queen.position.x + i, queen.position.y - i);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, queen.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom left movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(queen.position.x - i, queen.position.y - i);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, queen.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Top left movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(queen.position.x - i, queen.position.y + i);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, queen.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    return possibleMoves;
  }