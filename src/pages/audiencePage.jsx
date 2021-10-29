import React, {useState} from 'react';
import AudienceFormPanel from "../component/UI/MyFormPanels/AudienceFormPanel";


const AudiencePage = () => {

    const [activeButton,setActiveButton] = useState(true)

    return (
        <AudienceFormPanel
            activeButton={activeButton}
            setActiveButton={setActiveButton}
        />
    );
};

export default AudiencePage;
