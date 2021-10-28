import React, {useState} from 'react';
import AudienceFormPanel from "../component/UI/MyFormPanels/AudienceFormPanel";
import AudiencesTable from "../component/UI/MyTable/AudiencesTable";


const AudiencePage = () => {
    const [activeButton,setActiveButton] = useState(true)
    const [InformationAboutAudiences, setInformationAboutAudiences] = useState({
        building: undefined,
        type: undefined,
        number: undefined
    })
    const [paramsSearch, setParamsSearch] = useState({
        building: undefined,
        type: undefined,
        number: undefined
    })
    const [totalAudiences, setTotalAudiences] = useState( undefined);
    //const ChosenElement = ChosenElem;


    //console.log(InformationAboutAudiences);
    //console.log(totalAudiences);
    //console.log(paramsSearch)

    return (
            <div className="container">
                <div className="row gx-5">
                    <AudienceFormPanel
                        activeButton={activeButton}
                        setActiveButton={setActiveButton}
                        setInfoAboutAudiences={setInformationAboutAudiences}
                        setInfoAboutTotalPages={setTotalAudiences}
                        setParams={setParamsSearch}
                    />
                    <AudiencesTable
                        audiences={InformationAboutAudiences}
                        setAudiences={setInformationAboutAudiences}
                        totalAudiences={totalAudiences}
                        paramsSearch={paramsSearch}
                        //ChosenElement={ChosenElement}
                    />
                </div>
            </div>

    );
};

export default AudiencePage;
