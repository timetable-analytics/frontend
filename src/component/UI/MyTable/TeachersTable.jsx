import React, {useState} from 'react';
import {ChosenElement, DataDate, IdEvents, IdRow, placeEvent} from "../../../Constants/ChosenElement";
import Pagination from "../Pagination/Pagination";
import {getTeachers} from "../../../API/getInformation";
import {useHistory} from "react-router-dom";
import {postInformationFromEvents} from "../../../API/postInformation";

const TeachersTable = ({teachers, setTeachers, totalTeachers, paramsSearch, activeTable, currentPage, setCurrentPage}) => {

    const [limitTable, setLimitTable] = useState(10)

    async function changePage (page){
        setCurrentPage(page)
        //console.log(currentPage)
        if (IdEvents.size!==0){
            await postInformationFromEvents(placeEvent.place,IdEvents,limitTable,(page-1), getTeachersCallback)
        }else
        await getTeachers(paramsSearch,limitTable,(page-1), getTeachersCallback);
    }

    // what should we do with lest of teachers received from server
    const getTeachersCallback = (teachers) => {
        //console.log(teachers);
        //alert(`${teachers.length} teachers was found! Look at list of teachers in console log`);
        setTeachers(teachers);
    }

    const router = useHistory();

    const onEventClick = (e)=>{
        e.preventDefault();
        document.getElementById("event").setAttribute("disabled", "disabled");//Дисейбл кнопки

        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
        DataDate.startDate = startDate;
        DataDate.endDate = endDate;
        placeEvent.place = "educators";
        ChosenElement.clear();
        router.push("/main/event");

        document.getElementById("event").removeAttribute("disabled");//Включение кнопки
    }

    return (
        activeTable
            ?
            <div className="col-8 order-2 gy-5">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Факультет</th>
                        <th scope="col">Ф.И.О.</th>
                        <th scope="col">Должность</th>
                        <th scope="col">Степень</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teachers.map((item,index) =>(
                        <tr key = {index+(currentPage-1)*limitTable}
                            className={ (ChosenElement.has(index+(currentPage-1)*limitTable))?
                                "table-success" : "table-default"
                            }
                            onClick={e => {
                                if (!ChosenElement.has(index+(currentPage-1)*limitTable)) {
                                    e.target.parentNode.classList.add("table-success");
                                    ChosenElement.add(index+(currentPage-1)*limitTable);
                                    //console.log(ChosenElement)
                                    IdRow.add(item.id);
                                    //console.log(IdRow);
                                } else{
                                    e.target.parentNode.classList.remove("table-success");
                                    ChosenElement.delete(index+(currentPage-1)*limitTable);
                                    //console.log(ChosenElement)
                                    IdRow.delete(item.id);
                                   // console.log(IdRow);
                                }
                            }}
                        >
                            <td>{index+1+(currentPage-1)*limitTable}</td>
                            <td>{item.faculty}</td>
                            <td>{item.fio}</td>
                            <td>{item.position}</td>
                            <td>{item.degree}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Pagination
                    totalPages={Math.ceil(totalTeachers/limitTable)}
                    page={currentPage}
                    changePage={changePage}
                />

                <div className="col-3 order-2">
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

                    <div className="mb-3">
                        <button onClick={onEventClick} id="event">Показать занятость</button>
                    </div>
                </div>
            </div>

            :
            <div/>
    );
};

export default TeachersTable;