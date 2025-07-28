export class Dice {
    constructor(faces) {
        this.faces = faces;
    }

    getFace(index) {
        return this.faces[index];
    }

    getFaceCount() {
        return this.faces.length;
    }

    toString() {
        return `[${this.faces.join(',')}]`;
    }
}