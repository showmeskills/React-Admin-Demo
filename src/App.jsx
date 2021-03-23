import React,{Component} from 'react';
import {Button} from 'antd'
import 'antd/lib/button/style';

const testHOC = (WrappedComponent)=>{
    return class HOCComponent extends Component{
        render(){
            return(
                <>
                    <WrappedComponent/>
                </>
            )
        }
    }
}
@testHOC

class App extends Component{
    render(){
        return(
            <>
                <Button type='primary'>test-button</Button>
            </>
        )
    }
}

export default App
