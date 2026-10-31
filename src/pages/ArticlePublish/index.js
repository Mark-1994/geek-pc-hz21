import React, { Component } from 'react'
import { Card, Breadcrumb, Form, Button, Space, Input, Radio, Upload, Modal, message } from 'antd'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import styles from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { baseURL } from 'utils/request'
import { addArticle } from 'api/article'
import { navigateTo } from 'utils/router'

export default class ArticlePublish extends Component {
  state = {
    // 文章的封面类型
    type: 1,
    // 用于控制上传的图片以及图片的显示
    fileList: [],
    showPreview: false,
    previewUrl: ''
  }
  formRef = React.createRef()
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
          <Form ref={this.formRef} labelCol={{ span: 4 }} size="large" onFinish={this.onFinish} validateTrigger={['onChange', 'onBlur']} initialValues={{ content: '', type: this.state.type }}>
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
            <Form.Item label="封面" name="type">
              <Radio.Group
                options={[
                { value: 1, label: '单图' },
                { value: 3, label: '三图' },
                { value: 0, label: '无图' }
                ]}
                onChange={this.onChange}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              { this.state.type !== 0 && (
                // fileList：控制文件列表
                // action：控制上传的url
                // name：用于指定字段名
                <Upload listType="picture-card" fileList={this.state.fileList} action={`${baseURL}/upload`} name="image" onChange={this.uploadImage} onPreview={this.handlePreview} beforeUpload={this.beforeUpload}>
                  { this.state.fileList.length < this.state.type && <PlusOutlined /> }
                </Upload>
              )}
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
                <Button size="large" onClick={this.addDraft}>存入草稿</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        {/* 弹窗，用于显示预览的图片 */}
        <Modal open={this.state.showPreview} title="图片预览" footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewUrl} />
        </Modal>
      </div>
    )
  }
  // 上传前的校验
  beforeUpload = (file) => {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      message.warning('请上传 jpg 或 png 格式的图片')
      return Upload.LIST_IGNORE
    }
    return true
  }
  handleCancel = () => {
    this.setState({ showPreview: false, previewUrl: '' })
  }
  handlePreview = (file) => {
    this.setState({
      previewUrl: file.url || file.response.data.url,
      showPreview: true,
    })
  }
  uploadImage = ({ fileList }) => {
    // 把 fileList 修改到 state 中
    this.setState({
      fileList
    })
  }
  onChange = (e) => {
    this.setState({
      type: e.target.value,
      fileList: []
    })
  }
  save = async (values, draft) => {
    const { fileList, type } = this.state
    if (fileList.length !== type) return message.warning('上传图片的数量不正确')
    const images = fileList.map(file => file.url || file.response.data.url)
    await addArticle({
      ...values,
      cover: { type, images }
    }, draft)
    message.success('添加文章成功')
    navigateTo('/home/list')
  }
  onFinish = async (values) => {
    this.save(values)
  }
  addDraft = async () => {
    try {
      const values = await this.formRef.current.validateFields()
      this.save(values, true)
    } catch (error) {}
  }
}
