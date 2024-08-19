import AdminPage from "../pages/adminPahe";
import DefaultPage from "../pages/defaultPage";
import HomePage from "../pages/homePage";
import LoginPage from "../pages/login";

export const routes = [
    {
        path:"/",
        element: <DefaultPage/>,
        children:[
            {
                path:"/home",
                element: <HomePage/>
            },
            {
                path:"/admin",
                element: <AdminPage/>
            }
        ]
        
    },
    {
        path:"/login",
        element: <LoginPage/>,
        children:[]
    },
]