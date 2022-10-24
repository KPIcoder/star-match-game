import React, {FC} from 'react';

import styles from './Stars.module.css';
import {utils} from "../../utils";

interface IProps {
    count: number;
}

export const Stars: FC<IProps> = ({count}): JSX.Element => {
    return (
        <>
            {utils.range(1, count).map(starId => (
                <div key={starId} className={styles.star} />
                ))}
        </>
    );
};
