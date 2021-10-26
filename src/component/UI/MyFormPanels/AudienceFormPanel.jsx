import React, {useState} from 'react';
import axios from "axios"


const AudienceFormPanel = ({activeButton,setActiveButton, setInfoAboutAudiences}) => {

        // get audiences from server with possible params building, type, number
        const getAudiences = (building, type, number, callback) => {
          let params = (building !== undefined ? `building=${building}&` : "") +
                   (type !== undefined ? `type=${type}&` : "") +
                   (number !== undefined ? `number=${number}` : "");
          console.log('http://127.0.0.1:5000/audiences/all/?' + params);
          axios.get('http://127.0.0.1:5000/audiences/all/?' + params)
            .then(response => {
              callback(response.data.audiences);
            })
            .catch(error => {
              alert(error.toString());
            })
        }

        // what should we do with lest of audiences received from server
        const getAudiencesCallback = (audiences) => {
          console.log(audiences);
          alert(`${audiences.length} audiences was found! Look at list of audiences in console log`);
        }

        // receive list of audiences from server on search button click
        const onSearchClick = (e) => {
          e.preventDefault();
          let building = document.getElementById("building").value;
          let type = document.getElementById("typeAudience").value;
          let number = document.getElementById("number").value;
          getAudiences(building !== "" ? building : undefined,
                       type !== "" ? type : undefined,
                       number !== "" ? number : undefined,
                       getAudiencesCallback);

        }

        const [Information, setInformation] = useState({
                building:"",
                typeAudience:"",
                number: ""
        })

        const addInfo = (e) => {
                e.preventDefault()
                setInfoAboutAudiences(Information);
        }

        return (
        <div className="container">
                <div className="row">
                        <div className="col-3">
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
                                                       onChange={e => setInformation({...Information, building: e.target.value}) }
                                                />
                                        </div>
                                        <div className="mb-3">
                                                <label  className="form-label">Тип аудитории</label>
                                                <input type="text" className="form-control" id="typeAudience"
                                                       placeholder="Обычный класс"
                                                       onChange={e =>setInformation({...Information,typeAudience: e.target.value})}
                                                />
                                        </div>
                                        <div className="mb-3">
                                                <label  className="form-label">Номер аудитории</label>
                                                <input type="text" className="form-control" id="number"
                                                       placeholder="100"
                                                        onChange={ e =>setInformation({...Information,number: e.target.value})}
                                                />
                                        </div>
                                        <div className="mb-3">
                                                <button onClick={onSearchClick}>Поиск</button>
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
                </div>

        </div>
        );
};

export default AudienceFormPanel;
