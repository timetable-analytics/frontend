import React, {useState} from 'react';

const TeacherFormPanel = ({activeButton, setActiveButton, setInformationAboutTeacher}) => {

    const [Information, setInformation] = useState({
        faculty:"",
        FIO:"",
        position: "",
        degree: ""
    })
    const addInfo = (e) => {
        e.preventDefault()
        setInformationAboutTeacher(Information);
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
                            <label  className="form-label">Ф.И.О.</label>
                            <input type="text" className="form-control" id="FIO"
                                   placeholder="Иванов Иван Иванович"
                                   onChange={e =>setInformation({...Information, FIO: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Должность</label>
                            <input type="text" className="form-control" id="position"
                                   placeholder="доцент"
                                   onChange={ e =>setInformation({...Information, position: e.target.value})}
                            />
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Должность</label>
                            <input type="text" className="form-control" id="degree"
                                   placeholder="кандидат наук"
                                   onChange={ e =>setInformation({...Information, degree: e.target.value})}
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

export default TeacherFormPanel;