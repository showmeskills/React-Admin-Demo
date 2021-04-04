import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Card, DatePicker } from 'antd';

@withRouter


class Edit extends Component {


    // state = {
    //     titleValidateStatus:'',
    //     titleHelp:'',
    // }

    onFinish = (values) => {
        console.log('Received values of form: ', values);

    }


    render() {
        return (
            <Card
                title='Article Edition'
                bordered={false}
                extra={
                    <Button>取消</Button>
                }
            >
                <Form
                    onFinish={this.onFinish}
                    //设置input 宽度 通过rest参数 传下去
                    {...formItemLayout}
                >
                    {/* title */}
                    <Form.Item
                        label="Article title:"
                        // validateStatus={this.state.titleValidateStatus}
                        // help={this.state.titleHelp}
                        name="title"
                        //form表单中 input 属性设置
                        rules={[
                            { required: true, message: 'Please input Artilce title!' },
                            { min: 4, message: "title 必须大于4位" },
                            { max: 8, message: "必须小于8位" },
                            //自定义校验规则输入格式
                            // {
                            //     validator:(rule,value,callback)=>{
                            //      if(value !== '123'){
                            //          this.setState({
                            //              titleValidateStatus:'error',
                            //              titleHelp:"title不正确"
                            //             })
                            //      }else{
                            //         this.setState({
                            //             titleValidateStatus:'',
                            //             titleHelp:''
                            //         })
                            //      }
                            //      callback()
                            //     }
                            // }
                        ]}
                    >
                        <Input  placeholder="Article title" />
                    </Form.Item>
                    {/* author */}
                    <Form.Item
                        label="Article Author:"
                        name="Author"
                        rules={[
                            { required: true, message: 'Please input Artilce Author!' },
                        ]}
                    >
                        <Input placeholder="admin" />
                    </Form.Item>
                    {/* 阅读量 */}
                    <Form.Item
                        label="Article Amount"
                        name="Amount"
                        rules={[
                            { required: true, message: '输入阅读量' },
                        ]}
                    >
                        <Input placeholder="0" />
                    </Form.Item>
                    {/* 创建时间 */}
                    <Form.Item
                        label="create time:"
                        name="Time"
                        rules={[
                            { required: true },
                        ]}
                    >
                        <DatePicker showTime placeholder="选择时间"></DatePicker>
                    </Form.Item>
                    {/* 内容 */}
                    <Form.Item
                        label="content:"
                        name="内容"
                        rules={[
                            { required: true, message: '内容是必须的'},
                        ]}
                    >
                       <div 
                       contentEditable={true}
                        style={{
                            border: "1px solid #dedede",
                            width:"500px",
                            minHeight:"300px",
                            outline:"none",
                        }}
                       
                       placeholder="输入内容"></div>
                    </Form.Item>
                        {/* 设置按钮的位置 */}
                    <Form.Item wrapperCol={{offset:4}}>
                            <Button type="primary" htmlType="submit">
                                保存修改
                            </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
//labelCol 和 wrapperCol
const formItemLayout = {
    //label宽度
    labelCol: {
        span: 4
    },
    //input 宽度
    wrapperCol: {
        span: 5,
    }
}
export default Edit
