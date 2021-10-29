import {useLocation} from "react-router-dom";


export function MyLocation() {
    let location = useLocation();
    let i = 0;

    if (location.pathname === "/main/audiences"){
        i = 1;
    }
    else if (location.pathname === "/main/teachers"){
        i = 2;
    }else if (location.pathname === "/main/student_groups")
        i = 3;
    else if (location.pathname === "/main/disciplines")
        i = 4;
    else if (location.pathname === "/main/event")
        i = 5;

    return i;
}

