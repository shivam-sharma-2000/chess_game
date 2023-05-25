import React, { useRef, useState } from "react";
import "./chessboard.css"
import Tile from "../tile/tile";
import { TILESIZE, BOARDSIZE, verticalAxis, horizontalAxis} from "../../constants";
import { Position } from "../../models/Position";

export default function Chessboard(props) {
    let board = []
    const chessboardRef = useRef(null)
    const [grabPostion, setGrabPostion] = useState(new Position(-1, -1))
    const [activePiece, setActivePiece] = useState(null)
    
    

    function grabPiece(e) {
        const element = e.target
        const chessboard = chessboardRef.current
        if (element.classList.contains("chess-piece") && chessboard) {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / TILESIZE)
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - BOARDSIZE) / TILESIZE))
            setGrabPostion(new Position(grabX, grabY))
            const x = e.clientX - (TILESIZE / 2)
            const y = e.clientY - (TILESIZE / 2)
            element.style.position = "absolute"
            element.style.left = x + "px"
            element.style.top = y + "px"
            setActivePiece(element)
        }
    }

    function movePiece(e) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 17;
            const minY = chessboard.offsetTop - 17;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 53;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 63;
            const x = e.clientX - 35
            const y = e.clientY - 35

            activePiece.style.position = "absolute"

            if (x < minX) {
                activePiece.style.left = minX + "px"
            } else if (x > maxX) {
                activePiece.style.left = maxX + "px"
            }
            else {
                activePiece.style.left = x + "px"
            }

            if (y < minY) {
                activePiece.style.top = minY + "px"
            } else if (y > maxY) {
                activePiece.style.top = maxY + "px"
            }
            else {
                activePiece.style.top = y + "px"
            }
        }
    }

    function dropPiece(e) {
        const chessboard = chessboardRef.current
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / TILESIZE)
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - BOARDSIZE) / TILESIZE))

            const currentPices = props.pieces.find(p => p.position.samePosition(grabPostion))

            if (currentPices) {
                const success = props.playMove(currentPices.clone(), new Position(x, y))
                if (!success) {
                    activePiece.style.position = "relative"
                    activePiece.style.left = "0px"
                    activePiece.style.top = "0px"   
                }
            }
            setActivePiece(null)
        }
    } 

    for (let j = verticalAxis.length - 1; j >= 0; j--) {

        for (let i = 0; i < horizontalAxis.length; i++) {
            const piece = props.pieces.find(p => p.position.samePosition(new Position(i, j)))
            let image = piece ? piece.image : undefined
            let currentPices = props.pieces.find(p => p.position.samePosition(grabPostion))
            let highlight = false;
            if (currentPices) {
                highlight = activePiece && currentPices.possibleMove !== [] ? currentPices.possibleMoves.some(p => p.samePosition(new Position(i, j))) : false
            }
            board.push(<Tile n={i + j} key={horizontalAxis[i] + verticalAxis[j]} image={image} highlight={highlight} />)
        }
    }
    return (
        <>
            <div id="chessboard"
                onMouseDown={e => grabPiece(e)}
                onMouseMove={e => movePiece(e)}
                onMouseUp={e => dropPiece(e)}
                ref={chessboardRef}>
                {board}
            </div>
        </>
    )
}