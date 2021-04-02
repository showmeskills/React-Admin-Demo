import React, { Component } from 'react'
import {Card,Button} from 'antd';
import {withRouter} from 'react-router-dom';
@withRouter

class Edit extends Component {
    render() {
        return (
            <Card 
                title='Article Edition'
                bordered={false}
                extra={
                    <Button>取消</Button>
                }
            >
            </Card>
        )
    }
}

export default Edit
