import React, { Component } from 'react'
import { Card, Breadcrumb, Form, Button, Space, Input } from 'antd'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import styles from './index.module.scss'

export default class ArticlePublish extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Card title={
          <Breadcrumb
            items={[
              {
                title: <Link to="/home">首页</Link>,
              },
              {
                title: '发布文章',
              },
            ]}
          />
        }>
          <Form labelCol={{ span: 4 }} size="large" onFinish={this.onFinish} validateTrigger={['onChange', 'onBlur']} initialValues={{ content: '' }}>
            <Form.Item label="标题" name="title" rules={[
              {
                required: true,
                message: '请输入标题'
              }
            ]}>
              <Input style={{ width: 400 }} placeholder="请输入文章标题" />
            </Form.Item>
            <Form.Item label="频道" name="channel_id" rules={[
              {
                required: true,
                message: '请选择频道'
              }
            ]}>
              <Channel></Channel>
            </Form.Item>
            <Form.Item label="封面" name="title">
              
            </Form.Item>
            <Form.Item label="内容" name="content" rules={[
              {
                required: true,
                message: '请输入内容'
              }
            ]}>
              <ReactQuill theme="snow" placeholder="请输入文章内容"></ReactQuill>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button type="primary" htmlType="submit" size="large">发布文章</Button>
                <Button size="large">存入草稿</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  onFinish = (values) => {
    console.log(values)
  }
}
