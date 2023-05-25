import { PicesType, PlayerType } from "../constants";
import { getCastlingMoves, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves } from "../refree/rules";
import { Position } from "./Position";

export class Board {
    pieces;
    totalTurns;
    winningTeam;
    constructor(pieces, totalTurns) {
        this.pieces = pieces
        this.totalTurns = totalTurns
    }

    get currentTeam() {
        return this.totalTurns % 2 === 0 ? PlayerType.Opponent : PlayerType.Me;
    }

    calculateAllMoves() {
        for(const pices of this.pieces){
            pices.possibleMoves = this.getPossibleMove(pices, this.pieces)
        } 
        
        for (const king of this.pieces.filter(p => p.isKing)) {
            if(king.possibleMoves === undefined) continue;

            king.possibleMoves = [...king.possibleMoves, ...getCastlingMoves(king, this.pieces)];
        }
        this.checkCurrentTeamMoves();
        // Remove the posibble moves for the team that is not playing
        for (const piece of
            this.pieces.filter(p => p.playerType !== this.currentTeam)) {
            piece.possibleMoves = [];
        }
        if(this.pieces.filter(p=> p.playerType === this.currentTeam)
        .some(p => p.possibleMoves !== undefined && p.possibleMoves.length > 0)
        ) return

        this.winningTeam = this.currentTeam === PlayerType.Me ? PlayerType.Opponent : PlayerType.Me
    }

    checkCurrentTeamMoves() {
        // Loop through all the current team's pieces
        for (const piece of this.pieces.filter(p => p.playerType === this.currentTeam)) {
            if (piece.possibleMoves === undefined) continue;

            // Simulate all the piece moves
            for (const move of piece.possibleMoves) {
                const simulatedBoard = this.clone();

                // Remove the piece at the destination position
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.position.samePosition(move));

                // Get the piece of the cloned board
                const clonedPiece = simulatedBoard.pieces.find(p => p.position.samePosition(piece.position));
                clonedPiece.position = move.clone();

                // Get the king of the cloned board
                const clonedKing = simulatedBoard.pieces.find(p => p.isKing && p.playerType === simulatedBoard.currentTeam);

                // Loop through all enemy pieces, update their possible moves
                // And check if the current team's king will be in danger
                for (const enemy of simulatedBoard.pieces.filter(p => p.playerType !== simulatedBoard.currentTeam)) {
                    enemy.possibleMoves = simulatedBoard.getPossibleMove(enemy, simulatedBoard.pieces);

                    if (enemy.isPawn) {
                        if (enemy.possibleMoves.some(m => m.x !== enemy.position.x
                            && m.samePosition(clonedKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));
                        }
                    } else {
                        if (enemy.possibleMoves.some(m => m.samePosition(clonedKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));
                        }
                    }
                }
            }
        }
    }

    getPossibleMove(pices, currentPices) {
        switch (pices.picesType) {
            case PicesType.Pawn:
                return getPossiblePawnMoves(pices, currentPices)
            case PicesType.Rook:
                return getPossibleRookMoves(pices, currentPices)
            case PicesType.Knight:
                return getPossibleKnightMoves(pices, currentPices)
            case PicesType.Queen:
                return getPossibleQueenMoves(pices, currentPices)
            case PicesType.Bishop:
                return getPossibleBishopMoves(pices, currentPices)
            case PicesType.King:
                return getPossibleKingMoves(pices, currentPices)
            default:
                return [];
        }
    }

    playMove(isValid, enPassentMove, currentPices, position){
        const pawnDirection = (currentPices.playerType === PlayerType.Me) ? 1 : -1
        const destinationPiece = this.pieces.find((p)=> p.position.samePosition(position))
        
        if(currentPices.isKing && destinationPiece.isRook && destinationPiece.playerType === currentPices.playerType ){
            const direction = (destinationPiece.position.x - currentPices.position.x > 0) ? 1 : -1;
            const newKingXPosition = currentPices.position.x + 2 * direction;
            this.pieces = this.pieces.map(piece=>{
                if(piece.position.samePosition(currentPices.position)){
                    piece.position.x = newKingXPosition
                }else if(piece.position.samePosition(destinationPiece.position)){
                    piece.position.x = newKingXPosition - direction
                }
                return piece
            })
            this.calculateAllMoves()
            return true
        }
        if (enPassentMove) {
            this.pieces = this.pieces.reduce((results, pices) => {

                if (pices.position.samePosition(currentPices.position)) {
                    if (pices.isPawn) {
                        pices.enPassent = false
                    }
                    pices.position.x = position.x;
                    pices.position.y = position.y;
                    pices.hasMoved = true
                    results.push(pices)
                }
                else if (!(pices.position.samePosition(new Position(position.x, position.y - pawnDirection)))) {
                    if (pices.isPawn) {
                        pices.enPassent = false
                    }
                    results.push(pices)
                }
                return results
            }, [])
            this.calculateAllMoves()
            // player === PlayerType.Me ? updatePlayer(PlayerType.Opponent) : updatePlayer(PlayerType.Me)
        } else if (isValid) {
            this.pieces = this.pieces.reduce((results, pices) => {

                if (pices.position.samePosition(currentPices.position)) {
                    if (pices.isPawn) {
                        pices.enPassent = Math.abs(currentPices.position.y - position.y) === 2 && pices.isPawn
                    }
                    pices.position.x = position.x;
                    pices.position.y = position.y;
                    pices.hasMoved = true
                    
                    results.push(pices)
                }
                else if (!(pices.position.samePosition(position))) {
                    if (pices.isPawn) {
                        pices.enPassent = false
                    }
                    results.push(pices)
                }
                return results
            }, [])
            this.calculateAllMoves()
            // player === PlayerType.Me ? updatePlayer(PlayerType.Opponent) : updatePlayer(PlayerType.Me)
        } else {
            return false
        }

        return true
    }

    clone(){
        return new Board(this.pieces.map(p => p.clone()), this.totalTurns);
    }
}