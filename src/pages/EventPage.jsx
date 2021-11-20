import React, {useState} from 'react';
import {ChosenElement, DataDate, IdEvents, IdRow, placeEvent} from "../Constants/ChosenElement";
import axios from "axios";
import EventTable from "../component/UI/MyTable/EventTable";
import {postChart} from "../API/postInformation";
import LineChart from "../component/UI/Chart/LineChart";
import Loader from "../component/UI/Loader/Loader";

const EventPage = () =>{

    const [isLoading,setIsLoading]=useState(true);

    const [informationAboutEvents, setInformationAboutEvents] = useState({
        id: undefined,
        building: undefined,
        fio: undefined,
        name: undefined,
        stGroups: undefined,
        time: undefined
    })

    /*const [paramsSearch, setParamsSearch] = useState({
        building: undefined,
        fio: undefined,
        name: undefined,
        stGroups: undefined,
        time: undefined
    })*/

    const [totalEvents, setTotalEvents] = useState( undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTable, setActiveTable] = useState(false);

    const [activeGraph, setActiveGraph] = useState(false);
    const [labels, setLabels] = useState([1,2,3,4]);
    const [datasets, setDatasets] = useState({
        label: undefined,
        data: []
    })
 /*   const[datasets, setDatasets] = useState([
        {
            label: "First",
            data: [10,20,30,40]
        },
        {
            label: "Second",
            data: [5,15,31,14]
        },
        {
            label: "Third",
            data: [3,11,20,16]
        },
        {
            label: "Fourth",
            data: [20,5,6,32]
        },
        {
            label: "Fiveth",
            data: [30,26,20,32]
        }
    ])*/

    const postEvent = async (place, startData, endData, IdArray, callback)=>{

        IdEvents.clear();
        ChosenElement.clear();

        let bodyFormData = new FormData();
        let IdMassif = Array.from(IdArray);

        bodyFormData.append("place", place);
        bodyFormData.append("startData", startData);
        bodyFormData.append("endData",endData);
        bodyFormData.append("id", IdMassif);

        await axios({
            method: "post",
            url: 'http://127.0.0.1:5000/timetable/search/?'+`limit=10&`+ `page=0`,
            data: bodyFormData
        }).then(response => {
            callback(response.data.timetables, response.data.countRecords);
        }).catch(error => {
                alert(error.toString());
                setIsLoading(true);
            });
    }

    const postEventCallback = (events, countRecords) =>{
        setInformationAboutEvents(events);
        setTotalEvents (countRecords);
        setActiveTable(true);
        setIsLoading(true);
    }

    const onGraphClick = async (e) => {
        e.preventDefault();

        let param = document.getElementById("select_param").value;
        let date = document.getElementById("select_date").value;
        //console.log(param,date);

        document.getElementById("graph").setAttribute("disabled","disabled");//Дисейбл кнопки
        setIsLoading(false);

        await postChart(IdEvents,param,date,postGraphCallback, postGraphErrorCallback);
    }

    function GenerateRandomColor() {
        let r = function () { return Math.floor(Math.random()*256) };
        return "rgb(" + r() + "," + r() + "," + r() + ")";
    }
    function GenerationDataForGraph (datasets){
        let Datasets=[];
        for (let i=0; i<datasets.length;++i){
            let dataset ={
                label: datasets[i].label,
                data: datasets[i].data,
                fill: false,
                borderColor: GenerateRandomColor(),
                tension: 0.1
            }
            Datasets.push(dataset);
        }
        return Datasets;
    }

    const postGraphCallback = async (labels, datasets)=>{
        await setLabels(labels);
        await setDatasets(datasets);
        await setActiveTable(false);
        await setActiveGraph (true);

        document.getElementById("graph").removeAttribute("disabled")
        setIsLoading(true);
    }

    const postGraphErrorCallback =async (error)=>{
        await alert(error.toString());
        document.getElementById("graph").removeAttribute("disabled")
        setIsLoading(true);
    }


    return (
        <div>

            <div className="container">

                <div className="row">

                    <div className="col-2">

                        <div className="mb-3 d-grid gap-2" style={{marginTop: 20}}>
                            <button type="button" className="btn btn-outline-success"
                                    onClick={()=>{
                                        postEvent(placeEvent.place, DataDate.startDate, DataDate.endDate, IdRow, postEventCallback);
                                        setIsLoading(false);
                                    }}>
                                Показать таблицу
                            </button>
                        </div>

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
                        <div  style={{marginTop: 50}}>
                            <select className="form-select mb-3" style={{borderColor: "black"}} id="select_param">
                                <option selected value="undefined" >Выберите параметр</option>
                                <option value="building">Здание</option>
                                <option value="audience">Аудитории</option>
                                <option value="faculty">Факультет</option>
                                <option value="fio">ФИО преподавателя</option>
                                <option value="discipline">Предмет</option>
                                <option value="group">Учебные группы</option>
                            </select>

                            <select className="form-select mb-3" style={{borderColor: "black"}} id="select_date">
                                <option selected value="undefined">Выберите временной промежуток</option>
                                <option value="day">День</option>
                                <option value="month">Месяц</option>
                                <option value="semester">Семестр</option>
                                <option value="year">Год</option>
                            </select>

                            <div className="mb-3 d-grid gap-2">
                                <button type="button"
                                        className="btn btn-outline-dark"
                                        id="graph"
                                        onClick={onGraphClick}
                                >
                                    Показать график
                                </button>
                            </div>

                        </div>
                    </div>
                    {isLoading
                        ?
                        <div className="col-10 order-2 gy-5">
                            <EventTable
                                events={informationAboutEvents}
                                setEvents={setInformationAboutEvents}
                                totalEvents={totalEvents}
                                activeTable={activeTable}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                            <LineChart
                                activeChart={activeGraph}
                                Axis={labels}
                                Labels={GenerationDataForGraph(datasets)}
                            />
                        </div>
                        :
                        <div className="col-7" style={{marginTop: 100}}>
                            <Loader/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default EventPage;