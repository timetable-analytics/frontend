import React from 'react';
import axios from "axios"
import {ChosenElement} from "../../../Constant/Set";


const AudienceFormPanel = ({activeButton,setActiveButton, setInfoAboutAudiences, setInfoAboutTotalPages, setParams}) => {

        // get audiences from server with possible params building, type, number
        const getAudiences = (building, type, number, callback) => {
          let params = (building !== undefined ? `building=${building}&` : "") +
                   (type !== undefined ? `type=${type}&` : "") +
                   (number !== undefined ? `number=${number}&` : "")+
                   (`limit=${10}&`)+
                   ("page=0");
          console.log('http://127.0.0.1:5000/audiences/all/?' + params);
          axios.get('http://127.0.0.1:5000/audiences/all/?' + params)
            .then(response => {
                callback(response.data.audiences, response.data.countRecords);
                document.getElementById("search").removeAttribute("disabled");//Включение кнопки
            })
            .catch(error => {
              alert(error.toString());
            });
        }

        // what should we do with lest of audiences received from server
        const getAudiencesCallback = (audiences, countRecords) => {
          //console.log(audiences);
          alert(`${audiences.length} audiences was found! Look at list of audiences in console log`);
          setInfoAboutAudiences (audiences);
          setInfoAboutTotalPages (countRecords);
        }

        // receive list of audiences from server on search button click
          const onSearchClick = async (e) => {
          e.preventDefault();
          await ChosenElement.clear();
          console.log(ChosenElement);
          let building = document.getElementById("building").value;
          let type = document.getElementById("type").value;
          let number = document.getElementById("number").value;
          document.getElementById("search").getAttribute("disabled");//Дисейбл кнопки
          getAudiences(building !== "" ? building : undefined,
                       type !== "" ? type : undefined,
                       number !== "" ? number : undefined,
                       getAudiencesCallback);
            setParams({building: building !== "" ? building : undefined,
                      type: type !== "" ? type : undefined,
                      number: number !=="" ? number:undefined
            })

        }

        return (
            <div className="col-3 order-1">
                <form>
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

                </form>
            </div>

        );
};

export default AudienceFormPanel;
