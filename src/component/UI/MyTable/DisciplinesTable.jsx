import React, {useState} from 'react';
import {ChosenElement} from "../../../Constants/ChosenElement";
import Pagination from "../Pagination/Pagination";
import {getDisciplines} from "../../../API/getInformation";

const DisciplinesTable = ({disciplines, setDisciplines, totalDisciplines, paramsSearch, activeTable, currentPage, setCurrentPage}) => {

    const [limitTable, setLimitTable] = useState(10)

    async function changePage (page){
        setCurrentPage(page)
        //console.log(currentPage)
        await getDisciplines(paramsSearch,limitTable,(page-1), getDisciplinesCallback);
    }

    // what should we do with lest of teachers received from server
    const getDisciplinesCallback = (disciplines) => {
        //console.log(disciplines);
        //alert(`${disciplines.length} teachers was found! Look at list of teachers in console log`);
        setDisciplines(disciplines);
    }

    return (
        activeTable
            ?
            <div className="col-8 order-2 gy-5">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Название дисциплины</th>
                    </tr>
                    </thead>
                    <tbody>
                    {disciplines.map((item,index) =>(
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
                            <td>{item.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    totalPages={Math.ceil(totalDisciplines/limitTable)}
                    page={currentPage}
                    changePage={changePage}
                />
            </div>
            :
            <div/>
    );
};

export default DisciplinesTable;