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
    EditOutlined,
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
    {
        pathname:'/admin/article/edit/:id',
        component:ArticleEdit,
        title:'ArticleEdit',
        isNav:true,
        icon:EditOutlined
    },
    {
        pathname:'/admin/settings',
        component:Settings,
        title:'Settings',
        isNav:true,
        icon:SettingOutlined
    },
]