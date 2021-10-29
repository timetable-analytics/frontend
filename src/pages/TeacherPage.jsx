import React, {useState} from 'react';
import TeacherFormPanel from "../component/UI/MyFormPanels/TeacherFormPanel";

const TeacherPage = () => {

    const [activeButton,setActiveButton] = useState(true)


    return (
        <TeacherFormPanel
            activeButton={activeButton}
            setActiveButton={setActiveButton}
        />
    );
};

export default TeacherPage;