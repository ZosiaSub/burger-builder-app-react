import React from 'react';
import classes from './Spinner.css';

const Spinner = () => (
    <div>
        <div className={classes["lds-circle"]}>
            <div></div>
        </div>
        <div>Loading...</div>
    </div>

);

export default Spinner;
