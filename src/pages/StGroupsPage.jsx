import React, {useState} from 'react';
import StGroupsFormPanel from "../component/UI/MyFormPanels/StGroupsFormPanel";

const StGroupsPage = () => {

    const [activeButton,setActiveButton] = useState(true)

    return (
        <div>
            <StGroupsFormPanel
                activeButton={activeButton}
                setActiveButton={setActiveButton}
            />
        </div>
    );
};

export default StGroupsPage;