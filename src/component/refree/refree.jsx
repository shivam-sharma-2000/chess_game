import { useEffect, useRef, useState } from "react";
import Chessboard from "../chessboard/chessboard";
import { bishopMove, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves, kingMove, knightMove, pawnMove, queenMove, rookMove } from "../../refree/rules";
import { PicesType, PlayerType, initialBoard } from "../../constants";
import { Pices } from "../../models/Piece";

export function Refree() {
    const [board, setBoard] = useState(initialBoard.clone())
    const promotionModelRef = useRef(null)
    const checkmateModelRef = useRef(null)
    const [promotionPawn, setPromotionPawn] = useState(null)
    const [player, updatePlayer] = useState(PlayerType.Me)

    useEffect(() => board.calculateAllMoves(), [])


    function playMove(currentPices, position) {
        if (currentPices.possibleMoves === undefined) return false;

        if (currentPices.playerType === PlayerType.Me
            && board.totalTurns % 2 !== 1) return false;
        if (currentPices.playerType === PlayerType.Opponent
            && board.totalTurns % 2 !== 0) return false;

        let playedMoveIsValid = false

        const isValid = currentPices.possibleMoves.some(m => m.samePosition(position));

        if (!isValid) return false;

        updatePlayer(player === PlayerType.Me ? PlayerType.Opponent : PlayerType.Me)

        const enPassentMove = isEnPassentMove(currentPices.clone(), position, currentPices.picesType, currentPices.playerType)

        setBoard((priviousBoard) => {
            const clonedBoard = board.clone();
            clonedBoard.totalTurns += 1;
            playedMoveIsValid = clonedBoard.playMove(isValid, enPassentMove, currentPices, position)

            if (clonedBoard.winningTeam !== undefined) {
                checkmateModelRef.current.classList.remove("hidden")
            }
            return clonedBoard;
        })
        const promostionRow = currentPices.playerType === PlayerType.Me ? 7 : 0
        if (position.y === promostionRow && currentPices.isPawn) {
            setPromotionPawn((priviousPromostionPawn) => {
                const clonePlayedPiece = currentPices.clone()
                clonePlayedPiece.position = position.clone()
                return clonePlayedPiece
            })
            promotionModelRef.current.classList.remove("hidden")
        }
        return playedMoveIsValid
    }
    function isValidMove(initialPostion, desiredPosition, piType, plType, currentPlayer) {

        let validMove = false;
        switch (piType) {
            case PicesType.Pawn:
                validMove = pawnMove(initialPostion, desiredPosition, plType, board.pieces)
                break;
            case PicesType.Knight:
                validMove = knightMove(initialPostion, desiredPosition, plType, board.pieces)
                break;
            case PicesType.Bishop:
                validMove = bishopMove(initialPostion, desiredPosition, plType, board.pieces)
                break;
            case PicesType.Rook:
                validMove = rookMove(initialPostion, desiredPosition, plType, board.pieces)
                break;
            case PicesType.Queen:
                validMove = queenMove(initialPostion, desiredPosition, plType, board.pieces)
                break
            case PicesType.King:
                validMove = kingMove(initialPostion, desiredPosition, plType, board.pieces)
        }
        return validMove;

    }

    function getPossibleMove(pices, currentPices) {
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

    function isEnPassentMove(initialPostion, desiredPosition, piType, plType) {
        const pawnDirection = (plType === PlayerType.Me) ? 1 : -1
        if (piType === PicesType.Pawn) {
            if ((desiredPosition.y - initialPostion.y) === pawnDirection && ((desiredPosition.x - initialPostion.x) === -1 || (desiredPosition.x - initialPostion.x) === 1)) {
                const piece = board.pieces.find(p => p.position.x === desiredPosition.x && p.position.y == desiredPosition.y - pawnDirection && p.enPassent)
                if (piece) {
                    return true;
                }
            }
        }
        return false;
    }

    function promotPawn(pieceType) {
        if (promotionPawn === undefined) {
            return;
        }

        setBoard((priviousBoard) => {
            let updatedArray = board.clone()
            updatedArray.pieces = updatedArray.pieces.reduce((results, piece) => {
                if (piece.position.samePosition(promotionPawn.position)) {
                    results.push(new Pices(piece.position.clone(), pieceType,
                        piece.playerType, true));
                } else {
                    results.push(piece);
                }
                return results;
            }, [])
            updatedArray.calculateAllMoves()
            return updatedArray
        })
        promotionModelRef.current.classList.add("hidden")

    }

    function promotionTeamType() {
        return (promotionPawn?.playerType === PlayerType.Me) ? "white" : "black";
    }

    function resetBoard() {
        updatePlayer(PlayerType.Me)
            checkmateModelRef.current.classList.add("hidden")
        setBoard(initialBoard.clone())
    }

    return (
        <>
            <p style={{ color: "white", textAlign: "center", fontSize: "20px" }}>Player Turn: {player}</p>
            <div className="modal hidden" ref={promotionModelRef}>
                <div className="modal-body">
                    <img onClick={() => promotPawn(PicesType.Rook)} src={`chess-pices/${promotionTeamType()}/rook.png`} />
                    <img onClick={() => promotPawn(PicesType.Knight)} src={`chess-pices/${promotionTeamType()}/knight.png`} />
                    <img onClick={() => promotPawn(PicesType.Bishop)} src={`chess-pices/${promotionTeamType()}/bishop.png`} />
                    <img onClick={() => promotPawn(PicesType.Queen)} src={`chess-pices/${promotionTeamType()}/queen.png`} />
                </div>
            </div>
            <div className="modal hidden" ref={checkmateModelRef}>
                <div className="modal-body">
                    <div className="checkmate-body">
                        <span>The Winning team is {board.winningTeam}</span>
                        <button onClick={() => resetBoard()}>play again</button>
                    </div>
                </div>
            </div>
            <Chessboard playMove={playMove} pieces={board.pieces} />
        </>
    )
}