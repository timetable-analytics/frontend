import React from 'react';
import MyButton from "./UI/MyButton/MyButton";
import SidePanel from "./UI/SidePanel/SidePanel";
import Basement from "./UI/Podval/Basement";
import {useHistory} from "react-router-dom";

const SideNavbar = ({visible, setVisible}) => {

    const router = useHistory();

    return (
        <SidePanel active={visible} setActive={setVisible}>
            <MyButton style={{background: "gray", marginBottom: 20}} onClick={()=> setVisible(false)} >
                Закрыть панель
            </MyButton>

            <MyButton onClick={()=>{router.push("/main"); setVisible(false)}}>
                Главная
            </MyButton>
            <MyButton onClick={()=>{router.push("/main/audiences"); setVisible(false)}}>
                Аудитории
            </MyButton>
            <MyButton onClick={()=>{router.push("/main/teachers"); setVisible(false)}} >
                Преподаватели
            </MyButton>
            <MyButton onClick={()=>{router.push("/main/student_groups"); setVisible(false)}}>
                Учебные группы
            </MyButton>
            <MyButton onClick={()=>{router.push("/main/disciplines"); setVisible(false)}}>
                Дисциплины
            </MyButton>
           <Basement>
               &copy; Санкт-Петербургский государственный университет
           </Basement>
        </SidePanel>
    );
};

export default SideNavbar;