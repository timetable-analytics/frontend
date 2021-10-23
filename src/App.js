import React from "react";
import './styles/App.css';
import './styles/Buttons.css';
import PageRouter from "./component/PageRouter";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./component/UI/Navbar/Navbar";


function App() {
    /*При добавление новой страницы нужно добавить путь в /routes/routes.js
    * */

  return (

    <BrowserRouter>
        <Navbar/>

        <PageRouter/>
    </BrowserRouter>
  );
}

export default App;
