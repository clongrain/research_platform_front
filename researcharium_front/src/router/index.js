import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import StudentTable from "../components/StudentTable"

const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                index:true,
                element:<StudentTable/>
            },
            {
                path:'users',
                element:<StudentTable/>
            },
            {
                path:'achievements',
                element:<></>
            },
            {

            }
        ]
    },
    {
        path:'/login',
        element:<></>
    }
])
export default router