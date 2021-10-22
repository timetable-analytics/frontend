import React, {useState} from 'react';
import classes from "./sideButton.module.css";

const SideButton = () => {

    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <button className={classes.openButton}
                    onClick={()=>{setVisible(false)}}
            />
        );
    }else return (
        <button className={classes.closeButton}
                onClick={()=>{setVisible(true)}}
        />
    );
};

export default SideButton;