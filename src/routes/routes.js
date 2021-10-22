import mainPage from "../pages/mainPage"
import audiencePage from "../pages/audiencePage"


export const Routes =[
    {path: '/main', component: mainPage, exact: true , key: 1},
    {path: '/main/audiences', component: audiencePage, exact: true, key: 2},
]
