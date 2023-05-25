import { Position } from "../../models/Position";
import { isSquareOccupied, isSquareEmptyOrOccupiedByOpponent, isSquareOccupiedByOpponent } from "./genralRule";
// export function bishopMove(initialPosition, desiredPosition, plType, boardState) {    
//     for (let i = initialPosition.x + 1, j = initialPosition.y + 1; i < 8, j < 8; i++, j++) {
//         if (desiredPosition.x === i && desiredPosition.y === j) {
//             if (isSquareEmptyOrOccupiedByOpponent(desiredPosition, boardState, plType)) {
//                 return true
//             }
//         } else if (isSquareOccupied(new Position(i, j), boardState)) {
//             break;
//         }
//     }
//     for (let i = initialPosition.x - 1, j = initialPosition.y - 1; i >= 0, j >= 0; i--, j--) {
//         if (desiredPosition.x === i && desiredPosition.y === j) {
//             if (isSquareEmptyOrOccupiedByOpponent(desiredPosition, boardState, plType)) {
//                 return true
//             }
//         } else if (isSquareOccupied(new Position(i, j), boardState)) {
//             break;
//         }
//     }
//     for (let i = initialPosition.x - 1, j = initialPosition.y + 1; i >= 0, j < 8; i--, j++) {
//         if (desiredPosition.x === i && desiredPosition.y === j) {
//             if (isSquareEmptyOrOccupiedByOpponent(desiredPosition, boardState, plType)) {
//                 return true
//             }
//         } else if (isSquareOccupied(new Position(i, j), boardState)) {
//             break;
//         }
//     }
//     for (let i = initialPosition.x + 1, j = initialPosition.y - 1; i < 8, j >= 0; i++, j--) {
//         if (desiredPosition.x === i && desiredPosition.y === j) {
//             if (isSquareEmptyOrOccupiedByOpponent(desiredPosition, boardState, plType)) {
//                 return true
//             }
//         } else if (isSquareOccupied(new Position(i, j), boardState)) {
//             break;
//         }
//     }
//     return false
// }

export function bishopMove (initialPosition, desiredPosition, team, boardState) {
  for(let i = 1; i < 8; i++) {
    //Up right movement
    if(desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
      let passedPosition = new Position(initialPosition.x + i, initialPosition.y + i);
      //Check if the tile is the destination tile
      if(passedPosition.samePosition(desiredPosition)) {
        //Dealing with destination tile
        if(isSquareEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        //Dealing with passing tile
        if(isSquareOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
      
    //Bottom right movement
    if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
      let passedPosition = new Position(initialPosition.x + i, initialPosition.y - i);
      //Check if the tile is the destination tile
      if(passedPosition.samePosition(desiredPosition)) {
        //Dealing with destination tile
        if(isSquareEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if(isSquareOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }

    //Bottom left movement
    if(desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
      let passedPosition = new Position(initialPosition.x - i, initialPosition.y - i);
      //Check if the tile is the destination tile
      if(passedPosition.samePosition(desiredPosition)) {
        //Dealing with destination tile
        if(isSquareEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true;
        }
      } else {
        if(isSquareOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }

    //Top left movement
    if(desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
      let passedPosition = new Position(initialPosition.x - i, initialPosition.y+i);
      //Check if the tile is the destination tile
      if(passedPosition.samePosition(desiredPosition)) {
        //Dealing with destination tile
        if(isSquareEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
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

export function getPossibleBishopMoves(bishop, boardstate){
    const possibleMoves = [];

    // Upper right movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(bishop.position.x + i, bishop.position.y + i);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, bishop.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom right movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(bishop.position.x + i, bishop.position.y - i);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, bishop.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom left movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(bishop.position.x - i, bishop.position.y - i);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, bishop.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Top left movement
    for(let i = 1; i < 8; i++) {
      const destination = new Position(bishop.position.x - i, bishop.position.y + i);

      if(!isSquareOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(isSquareOccupiedByOpponent(destination, boardstate, bishop.playerType)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    return possibleMoves;
  }