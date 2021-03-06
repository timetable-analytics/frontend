import React, {useEffect, useState} from 'react';
import {ChosenElement, DataDate, IdEvents, IdRow, placeEvent} from "../Constants/ChosenElement";
import axios from "axios";
import EventTable from "../component/UI/MyTable/EventTable";
import {postChart} from "../API/postInformation";
import LineChart from "../component/UI/Chart/LineChart";
import Loader from "../component/UI/Loader/Loader";
import {useHistory} from "react-router-dom";
import {GenerationDataForGraph} from "../component/UI/Chart/FunctionsForChart";

const EventPage = () =>{

    const router = useHistory();

    const [isLoading,setIsLoading]=useState(true);

    const [informationAboutEvents, setInformationAboutEvents] = useState({
        id: undefined,
        building: undefined,
        fio: undefined,
        name: undefined,
        stGroups: undefined,
        time: undefined
    })

    useEffect(()=>{
        postEvent(placeEvent.place, DataDate.startDate, DataDate.endDate, IdRow, postEventCallback);
        setIsLoading(false);
    }, [])

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
    const [labels, setLabels] = useState([]);
    const [datasets, setDatasets] = useState({
        label: undefined,
        data: []
    })

 /*
   const [labels,setLabels]=useState([1,2,3,4]);
   const[datasets, setDatasets] = useState([
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
            url: 'http://1042-217-197-0-75.ngrok.io/timetable/search/?'+`limit=10&`+ `page=0`,
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

        document.getElementById("graph").setAttribute("disabled","disabled");//?????????????? ????????????
        setIsLoading(false);

        await postChart(IdEvents,param,date,postGraphCallback, postGraphErrorCallback);
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
                                        setActiveGraph(false);
                                    }}>
                                ???????????????? ??????????????
                            </button>
                        </div>

                        <div className="mb-3 d-grid gap-2">
                            <button type="button" className="btn btn-outline-dark" id="audiences"
                                    onClick={()=>{placeEvent.place="audiences"; router.push("/main/audiences")}}
                            >
                                ??????????????????
                            </button>
                        </div>
                        <div className="mb-3 d-grid gap-2">
                            <button type="button" className="btn btn-outline-dark" id="educators"
                                    onClick={()=>{placeEvent.place="educators"; router.push("/main/teachers")}}
                            >
                                ??????????????????????????
                            </button>
                        </div>
                        <div className="mb-3 d-grid gap-2">
                            <button type="button" className="btn btn-outline-dark" id="stGroups"
                                    onClick={()=>{placeEvent.place="groups"; router.push("/main/student_groups")}}
                            >
                                ?????????????? ????????????
                            </button>
                        </div>
                        <div className="mb-3 d-grid gap-2">
                            <button type="button" className="btn btn-outline-dark" id="disciplines"
                                    onClick={()=>{placeEvent.place="disciplines"; router.push("/main/disciplines")}}
                            >
                                ????????????????????
                            </button>
                        </div>
                        <div  style={{marginTop: 50}}>
                            <select className="form-select mb-3" style={{borderColor: "black"}} id="select_param">
                                <option selected value={undefined} >???????????????? ????????????????</option>
                                <option value="building">????????????</option>
                                <option value="audience">??????????????????</option>
                                <option value="fio">?????? ??????????????????????????</option>
                                <option value="discipline">??????????????</option>
                                <option value="group">?????????????? ????????????</option>
                            </select>

                            <select className="form-select mb-3" style={{borderColor: "black"}} id="select_date">
                                <option selected value={undefined}>???????????????? ?????????????????? ????????????????????</option>
                                <option value="day">????????</option>
                                <option value="month">??????????</option>
                                <option value="semester">??????????????</option>
                                <option value="year">??????</option>
                            </select>

                            <div className="mb-3 d-grid gap-2">
                                <button type="button"
                                        className="btn btn-outline-dark"
                                        id="graph"
                                        onClick={onGraphClick}
                                >
                                    ???????????????? ????????????
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