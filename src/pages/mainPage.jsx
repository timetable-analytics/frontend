import React from 'react';
import Navbar from "../component/UI/Navbar/Navbar";
import MyButton from "../component/UI/MyButton/MyButton";
import Card from "../component/UI/Card/Card";
import {useHistory} from "react-router-dom";
import '../styles/mainPage.css'
import SidePanel from "../component/UI/SidePanel/SidePanel";

const MainPage = () => {
    const router = useHistory();

    return (
        <div>
            <Navbar/>
            <MyButton onClick={()=>{router.push("/main/audiences")}}> Не жми на меня!</MyButton>
            <Card style={{marginTop: 50, marginLeft: 400}}  route={()=>{router.push("/main/audiences")}}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text={"Аудитории"}
            />
            <Card onClick={()=> true}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text={"Преподаватели"}
            />
            <Card onClick={()=> true}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text={"Учебные группы"}
            />
            <Card onClick={()=> true}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text={"Дисциплины"}
            />
        </div>
    );
};

export default MainPage;