export class ProbabilityCalculator {
    static calculate(dice) {
        const n = dice.length;
        const matrix = Array.from({ length: n }, () => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const di = dice[i], dj = dice[j];
                let wins = 0;
                const total = di.getFaceCount() * dj.getFaceCount();
                for (let a = 0; a < di.getFaceCount(); a++) {
                    for (let b = 0; b < dj.getFaceCount(); b++) {
                        if (di.getFace(a) > dj.getFace(b)) wins++;
                    }
                }
                matrix[i][j] = wins / total;
            }
        }
        return matrix;
    }
}
