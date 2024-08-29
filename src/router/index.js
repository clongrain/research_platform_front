import { Navigate, createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import Login from "@/pages/Login"
import storgeUtils from "@/utils/storageUtils"
import NotFoundPage from "@/pages/NotFoundPage"
import ConferencePaperContent from "@/pages/ConferencePaper"
import NewConferencePaper from "@/pages/ConferencePaper/NewConferencePaper"
import ConferencePaperDetail from "@/pages/ConferencePaper/ConferencePaperDetail"
import JournalContent from "@/pages/JournalPaper"
import NewJournalPaper from "@/pages/JournalPaper/NewJournalPaper"
import JournalPaperDetail from "@/pages/JournalPaper/JournalPaperDetail"
import AwardContent from "@/pages/Award"
import AwardDetail from "@/pages/Award/AwardDetail"
import NewAward from "@/pages/Award/NewAward"
import MonographContent from "@/pages/Monograph"
import MonographDetail from "@/pages/Monograph/MonographDetail"
import NewMonograph from "@/pages/Monograph/NewMonograph"
import PatentContent from "@/pages/Patent"
import PatentDetail from "@/pages/Patent/PatentDetail"
import NewPatent from "@/pages/Patent/NewPatent"
import SoftwareCopyrightContent from "@/pages/SoftwareCopyright"
import SoftwareCopyrightDetail from "@/pages/SoftwareCopyright/SoftwareCopyrightDetail"
import ProjectContent from "@/pages/Project"
import ProjectDetail from "@/pages/Project/ProjectDetail"
import NewProject from "@/pages/Project/NewProject"
import MaterialProduction from "@/pages/MaterialProduction"
import NewSoftwareCopyright from "@/pages/SoftwareCopyright/NewSoftwareCopyright"
import StudentContent from "@/pages/Student"
import TeacherContent from "@/pages/Teacher"
import StudentDetail from "@/pages/Student/StudentDetail"
import TeacherDetail from "@/pages/Teacher/TeacherDetail"
function Logined(props) {

  const session = storgeUtils.getSession()
  const isLogined = session && session.expires_at > (Date.now() / 1000)
  const { Element } = props
  if (isLogined) {
    return Element
  }
  else {
    return <Navigate to={"/login"} />
  }

}
const router = createBrowserRouter([
  {
    path: '/',
    element: <Logined Element={<Layout />} />,
    children: [
      {
        index: true,
        element: <StudentContent />
      },
      {
        path: 'users/students',
        element: <StudentContent />
      },
      {
        path: 'users/teachers',
        element: <TeacherContent />
      },
      {
        path: 'users/students/details/:id',
        element: <StudentDetail />
      },
      {
        path: 'users/teachers/details/:id',
        element: <TeacherDetail />
      },
      {
        path: 'achievements/conference-papers',
        element: <ConferencePaperContent />
      },
      {
        path: 'achievements/conference-papers/new',
        element: <NewConferencePaper />
      },
      {
        path: 'achievements/conference-papers/details/:id',
        element: <ConferencePaperDetail />
      },
      {
        path: 'achievements/journal-papers',
        element: <JournalContent />
      },
      {
        path: 'achievements/journal-papers/new',
        element: <NewJournalPaper />
      },
      {
        path: 'achievements/journal-papers/details/:id',
        element: <JournalPaperDetail />
      },
      {
        path: 'achievements/awards',
        element: <AwardContent />
      },
      {
        path: 'achievements/awards/details/:id',
        element: <AwardDetail />
      },
      {
        path: 'achievements/awards/new',
        element: <NewAward />
      },
      {
        path: 'achievements/monographs',
        element: <MonographContent />
      },
      {
        path: 'achievements/monographs/details/:id',
        element: <MonographDetail />
      },
      {
        path: 'achievements/monographs/new',
        element: <NewMonograph />
      },
      {
        path: 'achievements/patents',
        element: <PatentContent />
      },
      {
        path: 'achievements/patents/details/:id',
        element: <PatentDetail />
      },
      {
        path: 'achievements/patents/new',
        element: <NewPatent />
      },
      {
        path: 'achievements/software-copyrights',
        element: <SoftwareCopyrightContent />
      },
      {
        path: 'achievements/software-copyrights/new',
        element: <NewSoftwareCopyright />
      },
      {
        path: 'achievements/software-copyrights/details/:id',
        element: <SoftwareCopyrightDetail />
      },
      {
        path: 'projects',
        element: <ProjectContent />
      },
      {
        path: 'projects/details/:id',
        element: <ProjectDetail />
      },
      {
        path: 'projects/new',
        element: <NewProject />
      },
      {
        path: 'material-production/new',
        element: <MaterialProduction />
      },
      {
        path: 'material-production/history',
        element: <></>
      },
      {
        path: 'material-production/new',
        element: <></>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])
export default router