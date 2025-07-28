import { ProbabilityCalculator } from './probability.js';
import { TableRenderer } from './table.js';

export class Menu {
  constructor(options, prompt, isDiceMenu = false, dice = []) {
    this.options = options;
    this.prompt = prompt;
    this.isDiceMenu = isDiceMenu;
    this.dice = dice;
  }

  printMenu() {
    console.log(this.prompt);
    this.options.forEach((opt, i) => console.log(`${i} - ${opt}`));
    console.log('X - exit');
    console.log('? - help');
  }

  async show() {
    const { createInterface } = await import('readline');
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const ask = () =>
      new Promise(resolve => {
        this.printMenu();

        rl.question('Your selection: ', async (raw) => {
          const input = raw.trim().toUpperCase();
          if (input === 'X') {
            console.log('\nGoodbye!');
            rl.close();
            return resolve(null);
          }
          if (input === '?') {
            if (this.isDiceMenu) {
              const probs = ProbabilityCalculator.calculate(this.dice);
              TableRenderer.render(this.dice, probs);
            } else {
              console.log(
                '\nHelp: This is part of the “fair RNG” protocol.\n' +
                'Select one of the numbers shown to contribute your secret.\n'
              );
            }
            return resolve(await ask());
          }
          const idx = parseInt(input, 10);
          if (isNaN(idx) || idx < 0 || idx >= this.options.length) {
            console.log(
              `Invalid input. Please select 0..${this.options.length - 1}, X, or ?.\n`
            );
            return resolve(await ask());
          }
          rl.close();
          resolve(idx);
        });
      });

    return await ask();
  }
}
