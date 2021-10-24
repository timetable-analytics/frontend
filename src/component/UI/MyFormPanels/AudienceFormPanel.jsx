import React, {useState} from 'react';


const AudienceFormPanel = ({activeButton,setActiveButton, setInfoAboutAudiences}) => {

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
                                                <button onClick={addInfo}>Поиск</button>
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