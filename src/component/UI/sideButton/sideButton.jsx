import React from 'react';
import "./sideButton.css";

const SideButton = ({children, ...props}) => {

   /* const [visible, setVisible] = useState(true);

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
    );*/
    return(
        <button {...props} className="openButton">
            {children}
        </button>
    );

};

export default SideButton;