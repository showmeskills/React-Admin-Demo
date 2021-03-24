import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'

import {adminRouter} from './routes'


class App extends Component{
    render(){
        return(
            <>
                <div>there is a public area</div>
                <Switch>
                    {
                        adminRouter.map(route=>{
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
                    <Redirect to={adminRouter[0].pathname} from='/admin' exact/>
                    <Redirect to='/404' from='*'/>
                </Switch>
            </>
        )
    }
}

export default App
