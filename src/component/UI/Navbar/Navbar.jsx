import React, {useEffect, useState} from 'react';
import classes from "./Navbar.module.css";
import SideButton from "../sideButton/sideButton";
import SideNavbar from "../../SideNavbar";
import {MyLocation} from "../../../routes/MyLocation";
import {useHistory} from "react-router-dom";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const page = ["Главная","Аудитории","Преподаватели","Учебные группы", "Дисциплины", "Занятость"];
    const [idPage, setIdPage] = useState("Error");

    let i = MyLocation()
    useEffect( () => setIdPage(page[i])  ,[idPage, i])
    const router = useHistory();
        return (
        <div className={classes.navbar}>
            <SideNavbar visible={visible} setVisible={setVisible}/>

            <SideButton onClick={()=> setVisible(true)}/>

            <img style={{marginLeft: 30, cursor: "pointer"}} src="https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"
                 alt="Логотип Университета"
                 height="60"
                 width="70"

                 onClick={()=>{router.push("/main"); setVisible(false)}}
             />

            <h1 className={classes.navbar__link}>
                Анализ Расписания > {idPage}
            </h1>

        </div>
    );
}

export default Navbar;