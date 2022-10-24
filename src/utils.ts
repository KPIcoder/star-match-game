export const utils = {
    sum: (arr: number[]): number => arr.reduce((a, b) => a + b, 0),
    range: (min: number, max: number): number[] => Array.from({length: max - min + 1}, (_, i) => min + i),
    random: (min: number, max: number): number => min + Math.floor(max * Math.random()),
    randomSumIn: (arr: number[], max: number): number => _randomSumIn(arr, max)
};

const _randomSumIn = (arr: number[], max: number): number => {
    const sets: number[][] = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < sets.length; j++) {
            const candidateSet = [...sets[j], arr[i]];
            const candidateSum = utils.sum(candidateSet);

            if (candidateSum <= max) {
                sets.push(candidateSet);
                sums.push(candidateSum);
            }
        }
    }
    return sums[utils.random(0, sums.length - 1)];
}

interface IColors {
    available: string;
    used: string;
    wrong: string;
    candidate: string;
}

export const Colors: IColors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

export type status = keyof typeof Colors
