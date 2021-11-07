import React, {useState} from 'react';
import {ChosenElement} from "../../../Constants/ChosenElement";
import Pagination from "../Pagination/Pagination";

const EventTable = ({events, setEvents, totalEvents, activeTable, currentPage, setCurrentPage}) => {

    const [limitTable, setLimitTable] = useState(10)

    async function changePage (page){
        setCurrentPage(page)
        //console.log(currentPage)
       // await getEvents(paramsSearch,limitTable,(page-1), getEventsCallback);
    }

    return (
        activeTable
            ?
            <div className="col-8 order-2 gy-5">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Здание/аудитория</th>
                        <th scope="col">Ф.И.О. преподавателя</th>
                        <th scope="col">Предмет</th>
                        <th scope="col">Группа</th>
                        <th scope="col">Временной промежуток</th>
                    </tr>
                    </thead>
                    <tbody>
                    {events.map((item,index) =>(
                        <tr key = {index+(currentPage-1)*limitTable}
                            className={ (ChosenElement.has(index+(currentPage-1)*limitTable))?
                                "table-success" : "table-default"
                            }
                            onClick={e => {
                                if (!ChosenElement.has(index+(currentPage-1)*limitTable)) {
                                    e.target.parentNode.classList.add("table-success");
                                    ChosenElement.add(index+(currentPage-1)*limitTable);
                                    //console.log(ChosenElement)
                                } else{
                                    e.target.parentNode.classList.remove("table-success");
                                    ChosenElement.delete(index+(currentPage-1)*limitTable);
                                    //console.log(ChosenElement)
                                }
                            }}
                        >
                            <td>{index+1+(currentPage-1)*limitTable}</td>
                            <td>{item.building}</td>
                            <td>{item.fio}</td>
                            <td>{item.name}</td>
                            <td>{item.stGroups}</td>
                            <td>{item.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    totalPages={Math.ceil(totalEvents/limitTable)}
                    page={currentPage}
                    changePage={changePage}
                />
            </div>
            :
            <div/>
    );
};

export default EventTable;