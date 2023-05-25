export class Position {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    samePosition(anotherPosition) {
        return (this.x === anotherPosition.x && this.y === anotherPosition.y)
    }
    clone() {
        return new Position(this.x, this.y);
    }
}