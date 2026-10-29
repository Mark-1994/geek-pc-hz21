import React, { Component } from 'react'
import styles from './index.module.scss'
import { Layout, Menu, Popconfirm, message } from 'antd'
import { DiffOutlined, EditOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { removeToken } from 'utils/storage'
import { getUserProfile } from 'api/user'

// 自己实现 withRouter：在外层函数组件里用 Hook，再传给类组件
const withRouter = (WrappedComponent) => (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  return <WrappedComponent {...props} navigate={navigate} location={location} />
}

const { Header, Content, Sider } = Layout
const items2 = [
  {
    icon: HomeOutlined,
    label: <Link to="/home">数据概览</Link>,
    key: '/home'
  },
  {
    icon: DiffOutlined,
    label: <Link to="/home/list">内容管理</Link>,
    key: '/home/list'
  },
  {
    icon: EditOutlined,
    label: <Link to="/home/publish">发布文章</Link>,
    key: '/home/publish'
  }
].map(({ icon, label, key }) => {
  return {
    key,
    icon: React.createElement(icon),
    label: label
  }
})

class LayoutComponent extends Component {
  state = {
    profile: {}
  }
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <div className="profile">
              <span>{this.state.profile.name}</span>
              <span>
                <Popconfirm
                  title="你确定要退出本系统吗？"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={this.onConfirm}
                >
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200}>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[this.props.location.pathname]}
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
  async componentDidMount() {
    try {
      const res = await getUserProfile()
      this.setState({
        profile: res.data
      })
    } catch (err) {}
  }
  // 退出系统
  onConfirm = () => {
    // 移除token
    removeToken()
    // 跳转到登录页
    this.props.navigate('/login')
    // 提示消息
    message.success('退出成功')
  }
}

export default withRouter(LayoutComponent)
