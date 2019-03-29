import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputElement = null;
    switch(props.elementType) {
        case('input'):
            inputElement = <input 
                {...props.elementConfig} 
                value={props.value} 
                className={classes.InputElement} 
                onChange={props.clicked}
            />;
            break;
        case('textarea'):
            inputElement = <testarea 
                {...props.elementConfig} 
                value={props.value} 
                className={classes.InputElement} 
                onChange={props.clicked}    
            />;
            break;
        case('select'):
            inputElement = <select 
                className={classes.InputElement} 
                value={props.value}
                onChange={props.clicked}
            >{props.elementConfig.options.map(option => {
                return (<option key={option.value} value={option.value}>{option.displayValue}</option>)
            })}
            </select>
            break;        
        default:
            inputElement = <input 
                {...props.elementConfig} 
                value={props.value} 
                className={classes.InputElement}
                onChange={props.clicked}        
            />;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;