import React, {useState} from 'react';

const DisciplinesFormPanel = ({activeButton, setActiveButton, setInfoAboutDisciplines}) => {

    const [Information, setInformation] = useState({
        name:""
    })

    const addInfo = (e) => {
        e.preventDefault()
        setInfoAboutDisciplines(Information);
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
                            <label  className="form-label">Название дисциплины</label>
                            <input type="text" className="form-control" id="name"
                                   placeholder="Алгебра"
                                   onChange={e => setInformation({...Information, name: e.target.value}) }
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

export default DisciplinesFormPanel;