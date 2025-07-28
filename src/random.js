import { createHmac, randomBytes, randomInt } from 'crypto';
import { Menu } from './menu.js';

export class FairRandom {
    constructor(range) {
        this.range = range;
    }
    
    generateKey() {
        return randomBytes(32);
    }
    
    generateNumber() {
        return randomInt(0, this.range);
    }
    
    computeHmac(key, value) {
        return createHmac('sha3-256', key).update(String(value)).digest('hex').toUpperCase();
    }
    
    async getFairNumber() {
        const key = this.generateKey();
        const computerNumber = this.generateNumber();
        const hmac = this.computeHmac(key, computerNumber);
        console.log(`I selected a random value in the range 0..${this.range - 1} ` + `(HMAC=${hmac}).`);
        
        const prompt =
        this.range === 2 ? 'Try to guess my selection.' : `Add your number modulo ${this.range}.`;
        
        const options = Array.from({ length: this.range }, (_, i) => String(i));
        const menu = new Menu(options, prompt, false);
        const idx = await menu.show();
        if (idx === null) return null;
        
        const userNumber = idx;
        const result = (computerNumber + userNumber) % this.range;
        console.log(`${this.range === 2 ? 'My selection' : 'My number'} is ${computerNumber} ` + `(KEY=${key.toString('hex').toUpperCase()}).`);
        if (this.range !== 2) {
            console.log(`The fair number generation result is ` + `${computerNumber} + ${userNumber} = ${result} (mod ${this.range}).`);
        }
            
        return { result, computerNumber, userNumber };
    }
}
