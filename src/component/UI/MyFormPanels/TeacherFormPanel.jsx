import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ChosenElement, DataDate, IdEvents, IdRow, placeEvent} from "../../../Constants/ChosenElement";
import TeachersTable from "../MyTable/TeachersTable";
import Loader from "../Loader/Loader";
import {postInformationFromEvents} from "../../../API/postInformation";

const TeacherFormPanel = ({activeButton, setActiveButton}) => {

    const IsFromEvent= async ()=>{
        if (IdEvents.size !== 0){
            ChosenElement.clear();
            IdRow.clear();
            placeEvent.place="educators";
            setIsLoading(false);
            await postInformationFromEvents(placeEvent.place, IdEvents, 10, 0, getTeachersCallback)
        }
    }

    useEffect(()=>{
        IsFromEvent();
    },[])

    const [isLoading, setIsLoading]=useState(true);

    const [informationAboutTeachers, setInformationAboutTeachers] = useState({
        id: undefined,
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
        console.log('http://05c8-217-197-0-75.ap.ngrok.io/educators/search/?' + params);
        axios.get('http://05c8-217-197-0-75.ap.ngrok.io/educators/search/?' + params)
            .then(response => {
                callback(response.data.educators, response.data.countRecords);
            })
            .catch(error => {
                alert(error.toString());
                document.getElementById("search").removeAttribute("disabled");//Включение кнопки
                setIsLoading(true);
            });
    }

    // what should we do with lest of teachers received from server
    const getTeachersCallback = (teachers, countRecords) => {
        //console.log(teachers);
        //alert(`${teachers.length} teachers was found! Look at list of teachers in console log`);
        setInformationAboutTeachers(teachers);
        setTotalTeachers (countRecords);
        setActiveTable(true);
        setIsLoading(true);
        document.getElementById("search").removeAttribute("disabled");//Включение кнопки
    }

    // receive list of audiences from server on search button click
    const onSearchClick = async (e) => {
        setActiveTable(false);
        setCurrentPage(1);
        e.preventDefault();

        await ChosenElement.clear();
        await IdRow.clear();
        await IdEvents.clear();
        DataDate.startDate = undefined;
        DataDate.endDate = undefined;
        //console.log(ChosenElement);

        let faculty = document.getElementById("faculty").value;
        let fio = document.getElementById("fio").value;
        let position = document.getElementById("position").value;
        let degree = document.getElementById("degree").value;

        document.getElementById("search").setAttribute("disabled","disabled");//Дисейбл кнопки
        setIsLoading(false);

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
            <div className="row">
                <div className="col-3 mt-3">

                    {/* <div style={{marginTop: 15}} className="mb-3">
                        <button className={activeButton ? "roundB active" : "roundB"}
                                onClick={() => setActiveButton(true)}
                        />
                        <label>Поиск</label>

                        <button style={{marginLeft: 20}} className={!activeButton ? "roundB active" : "roundB"}
                                onClick={() => setActiveButton(false)}
                        />
                        <label>Фильтр</label>
                    </div>*/}

                    <form>
                        <div className="mb-3">
                            <label  className="form-label">Факультет</label>
                            <input type="text" className="form-control" id="faculty"
                                   placeholder="Факультет прикладной математики-процессов управления"
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
                            <label  className="form-label">Договор</label>
                            <input type="text" className="form-control" id="degree"
                                   placeholder="Постоянная основа"
                            />
                        </div>

                        <div className="mb-3">
                            <button onClick={onSearchClick} id="search">Поиск</button>
                        </div>

                    </form>
                </div>
                {isLoading
                    ?
                    <TeachersTable
                        teachers={informationAboutTeachers}
                        setTeachers={setInformationAboutTeachers}
                        totalTeachers={totalTeachers}
                        paramsSearch={paramsSearch}
                        activeTable={activeTable}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    :
                    <div className="col-6" style={{marginTop: 100}}>
                        <Loader/>
                    </div>
                }
            </div>
        </div>
    );
};

export default TeacherFormPanel;