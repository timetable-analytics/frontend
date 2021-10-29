import React, {useState} from 'react';
import axios from "axios";
import {ChosenElement} from "../../../Constants/ChosenElement";
import TeachersTable from "../MyTable/TeachersTable";

const TeacherFormPanel = ({activeButton, setActiveButton}) => {

    const [informationAboutTeachers, setInformationAboutTeachers] = useState({
        faculty: undefined,
        fio: undefined,
        position: undefined,
        degree: undefined
    })

    const [paramsSearch, setParamsSearch] = useState({
        faculty: undefined,
        fio: undefined,
        position: undefined,
        degree: undefined
    })

    const [totalTeachers, setTotalTeachers] = useState( undefined);
    const [activeTable, setActiveTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // get teachers from server with possible params faculty, fio, position, degree
    const getTeachers = (faculty, fio, position, degree, callback) => {
        let params = (faculty !== undefined ? `faculty=${faculty}&` : "") +
            (fio !== undefined ? `fio=${fio}&` : "") +
            (position !== undefined ? `position=${position}&` : "")+
            (degree !== undefined ? `degree=${degree}&` : "")+
            (`limit=${10}&`)+
            ("page=0");
        console.log('http://127.0.0.1:5000/educators/all/?' + params);
        axios.get('http://127.0.0.1:5000/educators/all/?' + params)
            .then(response => {
                callback(response.data.educators, response.data.countRecords);
            })
            .catch(error => {
                alert(error.toString());
            });
    }

    // what should we do with lest of teachers received from server
    const getTeachersCallback = (teachers, countRecords) => {
        //console.log(teachers);
        //alert(`${teachers.length} teachers was found! Look at list of teachers in console log`);
        setInformationAboutTeachers(teachers);
        setTotalTeachers (countRecords);
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

        let faculty = document.getElementById("faculty").value;
        let fio = document.getElementById("fio").value;
        let position = document.getElementById("position").value;
        let degree = document.getElementById("degree").value;

        document.getElementById("search").getAttribute("disabled");//Дисейбл кнопки

        getTeachers(faculty !== "" ? faculty : undefined,
            fio !== "" ? fio : undefined,
            position !== "" ? position : undefined,
            degree !== "" ? degree : undefined,
            getTeachersCallback);

        setParamsSearch({faculty: faculty !== "" ? faculty : undefined,
            fio: fio !== "" ? fio : undefined,
            position: position !=="" ? position :undefined,
            degree: degree !=="" ? degree :undefined
        })

    }


    return (
        <div className="container">
            <div className="row gx-5">
                <div className="col-3 order-1">

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
                            <label  className="form-label">Факультет</label>
                            <input type="text" className="form-control" id="faculty"
                                   placeholder="ПМ-ПУ"
                            />
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Ф.И.О.</label>
                            <input type="text" className="form-control" id="fio"
                                   placeholder="Иванов Иван Иванович"
                            />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Должность</label>
                            <input type="text" className="form-control" id="position"
                                   placeholder="доцент"
                            />
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Должность</label>
                            <input type="text" className="form-control" id="degree"
                                   placeholder="кандидат наук"
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
                <TeachersTable
                    teachers ={informationAboutTeachers}
                    setTeachers={setInformationAboutTeachers}
                    totalTeachers={totalTeachers}
                    paramsSearch={paramsSearch}
                    activeTable={activeTable}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default TeacherFormPanel;