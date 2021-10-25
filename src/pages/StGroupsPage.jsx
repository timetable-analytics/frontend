import React, {useState} from 'react';
import StGroupsFormPanel from "../component/UI/MyFormPanels/StGroupsFormPanel";

const StGroupsPage = () => {

    const [activeButton,setActiveButton] = useState(true)
    const [informationAboutStGroups, setInformationAboutStGroups] = useState({
        faculty:"",
        program:"",
        number: "",
        course: ""
    })

    console.log(informationAboutStGroups);

    return (
        <div>
            <StGroupsFormPanel
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                setInfoAboutStGroups={setInformationAboutStGroups}
            />
        </div>
    );
};

export default StGroupsPage;