import React, {useState} from 'react';
import DisciplinesFormPanel from "../component/UI/MyFormPanels/DisciplinesFormPanel";

const DisciplinesPage = () => {

    const [activeButton,setActiveButton] = useState(true)
    const [informationAboutDisciplines, setInformationAboutDisciplines] = useState({
        name:""
    })

    console.log(informationAboutDisciplines);

    return (
        <div>
            <DisciplinesFormPanel
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                setInfoAboutDisciplines={setInformationAboutDisciplines}
            />
        </div>
    );
};

export default DisciplinesPage;