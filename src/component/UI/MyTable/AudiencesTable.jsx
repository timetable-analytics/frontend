import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import {ChosenElement} from "../../../Constant/Set";

const AudiencesTable = ({audiences, setAudiences, totalAudiences, paramsSearch}) => {

    const [activeTable, setActiveTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitTable, setLimitTable] = useState(10)

    async function changePage (page){
        setCurrentPage(page)
        console.log(currentPage)
        await getAudiences(paramsSearch,limitTable,(page-1), getAudiencesCallback);
    }

    const getAudiences = (paramsSearch,limit, page, callback) => {
        let params = (paramsSearch.building !== undefined ? `building=${paramsSearch.building}&` : "") +
            (paramsSearch.type !== undefined ? `type=${paramsSearch.type}&` : "") +
            (paramsSearch.number !== undefined ? `number=${paramsSearch.number}&` : "")+
            (`limit=${limitTable}&`)+
            (`page=${page}`);
        console.log('http://127.0.0.1:5000/audiences/all/?' + params);
        axios.get('http://127.0.0.1:5000/audiences/all/?' + params)
            .then(response => {
                callback(response.data.audiences);
            })
            .catch(error => {
                alert(error.toString());
            });
    }

    const getAudiencesCallback = (audiences) => {
        //console.log(audiences);
        //alert(`${audiences.length} audiences was found! Look at list of audiences in console log`);
        setAudiences (audiences);
    }

    useEffect( ()=>{
        if (audiences !== undefined && audiences.length > 0 ){
            setActiveTable(true)
        }else {
            setActiveTable(false)
    }} );


 return (
     activeTable
     ?
     <div className="col-8 order-2 gy-5">
         <table className="table table-striped table-bordered">
             <thead>
             <tr>
                 <th scope="col">№</th>
                 <th scope="col">Здание</th>
                 <th scope="col">Тип аудитории</th>
                 <th scope="col">Номер</th>
             </tr>
             </thead>
             <tbody>
             {audiences.map((item,index) =>(
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
                     <td>{item.building}</td>
                     <td>{item.type}</td>
                     <td>{item.number}</td>
                 </tr>
             ))}
             </tbody>
         </table>
         <Pagination
            totalPages={Math.ceil(totalAudiences/limitTable)}
            page={currentPage}
            changePage={changePage}
         />
     </div>
         :
         <div>
         </div>
 );
};

export default AudiencesTable;



