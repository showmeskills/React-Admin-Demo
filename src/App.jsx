import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';

import {Frame} from './components'
import {adminRoutes} from './routes'


class App extends Component{
    render(){
        return(
            <>
                <Frame>
                    <Switch>
                        {
                            adminRoutes.map(route=>{
                                return(
                                    <Route 
                                        key={route.pathname}
                                        path={route.pathname}
                                        exact={route.exact}
                                        render={(propsRoute)=>{
                                            return <route.component {...propsRoute}/>
                                        }}
                                    />
                                )
                            })
                        }
                        <Redirect to={adminRoutes[0].pathname} from='/admin' exact/>
                        <Redirect to='/404' from='*'/>
                    </Switch>
                </Frame>
            </>
        )
    }
}

export default App
