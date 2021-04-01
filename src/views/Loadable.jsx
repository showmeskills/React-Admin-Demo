import React,{ Component,Fragment} from 'react';

//utilising loadable
const Loadable = (
    {
        loader,
        loading:Loading
    }
)=>{
    return class LoadableComponent extends Component{
        state = {
            LoadedComponent:null,
        }
        componentDidMount(){
                // loader:()=>import('./Login'),
            loader()
                .then(resp=>{
                    this.setState({
                        LoadedComponent:resp.default
                    })
                })
        }
        render(){
            const {LoadedComponent} = this.state;
            return(
                <Fragment>
                    {
                        LoadedComponent
                            ?
                            <LoadedComponent/>
                            :
                            <Loading/>
                    } 
                </Fragment>
            )
        }
    }
}

export default Loadable;