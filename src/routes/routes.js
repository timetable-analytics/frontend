import mainPage from "../pages/mainPage"
import audiencePage from "../pages/audiencePage"


export const Routes =[
    {path: '/main', component: mainPage, exact: true},
    {path: '/main/audiences', component: audiencePage, exact: true},
]
