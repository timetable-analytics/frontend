import React, {useState} from 'react';
import AudienceFormPanel from "../component/UI/MyFormPanels/AudienceFormPanel";


const AudiencePage = () => {
    const [activeButton,setActiveButton] = useState(true)
    const [informationAboutAudiences, setInformationAboutAudiences] = useState({building:"", typeAudience:"", number: ""})

    //console.log(informationAboutAudiences);

    return (
        <div>
            <AudienceFormPanel activeButton={activeButton} setActiveButton={setActiveButton} setInfo={setInformationAboutAudiences}/>
        </div>
    );
};

export default AudiencePage;