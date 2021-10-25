import React, {useState} from 'react';
import TeacherFormPanel from "../component/UI/MyFormPanels/TeacherFormPanel";

const TeacherPage = () => {
    const [activeButton,setActiveButton] = useState(true)
    const [informationAboutTeachers, setInformationAboutTeachers] = useState({
        faculty:"",
        FIO:"",
        position: "",
        degree: ""
    })

    //console.log(informationAboutTeachers);


    return (
        <div>
            <TeacherFormPanel
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                setInformationAboutTeacher={setInformationAboutTeachers}
            />
        </div>
    );
};

export default TeacherPage;