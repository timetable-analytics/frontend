import React, {useState} from 'react';
import MyButton from "./UI/MyButton/MyButton";
import SidePanel from "./UI/SidePanel/SidePanel";
import {useHistory} from "react-router-dom";

const SideNavbar = ({visible, setVisible}) => {

    const router = useHistory();

    return (
        <SidePanel active={visible} setActive={setVisible}>
            <MyButton style={{background: "black"}} onClick={()=> setVisible(false)} >
                Закрыть панель
            </MyButton>

            <MyButton onClick={()=>{router.push("/main")}}>
                Главная
            </MyButton>
            <MyButton onClick={()=>{router.push("/main/audiences")}}>
                Аудитории
            </MyButton>
            <MyButton>
                Преподаватели
            </MyButton>
            <MyButton>
                Учебные группы
            </MyButton>
            <MyButton>
                Дисциплины
            </MyButton>
        </SidePanel>
    );
};

export default SideNavbar;