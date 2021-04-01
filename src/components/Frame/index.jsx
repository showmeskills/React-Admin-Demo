import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import "antd/dist/antd.css";
import {withRouter} from 'react-router-dom'

import logo from './logo3.png';
import './Frame.less';
import {adminRoutes} from '../../routes'
const menus = adminRoutes.filter(route=>route.isNav === true);
const { Header, Content, Sider } = Layout;

@withRouter

class Frame extends Component {
    onMenuClick = ({item,key,keyPath,demEvent}) =>{
        //console.log({item,key,keyPath,demEvent})
        this.props.history.push(key)
    }
    render() {
        return(
            <Layout style={{minHeight:'100vh'}}>
                <Header className="header">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                </Header>
            <Layout>
              <Sider width={200} className="site-layout-background">
                <Menu
                  mode="inline"
                  //using router.location.pathname
                  selectedKeys={[this.props.location.pathname]}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={this.onMenuClick}
                >
                    {
                        menus.map(item=>{
                            return(
                                <Menu.Item key={item.pathname} icon={<item.icon/>}
                                >  
                                  {item.title}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
              </Sider>
              <Layout style={{ padding: '16px' }}>
                <Content
                  className="site-layout-background"
                  style={{
                    margin: 0,
                    backgroundColor:'#fff'
                  }}
                >
                 {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
          )
    }
}

export default Frame