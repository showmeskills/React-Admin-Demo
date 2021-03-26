import React, { Component } from 'react'

import {Card,Button,Table} from 'antd'

import {getArtilces} from '../../axios'


export default class ArticleList extends Component {

    state = {
        dataSource:[
            {
              key: '1',
              name: '胡彦斌',
              age: 32,
              address: '西湖区湖底公园1号',
            },
            {
              key: '2',
              name: '胡彦祖',
              age: 42,
              address: '西湖区湖底公园1号',
            },
          ],
          columns:[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
            {
                title: 'Handler',
                dataIndex: 'actions',
                key: 'actions',
                //
                render:(record,index)=>{
                    //console.log(record,index)
                    return (
                        <Button>编辑</Button>
                    )
                }
              },
          ],
          total:0,
    }


    componentDidMount(){
        getArtilces()
            .then(res=>{
                this.setState({
                    total:res.total
                })
            })
    }

    render() {
        return (
            <div className="site-card-border-less-wrapper">
                <Card title="Artilce list" 
                bordered={false} 
                extra={<Button>导出Excel</Button>}
                >
                  <Table 
                  dataSource={this.state.dataSource} 
                  columns={this.state.columns} 
                  loading={false}
                  pagination={{
                      total:this.state.total,
                      hideOnSinglePage:true,
                  }}
                  />
                </Card>
            </div>
        )
    }
}
