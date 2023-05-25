import './tile.css'

export default function tile(props) {
    const className = [
        "tile",
        props.n % 2 === 0 ? "black-tile" : "white-tile",
        props.highlight && "tile-highlight",
        props.image && "chess-piece-tile"
    ].filter(Boolean).join(' ')

    return <div className={className}>
        {props.image && <div className="chess-piece" style={{ backgroundImage: `url(${props.image})` }}></div>}
    </div>


}