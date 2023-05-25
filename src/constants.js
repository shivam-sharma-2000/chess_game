import { Position } from "./models/Position";
import { Pices } from "./models/Piece";
import { Pawn } from "./models/Pawn";
import { Board } from "./models/Board";

export const BOARDSIZE = 560;
export const TILESIZE = 70;
export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]
export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]

export const PicesType = {
    Pawn: "pawn",
    Rook: "rook",
    Bishop: "bishop",
    Knight: "knight",
    Queen: "queen",
    King: "king"
}

export const PlayerType = {
    Opponent: "black",
    Me: "white"
}

const initialPiceses = []
for (let i = 0; i < 8; i++) {
    initialPiceses.push(new Pawn(new Position(i, 6),PlayerType.Opponent, false))
}
for (let i = 0; i < 8; i++) {
    initialPiceses.push(new Pawn(new Position(i, 1), PlayerType.Me, false))
}
initialPiceses.push(new Pices(new Position(0, 7), PicesType.Rook, PlayerType.Opponent, false))
initialPiceses.push(new Pices(new Position(1, 7), PicesType.Knight, PlayerType.Opponent, false))
initialPiceses.push(new Pices(new Position(2, 7), PicesType.Bishop, PlayerType.Opponent, false))
initialPiceses.push(new Pices(new Position(3, 7), PicesType.Queen, PlayerType.Opponent, false))
initialPiceses.push(new Pices(new Position(4, 7), PicesType.King, PlayerType.Opponent, false))
initialPiceses.push(new Pices(new Position(5, 7), PicesType.Bishop, PlayerType.Opponent, false))
initialPiceses.push(new Pices(new Position(6, 7), PicesType.Knight, PlayerType.Opponent, false))
initialPiceses.push(new Pices(new Position(7, 7), PicesType.Rook, PlayerType.Opponent, false))

initialPiceses.push(new Pices(new Position(0, 0), PicesType.Rook, PlayerType.Me, false))
initialPiceses.push(new Pices(new Position(1, 0), PicesType.Knight, PlayerType.Me, false))
initialPiceses.push(new Pices(new Position(2, 0), PicesType.Bishop, PlayerType.Me, false))
initialPiceses.push(new Pices(new Position(3, 0), PicesType.Queen, PlayerType.Me, false))
initialPiceses.push(new Pices(new Position(4, 0), PicesType.King, PlayerType.Me, false))
initialPiceses.push(new Pices(new Position(5, 0), PicesType.Bishop, PlayerType.Me, false))
initialPiceses.push(new Pices(new Position(6, 0), PicesType.Knight, PlayerType.Me, false))
initialPiceses.push(new Pices(new Position(7, 0), PicesType.Rook, PlayerType.Me, false))

const initialBoard = new Board(initialPiceses, 1);
export { initialBoard }