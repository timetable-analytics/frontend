import React, {useState} from 'react';

const StGroupsFormPanel = ({activeButton, setActiveButton, setInfoAboutStGroups}) => {

    const [Information, setInformation] = useState({
        faculty:"",
        program:"",
        number: "",
        course: ""
    })

    const addInfo = (e) => {
        e.preventDefault()
        setInfoAboutStGroups(Information);
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
                            <label  className="form-label">Факультет</label>
                            <input type="text" className="form-control" id="faculty"
                                   placeholder="ПМ-ПУ"
                                   onChange={e => setInformation({...Information, faculty: e.target.value}) }
                            />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Программа обучения</label>
                            <input type="text" className="form-control" id="program"
                                   placeholder="Программирование и информационные технологии"
                                   onChange={e =>setInformation({...Information,program: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Номер группы</label>
                            <input type="text" className="form-control" id="number"
                                   placeholder="21.Б01-пу"
                                   onChange={ e =>setInformation({...Information, number: e.target.value})}
                            />
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Курс</label>
                            <input type="text" className="form-control" id="course"
                                   placeholder="1"
                                   onChange={ e =>setInformation({...Information, course: e.target.value})}
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

export default StGroupsFormPanel;