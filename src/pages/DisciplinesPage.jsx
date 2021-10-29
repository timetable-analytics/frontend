import React, {useState} from 'react';
import DisciplinesFormPanel from "../component/UI/MyFormPanels/DisciplinesFormPanel";

const DisciplinesPage = () => {

    const [activeButton,setActiveButton] = useState(true)

    return (
        <div>
            <DisciplinesFormPanel
                activeButton={activeButton}
                setActiveButton={setActiveButton}
            />
        </div>
    );
};

export default DisciplinesPage;