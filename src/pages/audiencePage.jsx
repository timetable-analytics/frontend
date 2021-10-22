import React, {useState} from 'react';
import MyButton from "../component/UI/MyButton/MyButton";
import SideNavbar from "../component/SideNavbar";


const AudiencePage = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <MyButton onClick={()=> setVisible(true)} >
                Боковая панель
            </MyButton>
            <h1>
                УШЁЛ ОТСЮДА
                ЗДЕСЬ ЛЮДИ РАБОТАЮТ
            </h1>
            <SideNavbar visible={visible} setVisible={setVisible} />
        </div>
    );
};

export default AudiencePage;