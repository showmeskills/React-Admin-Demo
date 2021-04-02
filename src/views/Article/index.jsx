import React, { Component } from 'react'
import moment from 'moment'
import XLSX from 'xlsx'

import { Card, Tag, Table, Button, Modal, Typography, message, Popover } from 'antd'
import {withRouter} from 'react-router-dom'
import { getArtilces, delArtById } from '../../axios';
//存放多个button 组件
const ButtonGroup = Button.Group

const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}
@withRouter




 class ArticleList extends Component {

  state = {
    dataSource: [],
    columns: [],
    total: 0,
    isLoading: false,
    offset: 0,
    limited: 10,
    deleteArticlTitle: '',
    isShowArticleModal: false,
    deleteArticleConfirmLoading: false,
    deleteArticleID: null,
  }
  
  createColumns = (columnKeys) => {
    
    //显示隐藏 删除弹框
    const showDeleteArticleModal = (record) => {
      this.setState({
        isShowArticleModal: true,
        deleteArticlTitle: record.title,
        deleteArticleID: record.id,
      })
    }
    const columns = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (record) => {
            const { amount } = record
            return (
              <Popover title={amount > 250 ? 'under 250' : 'over 250'} trigger="hover">
                <Tag color={amount > 250 ? 'green' : 'red'}>{amount}</Tag>
              </Popover>
            )

          }
        }
      }
      if (item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (record) => {
            const { createAt } = record
            return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
          }
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item
      }
    })
     //点击编辑页面
  const toEdit = (record)=>{
    // this.props.history.push({
    //   pathname:`/admin/article/edit/${record.id}`,
    //   state:{
    //     title:record.title,
    //   }
    // })
    this.props.history.push(`/admin/article/edit/${record.id}`)
  }
    //额外添加columns
    columns.push({
      title: '操作',
      key: 'actions',
      render(record) {
        return (
          <ButtonGroup>
            <Button size="small" type='primary'
              onClick={()=>toEdit(record)}
            >编辑</Button>
            <Button size="small" type='danger'
              onClick={() => showDeleteArticleModal(record)}
            >删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns

  }


  
  //customize a function to request data
  getData = () => {
    this.setState({
      isLoading: true,
    })
    getArtilces(this.state.offset, this.state.limited)
      .then(res => {
        const columnKeys = Object.keys(res.data.list[0])
        const columns = this.createColumns(columnKeys)
        this.setState({
          total: res.data.total,
          dataSource: res.data.list,
          columns
        })
      })
      .catch(err => {
        //处理错误,虽然有全局处理
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        })
      })
  }


  onPageChange = (page, pageSize) => {
    //console.log(page,pageSize)
    this.setState({
      offset: (page - 1) * pageSize,
      limit: pageSize
    }, () => {
      //处理异步请求
      this.getData()
    })
  }
  //切换页面数量的是回到首页还是留在当前页
  onShowSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limit: size,
    }, () => {
      //处理异步请求
      this.getData()
    })
  }

  componentDidMount() {
    this.getData()
  }

  toExcel = () => {
    //在实际的项目中,前端发送一个ajax请求到后端,后端返回一个文件下载的地址
    //然后前端使用xlsx的来组合数据
    //组合数据
    const data = [Object.keys(this.state.dataSource[0])]//[["id","title","author","amount","createAt"],["数据id"...]]
    for (let i = 0; i < this.state.dataSource.length; i++) {
      //data.push(Object.values(this.state.dataSource[i]))
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 HH-mm-ss')
      ])
    }
    //data数据导出格式是一个二维数据第一个数组是title
    //第二数组是数据 Array of Arrays e.g. [["a","b"],[1,2]]
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, `articles-${this.state.offset / this.state.limited + 1}-${moment().format('YYYY-MM-DD-HH-mm-ss')}.xlsx`)
  }

  hiddenDeleteModal = () => {
    this.setState({
      isShowArticleModal: false,
      deleteArticlTitle: '',
      deleteArticleConfirmLoading: false,
    })
  }

  deleteArticle = () => {
    this.setState({
      deleteArticleConfirmLoading: true,
    })
    delArtById(this.state.deleteArticleID)
      .then(resp => {
        //console.log(resp)
        message.success(resp.data.msg);
        //这里沟通的时候有坑,究竟是留在当前页，还是第一页
        //返回第一页
        this.setState({
          offset: 0
        }, () => {
          this.getData();
        })
      })
      .finally(() => {
        this.setState({
          deleteArticleConfirmLoading: false,
          isShowArticleModal: false,
        })
      })
  }
  render() {
    return (
      <div className="site-card-border-less-wrapper">
        <Card title="Artilce list"
          bordered={false}
          extra={<Button onClick={this.toExcel}>导出Excel</Button>}
        >
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            //设置loading 
            loading={this.state.isLoading}
            rowKey={record => record.id}
            pagination={{
              current: this.state.offset / this.state.limited + 1,
              total: this.state.total,
              hideOnSinglePage: true,
              showQuickJumper: true,
              showSizeChanger: true,
              onShowSizeChange: this.onShowSizeChange,
              onChange: this.onPageChange,
              pageSizeOptions: ['10', '15', '20', '30']
            }}
          />
        </Card>
        <Modal
          title='此操作不可逆，请谨慎!!!'
          visible={this.state.isShowArticleModal}
          onCancel={this.hiddenDeleteModal}
          confirmLoading={this.state.deleteArticleConfirmLoading}
          onOk={this.deleteArticle}
        >
          <Typography>确定要删除<span style={{ color: 'red' }}>{this.state.deleteArticlTitle}</span>吗?</Typography>
        </Modal>
      </div>
    )
  }
}
export default ArticleList;