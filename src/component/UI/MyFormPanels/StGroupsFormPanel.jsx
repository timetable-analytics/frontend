import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ChosenElement, DataDate, IdEvents, IdRow, placeEvent} from "../../../Constants/ChosenElement";
import StGroupsTable from "../MyTable/StGroupsTable";
import Loader from "../Loader/Loader";
import {postInformationFromEvents} from "../../../API/postInformation";

const StGroupsFormPanel = ({activeButton, setActiveButton}) => {

    const IsFromEvent = async () =>{
        if (IdEvents.size !== 0){
            ChosenElement.clear();
            IdRow.clear();
            placeEvent.place="groups";
            setIsLoading(false);
            await postInformationFromEvents(placeEvent.place, IdEvents, 10, 0, getStGroupsCallback)
        }
    }

    useEffect(()=>{
        IsFromEvent();
    },[])


    const [isLoading, setIsLoading]=useState(true);

    const [informationAboutStGroups, setInformationAboutStGroups] = useState({
        id: undefined,
        faculty: undefined,
        name: undefined,
        course: undefined
    })
    const [paramsSearch, setParamsSearch] = useState({
        faculty: undefined,
        name: undefined,
        course: undefined
    })
    //program: undefined,

    const [totalStGroups, setTotalStGroups] = useState( undefined);
    const [activeTable, setActiveTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // get stGroups from server with possible params faculty, program, name, course
    const getStGroups = (faculty, name, course, callback) => {
        let params = (faculty !== undefined ? `faculty=${faculty}&` : "") +
            (name !== undefined ? `name=${name}&` : "")+
            (course !== undefined ? `course=${course}&` : "")+
            (`limit=${10}&`)+
            ("page=0");

        //(program !== undefined ? `program=${program}&` : "") +

        console.log('http://1042-217-197-0-75.ngrok.io/groups/search/?' + params);
        axios.get('http://1042-217-197-0-75.ngrok.io/groups/search/?' + params)
            .then(response => {
                callback(response.data.groups, response.data.countRecords);
            })
            .catch(error => {
                alert(error.toString());
                document.getElementById("search").removeAttribute("disabled");//?????????????????? ????????????
                setIsLoading(true);
            });
    }

    // what should we do with lest of teachers received from server
    const getStGroupsCallback = (stGroups, countRecords) => {
        //console.log(stGroups);
        //alert(`${stGroups.length} teachers was found! Look at list of teachers in console log`);
        setInformationAboutStGroups(stGroups);
        setTotalStGroups (countRecords);
        setActiveTable(true);
        setIsLoading(true);
        document.getElementById("search").removeAttribute("disabled");//?????????????????? ????????????
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
        //let program = document.getElementById("program").value;
        let name = document.getElementById("name").value;
        let course = document.getElementById("course").value;

        document.getElementById("search").setAttribute("disabled","disabled");//?????????????? ????????????
        setIsLoading(false);

        //program !== "" ? program : undefined,

        getStGroups(faculty !== "" ? faculty : undefined,
            name !== "" ? name : undefined,
            course !== "" ? course : undefined,
            getStGroupsCallback);

        //program: program !== "" ? program : undefined,
        setParamsSearch({
            faculty: faculty !== "" ? faculty : undefined,
            name: name !=="" ? name :undefined,
            course: course !=="" ? course :undefined
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
                        <label>??????????</label>

                        <button style={{marginLeft: 20}} className={!activeButton ? "roundB active" : "roundB"}
                                onClick={() => setActiveButton(false)}
                        />
                        <label>????????????</label>
                    </div>*/}
                    
                    <form>
                        <div className="mb-3">
                            <label  className="form-label">??????????????????</label>
                            <input type="text" className="form-control" id="faculty"
                                   placeholder="????-????"
                            />
                        </div>
                        {/*<div className="mb-3">
                            <label  className="form-label">?????????????????? ????????????????</label>
                            <input type="text" className="form-control" id="program"
                                   placeholder="???????????????????????????????? ?? ???????????????????????????? ????????????????????"
                            />
                        </div>*/}
                        <div className="mb-3">
                            <label  className="form-label">?????????? ????????????</label>
                            <input type="text" className="form-control" id="name"
                                   placeholder="21.??01-????"
                            />
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">????????</label>
                            <input type="text" className="form-control" id="course"
                                   placeholder="1"
                            />
                        </div>

                        <div className="mb-3">
                            <button onClick={onSearchClick} id="search">??????????</button>
                        </div>
                    </form>

                </div>
                {isLoading
                    ?
                    <StGroupsTable
                        stGroups={informationAboutStGroups}
                        setStGroups={setInformationAboutStGroups}
                        totalStGroups={totalStGroups}
                        activeTable={activeTable}
                        paramsSearch={paramsSearch}
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

export default StGroupsFormPanel;