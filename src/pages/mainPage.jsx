import React from 'react';
import Card from "../component/UI/Card/Card";
import {useHistory} from "react-router-dom";
import '../styles/mainPage.css'

const MainPage = () => {
    const router = useHistory();

    return (
        <div>

            <Card style={{marginTop: 50, marginLeft: 250}}  route={()=>{router.push("/main/audiences")}}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text={"Аудитории"}
            />
            <Card style={{marginTop: 0, marginLeft: 250}}
                  onClick={()=> true}
                  text={"Преподаватели"}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}

            />
            <Card style={{marginTop: -500, marginLeft: 800}}
                  onClick={()=> true}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text={"Учебные группы"}
            />
            <Card style={{marginTop: 0, marginLeft: 800}}
                  onClick={()=> true}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text={"Дисциплины"}
            />
        </div>
    );
};

export default MainPage;