import {
    NotFound,
    Login,
    Settings,
    Dashboard,
    ArticleList,
    ArticleEdit
} from '../views'
//antd icon
import {
    DashboardOutlined,
    UnorderedListOutlined,
    SettingOutlined
} from '@ant-design/icons';

//there are the first class routers
export const mainRoutes = [
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
export const adminRoutes =[
    {
        pathname:'/admin/dashboard',
        component:Dashboard,
        title:'Dashboard',
        isNav:true,
        icon:DashboardOutlined
    },
    {
        pathname:'/admin/article',
        component:ArticleList,
        title:'ArticleAdmin',
        isNav:true,
        exact: true,
        icon:UnorderedListOutlined
    },
    //children routes
    {
        pathname:'/admin/article/edit/:id',
        component:ArticleEdit,
    },
    {
        pathname:'/admin/settings',
        component:Settings,
        title:'Settings',
        isNav:true,
        icon:SettingOutlined
    },
]