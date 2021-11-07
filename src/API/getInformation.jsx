import axios from "axios";

export const getAudiences = (paramsSearch,limit, page, callback) => {
    let params = (paramsSearch.building !== undefined ? `building=${paramsSearch.building}&` : "") +
        (paramsSearch.type !== undefined ? `type=${paramsSearch.type}&` : "") +
        (paramsSearch.number !== undefined ? `number=${paramsSearch.number}&` : "")+
        (`limit=${limit}&`)+
        (`page=${page}`);
    console.log('http://127.0.0.1:5000/audiences/search/?' + params);
    axios.get('http://127.0.0.1:5000/audiences/search/?' + params)
        .then(response => {
            callback(response.data.audiences);
        })
        .catch(error => {
            alert(error.toString());
        });
}

 // get teachers from server with possible params faculty, fio, position, degree
export const getTeachers = (paramsSearch, limit, page, callback) => {
    let params = (paramsSearch.faculty !== undefined ? `faculty=${paramsSearch.faculty}&` : "") +
        (paramsSearch.fio !== undefined ? `fio=${paramsSearch.fio}&` : "") +
        (paramsSearch.position !== undefined ? `position=${paramsSearch.position }&` : "")+
        (paramsSearch.degree !== undefined ? `degree=${paramsSearch.degree}&` : "")+
        (`limit=${limit}&`)+
        (`page=${page}`);
    console.log('http://127.0.0.1:5000/educators/search/?' + params);
    axios.get('http://127.0.0.1:5000/educators/search/?' + params)
        .then(response => {
            callback(response.data.educators);
        })
        .catch(error => {
            alert(error.toString());
        });
}

// get stGroups from server with possible params faculty, program, number, course
export const getStGroups = (paramsSearch, limit, page, callback) => {
    let params = (paramsSearch.faculty !== undefined ? `faculty=${paramsSearch.faculty}&` : "") +
        (paramsSearch.program !== undefined ? `program=${paramsSearch.program}&` : "") +
        (paramsSearch.name !== undefined ? `number=${paramsSearch.name}&` : "")+
        (paramsSearch.course !== undefined ? `course=${paramsSearch.course}&` : "")+
        (`limit=${limit}&`)+
        (`page=${page}`);
    console.log('http://127.0.0.1:5000/groups/search/?' + params);
    axios.get('http://127.0.0.1:5000/groups/search/?' + params)
        .then(response => {
            callback(response.data.groups);
        })
        .catch(error => {
            alert(error.toString());
        });
}

// get disciplines from server with possible params name
export const getDisciplines = (paramsSearch, limit, page, callback) => {
    let params = (paramsSearch.name !== undefined ? `name=${paramsSearch.name}&` : "") +
        (`limit=${limit}&`)+
        (`page=${page}`);
    console.log('http://127.0.0.1:5000/disciplines/search/?' + params);
    axios.get('http://127.0.0.1:5000/disciplines/search/?' + params)
        .then(response => {
            callback(response.data.disciplines);
        })
        .catch(error => {
            alert(error.toString());
        });
}