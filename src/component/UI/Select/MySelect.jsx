import React from 'react';
import classes from './MySelect.module.css'

const MySelect = ({option,defaultValue, value, onChange}) => {
    return (
        <select className={classes.MySelect}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option className={classes.MyOption} disabled value=""> {defaultValue}</option>
            {option.map(option =>
                <option className={classes.MyOption} key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}

        </select>
    );
};

export default MySelect;