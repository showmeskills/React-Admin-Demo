import React, { Component } from 'react'
import moment from 'moment'

import {Card,Tag,Table,Button} from 'antd'

import {getArtilces} from '../../axios'


const titleDisplayMap = {
  id:'id',
  title:'标题',
  author:'作者',
  createAt:'创建时间',
  amount:'阅读量'
}


export default class ArticleList extends Component {

    state = {
        dataSource:[],
        columns:[],
        total:0,
    }
    createColumns = (columnKeys)=>{
     return columnKeys.map(item=>{
       if(item==='amount'){
         return{
           title: titleDisplayMap[item],
           key: item,
           render:(record)=>{
             const {amount} = record
             //这里是根据数字的大小做一个条件渲染
             //同理,可以做职位级别不同的颜色
             //总经理:'001',经理：'002',
            //  const titleMap ={
            //    '001':'red',
            //    '002':'#09f',
            //    '003':'green'
            //  }
            //  return <Tag color={titleMap[titleKey]}>{amount}</Tag> 
            return <Tag color={amount>250? 'green':'red'}>{amount}</Tag> 
           }
         } 
       }
       if(item==='createAt'){
        return{
          title: titleDisplayMap[item],
          key: item,
          render:(record)=>{
            const {createAt} = record       
           return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
          }
        } 
      }
       return{
         title:titleDisplayMap[item],
         dataIndex:item,
         key:item
       }
     })
    }

    //customize a function to request data
    getData=()=>{
      getArtilces()
      .then(res=>{
        const columnKeys = Object.keys(res.list[0])
        const columns = this.createColumns(columnKeys)
          this.setState({
              total:res.total,
              dataSource:res.list,
              columns
          })
      })
    }
    componentDidMount(){
       this.getData()
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
                  rowKey={record=>record.id}
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
