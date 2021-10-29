import React, {useState} from 'react';
import {ChosenElement} from "../../../Constants/ChosenElement";
import Pagination from "../Pagination/Pagination";
import {getTeachers} from "../../../API/getInformation";

const TeachersTable = ({teachers, setTeachers, totalTeachers, paramsSearch, activeTable, currentPage, setCurrentPage}) => {

    const [limitTable, setLimitTable] = useState(10)

    async function changePage (page){
        setCurrentPage(page)
        //console.log(currentPage)
        await getTeachers(paramsSearch,limitTable,(page-1), getTeachersCallback);
    }

    // what should we do with lest of teachers received from server
    const getTeachersCallback = (teachers) => {
        //console.log(teachers);
        //alert(`${teachers.length} teachers was found! Look at list of teachers in console log`);
        setTeachers(teachers);
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
                                    console.log(ChosenElement)
                                } else{
                                    e.target.parentNode.classList.remove("table-success");
                                    ChosenElement.delete(index+(currentPage-1)*limitTable);
                                    console.log(ChosenElement)
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
            </div>
            :
            <div/>
    );
};

export default TeachersTable;