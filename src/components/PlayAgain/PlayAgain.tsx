import React, {FC} from 'react';

import styles from './PlayAgain.module.css';

interface IProps {
    gameStatus: string;
    onClick: () => void;
}

export const PlayAgain: FC<IProps> = ({gameStatus, onClick}) => {
    return (
        <div className={styles.gameDone}>
            <div
                className={styles.message}
                style={{ color: gameStatus === 'lost' ? 'red' : 'green'}}
            >
                {gameStatus === 'lost' ? 'Game Over' : 'Nice'}
            </div>
            <button onClick={onClick}>Play Again</button>
        </div>
    );
};
