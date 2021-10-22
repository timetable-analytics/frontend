import {useLocation} from "react-router-dom";


export function MyLocation() {
    let location = useLocation();
    let i = 0;
    if (location.pathname === "/main/audiences"){
        i = 1;
    }
    else {
        i = 0;
    }

    return i;
}

