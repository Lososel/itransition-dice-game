import { FairRandom } from './random.js';
import { Menu } from './menu.js';

export class Game {
    constructor(dice) {
        this.dice = dice;
        this.available = new Set(dice.map((_, i) => i));
    }

    async run() {
        console.log(`\nLet's determine who makes the first move.`);
        const firstFair = await new FairRandom(2).getFairNumber();
        if (!firstFair) return;
        const { computerNumber, userNumber } = firstFair;
        const firstMover = computerNumber === userNumber ? 'user' : 'computer';
        console.log(
            `${firstMover === 'computer' ? 'I' : 'You'} make the first move.\n`
        );

        let firstIdx, secondIdx;
        if (firstMover === 'computer') {
            firstIdx = await this.computerSelectDice(true);
            if (firstIdx == null) return;
            this.available.delete(firstIdx);
            secondIdx = await this.userSelectDice();
            if (secondIdx == null) return;
        } else {
            firstIdx = await this.userSelectDice();
            if (firstIdx == null) return;
            this.available.delete(firstIdx);
            
            secondIdx = await this.computerSelectDice(false);
            if (secondIdx == null) return;
        }
        
        const [compIndex, userIndex] =
        firstMover === 'computer'
        ? [firstIdx, secondIdx]
        : [secondIdx, firstIdx];
        
        const compRoll = await this.performRoll(compIndex, 'my');
        if (compRoll == null) return;
        const userRoll = await this.performRoll(userIndex, 'your');
        if (userRoll == null) return;

        this.displayResult(compRoll, userRoll);
    }
    
    async computerSelectDice(isFirst) {
        const arr = [...this.available];
        const idx = arr[Math.floor(Math.random() * arr.length)];
        const verb = isFirst ? 'I make the first move and choose' : 'I choose';
        console.log(`${verb} the ${this.dice[idx]} dice.\n`);
        return idx;
    }

    async userSelectDice() {
        const arr = [...this.available];
        const opts = arr.map((i) => this.dice[i].toString());
        const menu = new Menu(opts, 'Choose your dice:', true, this.dice);
        const sel = await menu.show();
        if (sel == null) return null;
        const idx = arr[sel];
        console.log(`You choose the ${this.dice[idx]} dice.\n`);
        return idx;
    }

    async performRoll(diceIndex, who) {
        console.log(`It's time for ${who} roll.`);
        const fair = await new FairRandom(this.dice[diceIndex].getFaceCount()).getFairNumber();
        if (!fair) return null;
        const face = this.dice[diceIndex].getFace(fair.result);
        console.log(`${who.charAt(0).toUpperCase() + who.slice(1)} roll result is ${face}.\n`);
        return face;
    }

    displayResult(comp, user) {
        if (comp > user) {
            console.log(`I win (${comp} > ${user})!`);
        } else if (user > comp) {
            console.log(`You win (${user} > ${comp})!`);
        } else {
            console.log(`It's a tie (${comp} = ${user})!`);
        }
    }
}
