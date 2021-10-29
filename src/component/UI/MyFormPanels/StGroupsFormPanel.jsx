import React, {useState} from 'react';
import axios from "axios";
import {ChosenElement} from "../../../Constants/ChosenElement";
import StGroupsTable from "../MyTable/StGroupsTable";

const StGroupsFormPanel = ({activeButton, setActiveButton, setInfoAboutStGroups}) => {

    const [informationAboutStGroups, setInformationAboutStGroups] = useState({
        faculty: undefined,
        program: undefined,
        name: undefined,
        course: undefined
    })
    const [paramsSearch, setParamsSearch] = useState({
        faculty: undefined,
        program: undefined,
        name: undefined,
        course: undefined
    })

    const [totalStGroups, setTotalStGroups] = useState( undefined);
    const [activeTable, setActiveTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // get stGroups from server with possible params faculty, program, name, course
    const getStGroups = (faculty, program, name, course, callback) => {
        let params = (faculty !== undefined ? `faculty=${faculty}&` : "") +
            (program !== undefined ? `program=${program}&` : "") +
            (name !== undefined ? `name=${name}&` : "")+
            (course !== undefined ? `course=${course}&` : "")+
            (`limit=${10}&`)+
            ("page=0");
        console.log('http://127.0.0.1:5000/groups/all/?' + params);
        axios.get('http://127.0.0.1:5000/groups/all/?' + params)
            .then(response => {
                callback(response.data.groups, response.data.countRecords);
            })
            .catch(error => {
                alert(error.toString());
            });
    }

    // what should we do with lest of teachers received from server
    const getStGroupsCallback = (stGroups, countRecords) => {
        //console.log(stGroups);
        //alert(`${stGroups.length} teachers was found! Look at list of teachers in console log`);
        setInformationAboutStGroups(stGroups);
        setTotalStGroups (countRecords);
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
        let program = document.getElementById("program").value;
        let name = document.getElementById("name").value;
        let course = document.getElementById("course").value;

        document.getElementById("search").getAttribute("disabled");//Дисейбл кнопки

        getStGroups(faculty !== "" ? faculty : undefined,
            program !== "" ? program : undefined,
            name !== "" ? name : undefined,
            course !== "" ? course : undefined,
            getStGroupsCallback);

        setParamsSearch({faculty: faculty !== "" ? faculty : undefined,
            program: program !== "" ? program : undefined,
            name: name !=="" ? name :undefined,
            course: course !=="" ? course :undefined
        })

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
                            <label  className="form-label">Факультет</label>
                            <input type="text" className="form-control" id="faculty"
                                   placeholder="ПМ-ПУ"
                            />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Программа обучения</label>
                            <input type="text" className="form-control" id="program"
                                   placeholder="Программирование и информационные технологии"
                            />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Номер группы</label>
                            <input type="text" className="form-control" id="name"
                                   placeholder="21.Б01-пу"
                            />
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Курс</label>
                            <input type="text" className="form-control" id="course"
                                   placeholder="1"
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
                <StGroupsTable
                    stGroups={informationAboutStGroups}
                    setStGroups={setInformationAboutStGroups}
                    totalStGroups={totalStGroups}
                    activeTable={activeTable}
                    paramsSearch={paramsSearch}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

        </div>
    );
};

export default StGroupsFormPanel;