import React from 'react';
import styles from './Spinner.module.css';

const spinner = () => {
    return (
            <div className={styles["lds-spinner"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
}

export default spinner;