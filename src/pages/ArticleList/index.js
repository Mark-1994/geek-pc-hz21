import React, { Component } from 'react'
import { Card, Breadcrumb, Form, Radio, Button, Select, DatePicker, Table, Tag, Space } from 'antd'
import { Link } from 'react-router-dom'
import { ArticleStatus } from 'api/constants'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/article'
import defaultImg from 'assets/error.png'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export default class ArticleList extends Component {
  columns = [
    {
      title: '封面',
      render: (data) => {
        if (data.cover.type === 0) {
          return <img src={defaultImg} alt="" style={{ width: '200px', height: '150px', objectFit: 'cover' }} />
        }
        return <img src={data.cover.images[0]} alt="" style={{ width: '200px', height: '150px', objectFit: 'cover' }} />
      }
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        const obj = ArticleStatus.find(item => item.value === status)
        return <Tag color={obj.color}>{obj.label}</Tag>
      }
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: () => {
        return (
          <Space>
            <Button type="primary" shape="circle" icon={<EditOutlined />}></Button>
            <Button danger shape="circle" icon={<DeleteOutlined />}></Button>
          </Space>
        )
      }
    }
  ]
  state = {
    // 频道列表数据
    channels: [],
    articles: {}
  }
  render() {
    const { total_count, results } = this.state.articles
    return (
      <div>
        <Card title={
          <Breadcrumb
            items={[
              {
                title: <Link to="/home">首页</Link>,
              },
              {
                title: '文章列表',
              },
            ]}
          />
        }>
          <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
            <Form.Item label="状态" name="status">
              <Radio.Group
                options={ArticleStatus}
              />
            </Form.Item>
            <Form.Item label="频道" name="channel_id">
              <Select
                style={{ width: 200 }}
                placeholder="请选择文章频道"
                fieldNames={{ label: 'name', value: 'id' }}
                options={this.state.channels}
              />
            </Form.Item>
            <Form.Item label="日期" name="date">
              <DatePicker.RangePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title={`根据筛选条件共查询到 ${total_count} 条结果：`}>
          <Table columns={this.columns} dataSource={results} rowKey="id" />
        </Card>
      </div>
    )
  }
  async componentDidMount() {
    this.getChannelList()
    this.getArticleList()
  }
  getChannelList = async () => {
    const res = await getChannels()
    this.setState({
      channels: res.data.channels
    })
  }
  getArticleList = async () => {
    const res = await getArticles()
    this.setState({
      articles: res.data
    })
  }
  onFinish = (values) => {
    console.log(values)
  }
}
