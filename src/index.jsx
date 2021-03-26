import React from 'react';
import {render} from 'react-dom';
import App from './App';
import './assets/less/index.less';
import {HashRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from 'antd'
import {mainRoutes} from './routes'



render(
    <ConfigProvider locale={zhCN}>
        <Router>
            <Switch>
            <Route path='/admin' render={(routeProps)=>{
                //TODO:需要登录才能访问/admin(requirements of authorities to access admin page)
                return <App {...routeProps}/>
            }}/>
            {
                mainRoutes.map(route=>{
                    return <Route key={route.pathname} path={route.pathname} component={route.component}/>
                })
            }
            <Redirect to='/admin' from='/' exact />
            <Redirect to='/404' from='*'/>
            </Switch>
        </Router>
    </ConfigProvider>,
    document.getElementById('root')
)