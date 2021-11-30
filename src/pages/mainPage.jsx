import React from 'react';
import Card from "../component/UI/Card/Card";
import {useHistory} from "react-router-dom";
import '../styles/mainPage.css'
const MainPage = () => {
    const router = useHistory();

    return (
        <div >

            <Card style={{marginTop: 50, marginLeft: 250}}
                  route={()=>{router.push("/main/audiences")}}
                  image={"https://img.icons8.com/ios/344/class.png"}
                  text={"Аудитории"}
                  text1={"• Тип аудитории \n • Здание\n  • Номер аудитории  "}
            />
            <Card style={{marginTop: 0, marginLeft: 250}}
                  route={()=>router.push("/main/teachers")}
                  text={"Преподаватели"}
                  image={"https://img.icons8.com/ios/344/teacher.png"}
                  text1={"• Факультет\n • Ф.И.О \n  • Должность "}

            />
            <Card style={{marginTop: -500, marginLeft: 800}}
                  route={()=> router.push("/main/student_groups")}
                  image={"https://img.icons8.com/pastel-glyph/344/business-group.png"}
                  text={"Учебные группы"}
                  text1={"• Факультет\n • Программа обучения \n  • Номер группы\n  • Курс "}

            />
            <Card style={{marginTop: 0, marginLeft: 800}}
                  route={()=> router.push("/main/disciplines")}
                  image={"https://img.icons8.com/ios/344/school.png"}
                  text={"Дисциплины"}
                  text1={"• Название дисциплины"}

            />
        </div>
    );
};

export default MainPage;