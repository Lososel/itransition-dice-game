import Table from 'cli-table3';
import chalk from 'chalk';

export class TableRenderer {
    static render(dice, probs) {
        const headers = [
            chalk.bold.underline('User \\ Computer'),
            ...dice.map(d => chalk.bold(d.toString()))
        ];
        const table = new Table({
            head: headers,
            style: { head: [], border: [] },
            colAligns: ['left', ...dice.map(() => 'right')]
        });
        table.push(
            ...probs.map((row, i) => {
                const rowVals = row.map((p, j) => {
                    if (i === j) {
                        return chalk.dim('—');
                    }
                    const cell = p.toFixed(4).slice(1);
                    if (p > 0.5) {
                        return chalk.green(cell);
                    } else if (p < 0.5) {
                        return chalk.red(cell);
                    } else {
                        return chalk.yellow(cell);
                    }
                });
                return [chalk.bold(dice[i].toString()), ...rowVals];
            })
        );
        console.log(chalk.blue('\nProbability of the win for the user:'));
        console.log(table.toString(), '\n');
    }
}
