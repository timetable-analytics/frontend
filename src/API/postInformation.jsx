import axios from "axios";

export const postEvent = async (place, startData, endData, IdArray, limit, page, callback)=>{
    let bodyFormData = new FormData();
    let IdMassif = Array.from(IdArray);

    bodyFormData.append("place", place);
    bodyFormData.append("startData", startData);
    bodyFormData.append("endData",endData);
    bodyFormData.append("id", IdMassif);
    console.log('http://1042-217-197-0-75.ngrok.io/timetable/search/?'+`limit=${limit}&`+ `page=${page}`);
    await axios({
        method: "post",
        url: 'http://1042-217-197-0-75.ngrok.io/timetable/search/?'+`limit=${limit}&`+ `page=${page}`,
        data: bodyFormData
    }).then(response => {
        callback(response.data.timetables);
    }).catch(error => {
        alert(error.toString());
    });
}

export const postInformationFromEvents = async (place, IdArray, limit, page, callback)=>{
    let IdMassif = Array.from(IdArray);
    let bodyFormData = new FormData();
    bodyFormData.append("id", IdMassif)

    await axios({
        method: "post",
        url: `http://1042-217-197-0-75.ngrok.io/${place}/search_from_timetable/?`+`limit=${limit}&`+ `page=${page}`,
        data: bodyFormData
    }).then(response => {
        callback(response.data.dataset, response.data.countRecords);
    }).catch(error => {
        alert(error.toString());
    });
}


export const postChart = async (IdArray, param, date, callback, errorCallback)=>{
    let bodyFormData = new FormData();
    let IdMassif = Array.from(IdArray);

    bodyFormData.append("id", IdMassif);
    bodyFormData.append("param", param);
    bodyFormData.append("date", date);

    await axios({
        method: "post",
        url: 'http://1042-217-197-0-75.ngrok.io/timetable/graph/',
        data: bodyFormData
    }).then(response => {
        callback(response.data.labels, response.data.datasets);
    }).catch(error => {
        errorCallback(error);
    });
}