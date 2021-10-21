import React from "react";
import './styles/App.css';
import PageRouter from "./component/PageRouter";
import {BrowserRouter, Router} from "react-router-dom";


function App() {
    /*При добавление новой страницы нужно добавить путь в /routes/routes.js
    * */

  return (
    <BrowserRouter>
        <PageRouter/>
    </BrowserRouter>
  );
}

export default App;
