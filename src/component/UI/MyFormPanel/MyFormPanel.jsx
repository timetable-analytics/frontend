import React from 'react';

const MyFormPanel = () => {


    return (
        /*<button>Поиск</button>
        <button>Фильтр</button>
        <h3>Здание</h3>
        <input/>
        <h3>Тип аудитории</h3>
        <input/>
        <h3>Номер</h3>
        <input/>
        <button>Поиск</button>
        <h3>Временной промежуток</h3>
        <h3>Начало</h3>
        <input/>
        <h3>Конец</h3>
        <input/>
        <button>Показать занятость</button>
        <button></button>*/

        <div className="container">
                <div className="row">
                        <div className="col-3">
                                <form>
                                        <div className="mb-3">
                                                <button>Поиск</button>
                                                <button>Фильтр</button>
                                        </div>
                                        <div className="mb-3">
                                                <label  className="form-label">Email address</label>
                                                <input type="email" className="form-control" id="exampleFormControlInput1"
                                                placeholder="name@example.com"/>
                                        </div>
                                        <div className="mb-3">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                </form>
                        </div>
                </div>

        </div>
        );
};

export default MyFormPanel;