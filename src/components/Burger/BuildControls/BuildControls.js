import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls =  [
    { label: 'Meat', type: 'meat'},
    { label: 'Becon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Salad', type: 'salad'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
        { controls.map(el => (
            <BuildControl 
                key={el.label} 
                label={el.label}
                add={() => props.addHandler(el.type)}
                decuct={() => props.deductHandler(el.type)}
                disabled={props.disabled[el.type]}
            />
        ))}        
    </div>
);

export default buildControls;
