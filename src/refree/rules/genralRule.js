export function isSquareOccupied(desiredPosition, boardState) {
    const pices = boardState.find(p => (p.position.samePosition(desiredPosition)))
    return !(pices === undefined);
}
export function isSquareOccupiedByOpponent(desiredPosition, boardState, plType) {
    const pices = boardState.find(p => (p.position.samePosition(desiredPosition) && p.playerType !== plType))
    return !(pices === undefined);
}

export function isSquareEmptyOrOccupiedByOpponent(desiredPosition, boardState, plType) {
    if (!(isSquareOccupied(desiredPosition, boardState)) || isSquareOccupiedByOpponent(desiredPosition, boardState, plType)) {
        return true
    }
    return false
}