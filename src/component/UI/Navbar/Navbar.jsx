import React from 'react';
import MySelect from "../Select/MySelect";
import classes from "./Navbar.module.css";


const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <img src="https://pr.spbu.ru/images/simvolika/logo/spbu_grey.png"
                 alt="Логотип Университета"
                 height="60"
                 width="70"
             />
            <h1 className={classes.navbar__link}>
                Анализ Расписания
            </h1>
            <div style={{marginLeft: 30}}>
                <MySelect
                    value={''}
                    onChange={() => {}}
                    defaultValue="Аудитории"
                    option={[
                        {value: 'freeAudiences', name: 'Свободные аудитории'},
                        {value: 'busyAudiences', name: 'Занятые аудитории'},
                    ]}
                />
            </div>
            <div style={{marginLeft: 30}}>
                <MySelect
                    value={''}
                    onChange={() => {}}
                    defaultValue="Преподаватели"
                    option={[
                        {value: 'freeTutor', name: 'Выходные дни'},
                        {value: 'busyTutor', name: 'Занятость'},
                    ]}
                />
            </div>
        </div>
    );
}

export default Navbar;