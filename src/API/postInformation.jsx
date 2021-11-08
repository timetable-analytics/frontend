import axios from "axios";

export const postEvent = async (place, startData, endData, IdArray, limit, page, callback)=>{
    let bodyFormData = new FormData();
    let IdMassif = Array.from(IdArray);

    bodyFormData.append("place", place);
    bodyFormData.append("startData", startData);
    bodyFormData.append("endData",endData);
    bodyFormData.append("id", IdMassif);
    await axios({
        method: "post",
        url: 'http://127.0.0.1:5000/timetable/search/?'+`limit=${limit}&`+ `page=${page}`,
        data: bodyFormData
    }).then(response => {
        callback(response.data.timetables);
    }).catch(error => {
        alert(error.toString());
    });
}