import React, {FC} from 'react';

import styles from './PlayNumber.module.css';
import {Colors, status} from "../../utils";

interface IProps {
    number: number;
    status: status;
    onClick: (number: number, status: status) => void;
}

export const PlayNumber: FC<IProps> = ({number, status, onClick}) => {
    return (
        <button className={styles.number} style={{ backgroundColor: Colors[status] } } onClick={() => onClick(number, status)}>
            {number}
        </button>
    );
};
