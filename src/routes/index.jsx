import {
    NotFound,
    Login,
    Settings,
    Dashboard,
    ArticleList,
    ArticleEdit
} from '../views'
//there are the first class routers
export const mainRouter = [
    {
        pathname: '/login',
        component:Login,
    },
    {
        pathname:'/404',
        component:NotFound,
    },
]
//there are the second class routers
export const adminRouter =[
    {
        pathname:'/admin/dashboard',
        component:Dashboard
    },
    {
        pathname:'/admin/settings',
        component:Settings
    },
    {
        pathname:'/admin/article',
        component:ArticleList,
        exact: true,
    },
    {
        pathname:'/admin/article/edit/:id',
        component:ArticleEdit
    }
]