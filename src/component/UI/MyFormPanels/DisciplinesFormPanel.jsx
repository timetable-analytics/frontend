import React, {useState} from 'react';
import axios from "axios";
import {ChosenElement} from "../../../Constants/ChosenElement";
import DisciplinesTable from "../MyTable/DisciplinesTable";

const DisciplinesFormPanel = ({activeButton, setActiveButton, setInfoAboutDisciplines}) => {

    const [informationAboutDisciplines, setInformationAboutDisciplines] = useState({
        name: undefined
    })
    const [paramsSearch, setParamsSearch] = useState({
        name: undefined
    })

    const [totalDisciplines, setTotalDisciplines] = useState( undefined);
    const [activeTable, setActiveTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // get teachers from server with possible params faculty, fio, position, degree
    const getDisciplines = (name, callback) => {
        let params = (name !== undefined ? `name=${name}&` : "") +
            (`limit=${10}&`)+
            ("page=0");
        console.log('http://127.0.0.1:5000/disciplines/all/?' + params);
        axios.get('http://127.0.0.1:5000/disciplines/all/?' + params)
            .then(response => {
                callback(response.data.disciplines, response.data.countRecords);
            })
            .catch(error => {
                alert(error.toString());
            });
    }

    // what should we do with lest of teachers received from server
    const getDisciplinesCallback = (disciplines, countRecords) => {
        //console.log(disciplines);
        //alert(`${disciplines.length} teachers was found! Look at list of teachers in console log`);
        setInformationAboutDisciplines(disciplines);
        setTotalDisciplines (countRecords);
        setActiveTable(true);
        document.getElementById("search").removeAttribute("disabled");//Включение кнопки
    }

    // receive list of audiences from server on search button click
    const onSearchClick = async (e) => {
        setActiveTable(false);
        setCurrentPage(1);
        e.preventDefault();

        await ChosenElement.clear();
        console.log(ChosenElement);

        let name = document.getElementById("name").value;
        document.getElementById("search").getAttribute("disabled");//Дисейбл кнопки

        getDisciplines(name !== "" ? name : undefined, getDisciplinesCallback);

        setParamsSearch({name: name !== "" ? name : undefined})

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-3">

                    <div style={{marginTop: 15}} className="mb-3">
                        <button className={activeButton ? "roundB active" : "roundB"}
                                onClick={() => setActiveButton(true)}
                        />
                        <label>Поиск</label>

                        <button style={{marginLeft: 20}} className={!activeButton ? "roundB active" : "roundB"}
                                onClick={() => setActiveButton(false)}
                        />
                        <label>Фильтр</label>
                    </div>

                    <form>
                        <div className="mb-3">
                            <label  className="form-label">Название дисциплины</label>
                            <input type="text" className="form-control" id="name"
                                   placeholder="Алгебра"
                            />
                        </div>

                        <div className="mb-3">
                            <button onClick={onSearchClick} id="search">Поиск</button>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Начало</label>
                            <input type="date" className="form-control" id="startDate"
                                   placeholder="01.01.2021"/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Конец</label>
                            <input type="date" className="form-control" id="endDate"
                                   placeholder="02.01.2021"/>
                        </div>

                    </form>
                </div>
                <DisciplinesTable
                    disciplines={informationAboutDisciplines}
                    setDisciplines={setInformationAboutDisciplines}
                    totalDisciplines={totalDisciplines}
                    paramsSearch={paramsSearch}
                    activeTable={activeTable}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

        </div>
    );
};

export default DisciplinesFormPanel;