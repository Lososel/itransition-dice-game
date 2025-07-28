import { Dice } from './dice.js';

export class DiceParser {
    static parse(args) {
        if (args.length < 3) {
            throw new Error(
                `At least 3 dice configurations are required. Example: node main.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3`
            );
        }
        return args.map((arg, idx) => {
            const faces = arg.split(',').map((num) => {
                const parsed = parseInt(num.trim(), 10);
                if (isNaN(parsed)) {
                    throw new Error(
                        `Invalid dice configuration at position ${idx+1}: '${arg}'. All values must be integers. Example: 2,2,4,4,9,9`
                    );
                }
                return parsed;
            });
            if (faces.length !== 6) {
                throw new Error(
                    `Dice at position ${idx+1} must have exactly 6 faces. Example: 2,2,4,4,9,9`
                );
            }
            if (faces.length < 1) {
                throw new Error(
                    `Dice at position ${idx+1} has no faces. Each die must have at least one face. Example: 2,2,4,4,9,9`
                );
            }
            return new Dice(faces);
        });
    }
}