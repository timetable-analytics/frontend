import axios from "axios";

export const postEvent = (place, startData, endData, IdArray, limit, page, callback)=>{
    let bodyFormData = new FormData();
    bodyFormData.append("place", place);
    bodyFormData.append("startData", startData);
    bodyFormData.append("endData",endData);
    bodyFormData.append("id", IdArray);
    axios({
        method: "post",
        url: 'http://127.0.0.1:5000/timetable/search/?'+`limit=${limit}&`+ `page=${page}`,
        data: bodyFormData
    }).then(response => {
        callback(response.data.timetables);
    }).catch(error => {
        alert(error.toString());
    });
}