import React from 'react';
import  "./sidePanel.css";

const SidePanel = ({active, setActive, children}) => {

    return (
        <div className={active ? "panel active" : "panel"} onClick={()=> setActive(false)}>
            <div className={active ? "panel__content active" : "panel__content"}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default SidePanel;