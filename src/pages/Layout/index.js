import React, { Component } from 'react'
import styles from './index.module.scss'
import { Layout, Menu } from 'antd'
import { DiffOutlined, EditOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import { Outlet, Link } from 'react-router-dom'

const { Header, Content, Sider } = Layout
const items2 = [
  {
    icon: HomeOutlined,
    label: <Link to="/home">数据概览</Link>
  },
  {
    icon: DiffOutlined,
    label: <Link to="/home/list">内容管理</Link>
  },
  {
    icon: EditOutlined,
    label: <Link to="/home/publish">发布文章</Link>
  }
].map(({ icon, label }, index) => {
  const key = String(index + 1)
  return {
    key: key,
    icon: React.createElement(icon),
    label: label
  }
})

export default class LayoutComponent extends Component {
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <div className="profile">
              <span>用户名</span>
              <span>
                <LogoutOutlined /> 退出
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200}>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderInlineEnd: 0 }}
                items={items2}
              />
            </Sider>
            <Layout style={{ padding: '24px' }}>
              <Content className="site-layout-background">
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
