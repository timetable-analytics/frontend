import React from 'react';
import classes from './Basement.module.css'


const Basement = ({children, ...props}) => {
    return (
        <div {...props}  className={classes.myPdv}>
            {children}
        </div>
    );
};
export default Basement;

