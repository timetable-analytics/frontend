import React, {useState} from "react";
import './styles/App.css';
import PageRouter from "./component/PageRouter";
import {BrowserRouter, Router} from "react-router-dom";
import MyButton from "./component/UI/MyButton/MyButton";
import SideNavbar from "./component/SideNavbar";


function App() {
    /*При добавление новой страницы нужно добавить путь в /routes/routes.js
    * */
    const [visible, setVisible] = useState(false);

  return (

    <BrowserRouter>
        <MyButton onClick={()=> setVisible(true)}>
            Боковая панель
        </MyButton>
        <SideNavbar visible={visible} setVisible={setVisible}/>
        <PageRouter/>
    </BrowserRouter>
  );
}

export default App;
