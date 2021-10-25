import React from 'react';
import Card from "../component/UI/Card/Card";
import {useHistory} from "react-router-dom";
import '../styles/mainPage.css'

const MainPage = () => {
    const router = useHistory();

    return (
        <div>

            <Card style={{marginTop: 50, marginLeft: 250}}
                  route={()=>{router.push("/main/audiences")}}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text={"Аудитории"}
                  text1={"info/info/info/info/info \n info/info/info/info/info \n info/info/info/info/info \n info/info/info/info/info \n "}
            />
            <Card style={{marginTop: 0, marginLeft: 250}}
                  route={()=>router.push("/main/teachers")}
                  text={"Преподаватели"}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text1={"info/info/info/info/info \n info/info/info/info/info \n info/info/info/info/info \n info/info/info/info/info \n "}

            />
            <Card style={{marginTop: -500, marginLeft: 800}}
                  route={()=> router.push("/main/student_groups")}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text={"Учебные группы"}
                  text1={"info/info/info/info/info \n info/info/info/info/info \n info/info/info/info/info \n info/info/info/info/info \n "}

            />
            <Card style={{marginTop: 0, marginLeft: 800}}
                  route={()=> router.push("/main/disciplines")}
                  image={"https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"}
                  text={"Дисциплины"}
                  text1={"info/info/info/info/info \n info/info/info/info/info \n info/info/info/info/info \n info/info/info/info/info \n "}

            />
        </div>
    );
};

export default MainPage;