import React from 'react';
import {MenuOutlined} from '@ant-design/icons';

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
        <div {...props} >
            {children}
            <MenuOutlined style={{cursor: "pointer", position: "static", fontSize: 35}}/>
        </div>
    );

};

export default SideButton;