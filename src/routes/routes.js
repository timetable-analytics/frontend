import mainPage from "../pages/mainPage"
import audiencePage from "../pages/audiencePage"
import TeacherPage from "../pages/TeacherPage";
import StGroupsPage from "../pages/StGroupsPage";
import DisciplinesPage from "../pages/DisciplinesPage";


export const Routes =[
    {path: '/main', component: mainPage, exact: true , key: 1},
    {path: '/main/audiences', component: audiencePage, exact: true, key: 2},
    {path: '/main/teachers', component: TeacherPage, exact: true, key: 3},
    {path: '/main/student_groups', component: StGroupsPage, exact: true, key:4},
    {path: '/main/disciplines', component: DisciplinesPage, exact: true, key: 5}
]
