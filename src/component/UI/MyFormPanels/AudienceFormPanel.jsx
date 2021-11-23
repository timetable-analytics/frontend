import React, {useEffect, useState} from 'react';
import axios from "axios"
import {ChosenElement, DataDate, IdEvents, IdRow, placeEvent} from "../../../Constants/ChosenElement";
import AudiencesTable from "../MyTable/AudiencesTable";
import Loader from "../Loader/Loader";
import {postInformationFromEvents} from "../../../API/postInformation";


const AudienceFormPanel = ({activeButton,setActiveButton}) => {

    const IsFromEvent=()=>{
        if (IdEvents.size !== 0){
            ChosenElement.clear();
            IdRow.clear();
            setIsLoading(false);
            postInformationFromEvents(placeEvent.place, IdEvents, 0, 0, getAudiencesCallback)
        }
    }
    useEffect(()=>{
        IsFromEvent();
    },[])

    const [isLoading, setIsLoading]=useState(true);//false-значит отображает иконку загрузки

    const [InformationAboutAudiences, setInformationAboutAudiences] = useState({
        id: undefined,
        building: undefined,
        type: undefined,
        number: undefined
    })
    const [paramsSearch, setParamsSearch] = useState({
        building: undefined,
        type: undefined,
        number: undefined
    })
    const [totalAudiences, setTotalAudiences] = useState( undefined);
    const [activeTable, setActiveTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    // get audiences from server with possible params building, type, number
    const getAudiences = (building, type, number, callback) => {
        let params = (building !== undefined ? `building=${building}&` : "") +
            (type !== undefined ? `type=${type}&` : "") +
            (number !== undefined ? `number=${number}&` : "")+
            (`limit=${10}&`)+
            ("page=0");
        console.log('http://127.0.0.1:5000/audiences/search/?' + params);
        axios.get('http://127.0.0.1:5000/audiences/search/?' + params)
            .then(response => {
                callback(response.data.audiences, response.data.countRecords);
            })
            .catch(error => {
                alert(error.toString());
                document.getElementById("search").removeAttribute("disabled");//Включение кнопки
                setIsLoading(true);
            });
    }

    // what should we do with lest of audiences received from server
    const getAudiencesCallback = (audiences, countRecords) => {
        //console.log(audiences);
        //alert(`${audiences.length} audiences was found! Look at list of audiences in console log`);
        setInformationAboutAudiences (audiences);
        setTotalAudiences (countRecords);
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
        DataDate.startDate = undefined;
        DataDate.endDate = undefined;
        //console.log(ChosenElement);

        let building = document.getElementById("building").value;
        let type = document.getElementById("type").value;
        let number = document.getElementById("number").value;

        document.getElementById("search").setAttribute("disabled","disabled");//Дисейбл кнопки
        setIsLoading(false);

        getAudiences(building !== "" ? building : undefined,
            type !== "" ? type : undefined,
            number !== "" ? number : undefined,
            getAudiencesCallback);
        setParamsSearch({building: building !== "" ? building : undefined,
            type: type !== "" ? type : undefined,
            number: number !=="" ? number:undefined
        })

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-3 ">

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
                            <label  className="form-label">Здание</label>
                            <input type="text" className="form-control" id="building"
                                   placeholder="Университетская наб., 7"
                            />
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Тип аудитории</label>
                            <input type="text" className="form-control" id="type"
                                   placeholder="Обычный класс"
                            />
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Номер аудитории</label>
                            <input type="text" className="form-control" id="number"
                                   placeholder="100"
                            />
                        </div>

                        <div className="mb-3">
                            <button onClick={onSearchClick} id="search">Поиск</button>
                        </div>
                    </form>
                </div>
                {isLoading
                    ?
                    <AudiencesTable
                        audiences={InformationAboutAudiences}
                        setAudiences={setInformationAboutAudiences}
                        totalAudiences={totalAudiences}
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

export default AudienceFormPanel;
