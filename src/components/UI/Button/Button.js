import React from 'react';

const button = (props) => (
    <button
        onCLick={props.clicked}>
        {props.children}
    </button>
);

export default button;
