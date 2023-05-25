import { PlayerType } from "../../constants";
import { Position } from "../../models/Position";
import { isSquareOccupied, isSquareOccupiedByOpponent } from "./genralRule";

export function pawnMove(initialPostion, desiredPosition, plType, boardState) {
    const specialRow = (plType === PlayerType.Me) ? 1 : 6
    const pawnDirection = (plType === PlayerType.Me) ? 1 : -1
    // Movement logic
    if (initialPostion.x === desiredPosition.x && initialPostion.y === specialRow && (desiredPosition.y - initialPostion.y) === 2 * pawnDirection) {
        if (!isSquareOccupied(desiredPosition, boardState) && !isSquareOccupied(desiredPosition - pawnDirection, boardState)) {
            return true;
        }
    } else if (initialPostion.x === desiredPosition.x && (desiredPosition.y - initialPostion.y) === pawnDirection) {
        if (!(isSquareOccupied(desiredPosition, boardState))) {
            return true;
        }
    }

    //Attack Login
    if ((desiredPosition.y - initialPostion.y) === pawnDirection && ((desiredPosition.x - initialPostion.x) === -1 || (desiredPosition.x - initialPostion.x) === 1)) {
        if (isSquareOccupiedByOpponent(desiredPosition, boardState, plType)) {
            return true
        }
    }
    return false
}

export function getPossiblePawnMoves(pawn, boardState) {
    const possibleMoves = [];
    const pawnDirection = (pawn.playerType === PlayerType.Me) ? 1 : -1
    const specialRow = (pawn.playerType === PlayerType.Me) ? 1 : 6
    const normalMove = new Position(pawn.position.x, pawn.position.y + pawnDirection)
    const spacialMove = new Position(pawn.position.x, pawn.position.y + 2 * pawnDirection)
    const topRightMove = new Position(pawn.position.x + 1, pawn.position.y + pawnDirection)
    const topLeftMove = new Position(pawn.position.x - 1, pawn.position.y + pawnDirection)
    const leftPosition = new Position(pawn.position.x - 1, pawn.position.y);
    const rightPosition = new Position(pawn.position.x + 1, pawn.position.y);
    if (!isSquareOccupied(normalMove, boardState)) {
        possibleMoves.push(normalMove)
        if (pawn.position.y === specialRow) {
            if (!isSquareOccupied(normalMove, boardState) && !isSquareOccupied(spacialMove, boardState)) {         
                possibleMoves.push(spacialMove)
            }
        }
    }
    // Attack hint
    if (isSquareOccupiedByOpponent(topRightMove, boardState, pawn.playerType)) {
        possibleMoves.push(topRightMove)
    } else if (!isSquareOccupied(topRightMove, boardState)) {
        const rightPiece = boardState.find(p => p.position.samePosition( rightPosition));
        if (rightPiece != null && rightPiece.enPassent) {
            possibleMoves.push(topRightMove);
        }
    }
    if (isSquareOccupiedByOpponent(topLeftMove, boardState, pawn.playerType)) {
        possibleMoves.push(topLeftMove)
    } else if (!isSquareOccupied(topLeftMove, boardState)) {
        const leftPiece = boardState.find(p => p.position.samePosition(leftPosition));
        if (leftPiece != null && leftPiece.enPassent) {
            possibleMoves.push(topLeftMove);
        }
    }
    return possibleMoves;
}
