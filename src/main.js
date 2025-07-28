import { DiceParser } from './parser.js';
import { Game } from './game.js';

async function main() {
    try {
        const dice = DiceParser.parse(process.argv.slice(2));
        const game = new Game(dice);
        await game.run();
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

main();
