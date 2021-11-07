import React, {useState} from 'react';
import {DataDate, IdRow, placeEvent} from "../Constants/ChosenElement";
import axios from "axios";
import EventTable from "../component/UI/MyTable/EventTable";

const EventPage = () =>{

    const [informationAboutEvents, setInformationAboutEvents] = useState({
        id: undefined,
        building: undefined,
        fio: undefined,
        name: undefined,
        stGroups: undefined,
        time: undefined
    })

    const [paramsSearch, setParamsSearch] = useState({
        building: undefined,
        fio: undefined,
        name: undefined,
        stGroups: undefined,
        time: undefined
    })

    const [totalEvents, setTotalEvents] = useState( undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTable, setActiveTable] = useState(false);

    const postEvent = (place, startData, endData, IdArray, callback)=>{
        let bodyFormData = new FormData();
        bodyFormData.append("place", place);
        bodyFormData.append("startData", startData);
        bodyFormData.append("endData",endData);
        bodyFormData.append("id", IdArray);
        axios({
            method: "post",
            url: "http://127.0.0.1:5000",
            data: bodyFormData
        }).then(response => {
            callback(response.data.events, response.data.countRecords);
        }).catch(error => {
                alert(error.toString());
            });
    }

    const postEventCallback = (events, countRecords) =>{
        setInformationAboutEvents(events);
        setTotalEvents (countRecords);
        setActiveTable(true);
    }

    return (
        <div>
            <button onClick={()=>postEvent(placeEvent.place,DataDate.startDate, DataDate.endDate, IdRow, postEventCallback)}>
                Запрос
                {placeEvent.place}
            </button>

            <div className="container">

                <div className="row gx-5">

                    <div className="col-2">
                        <div className="mb-3 d-grid gap-2">
                            <button type="button" className="btn btn-outline-dark" id="audiences">Аудитории</button>
                        </div>
                        <div className="mb-3 d-grid gap-2">
                            <button type="button" className="btn btn-outline-dark" id="educators" >Преподаватели</button>
                        </div>
                        <div className="mb-3 d-grid gap-2">
                            <button type="button" className="btn btn-outline-dark" id="stGroups" >Учебные группы</button>
                        </div>
                        <div className="mb-3 d-grid gap-2">
                            <button type="button" className="btn btn-outline-dark" id="disciplines">Дисциплины</button>
                        </div>
                    </div>
                    <EventTable
                        events={informationAboutEvents}
                        setEvents={setInformationAboutEvents}
                        totalEvents={totalEvents}
                        activeTable={activeTable}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                </div>

                <div className="col-2" style={{marginTop: 50}}>
                    <select className="form-select mb-3" style={{borderColor: "black"}}>
                        <option selected>Выберите параметр</option>
                        <option value="1">Здание</option>
                        <option value="2">Аудитории</option>
                        <option value="3">Факультет</option>
                        <option value="4">ФИО преподавателя</option>
                        <option value="5">Предмет</option>
                        <option value="6">Учебные группы</option>
                    </select>

                    <select className="form-select mb-3" style={{borderColor: "black"}}>
                        <option selected>Выберите временной промежуток</option>
                        <option value="1">День</option>
                        <option value="2">Месяц</option>
                        <option value="3">Семестр</option>
                        <option value="4">Год</option>
                    </select>

                    <div className="mb-3 d-grid gap-2">
                        <button type="button" className="btn btn-outline-dark" id="graph">Показать график</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPage;