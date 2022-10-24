import React, {FC, useEffect, useState} from 'react';
import {status, utils} from "../../utils";
import styles from "./Game.module.css";
import {PlayAgain} from "../PlayAgain/PlayAgain";
import {Stars} from "../Stars/Stars";
import {PlayNumber} from "../PlayNumber/PlayNumber";

interface IProps {
    startNewGame: () => void;
}

export const Game: FC<IProps> = ({startNewGame}): JSX.Element => {
    const [stars, setStars] = useState<number>(utils.random(1, 9));
    const [availableNumbers, setAvailableNumbers] = useState<number[]>(utils.range(1, 9));
    const [candidateNumbers, setCandidateNumbers] = useState<number[]>([]);
    const [secondsLeft, setSecondsLeft] = useState(30);

    useEffect(() => {
        if (secondsLeft > 0 && availableNumbers.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    });

    const candidatesAreWrong = utils.sum(candidateNumbers) > stars;
    const gameStatus = availableNumbers.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active'

    const numberStatus = (number: number) => {
        if (!availableNumbers.includes(number)) {
            return 'used';
        }
        if (candidateNumbers.includes(number)) {
            return candidatesAreWrong ? 'wrong': 'candidate';
        }
        return 'available';
    };

    const resetGame = () => {
        setStars(utils.random(1, 9));
        setAvailableNumbers(utils.range(1, 9));
        setCandidateNumbers([]);
    };

    const onNumberClick = (number: number, currentStatus: status) => {
        if (gameStatus !== 'active' || currentStatus === 'used') {
            return;
        }

        const newCandidateNums =
            currentStatus === 'available'
                ? candidateNumbers.concat(number)
                : candidateNumbers.filter(cn => cn !== number);

        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNumbers(newCandidateNums);
        } else {
            const newAvailableNums = availableNumbers.filter(
                n => !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNumbers(newAvailableNums);
            setCandidateNumbers([]);
        }
    };


    return (
        <div className={styles.game}>
            <div className={styles.help}>
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className={styles.body}>
                <div className={styles.left}>
                    {gameStatus !== 'active' ? (
                        <PlayAgain onClick={startNewGame} gameStatus={gameStatus} />
                    ) : (
                        <Stars count={stars} />
                    )}
                </div>
                <div className={styles.right}>
                    {utils.range(1, 9).map(number =>
                        <PlayNumber key={number} number={number} status={numberStatus(number)} onClick={onNumberClick}/>
                    )}
                </div>
            </div>
            <div className={styles.timer}>
                Time Remaining: {secondsLeft};
            </div>
        </div>
    );
};
