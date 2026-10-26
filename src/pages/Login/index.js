import React, { Component } from 'react'
import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import styles from './index.module.scss'
import logo from 'assets/logo.png'
import { login } from 'api/user'
import { useNavigate } from 'react-router-dom'

// 自己实现 withRouter：在外层函数组件里用 Hook，再传给类组件
const withRouter = (WrappedComponent) => (props) => {
  const navigate = useNavigate()
  return <WrappedComponent {...props} navigate={navigate} />
}

class Login extends Component {
  state = {
    loading: false // 加载状态
  }
  render() {
    return (
      <div className={styles.login}>
        <Card className="login-container">
          <img src={logo} alt="" className="login-logo" />
          {/* 表单 */}
          <Form size="large" validateTrigger={['onChange', 'onBlur']} onFinish={this.onFinish} initialValues={{
            mobile: '13911111111',
            code: '246810',
            agree: true
          }}>
            <Form.Item
              name="mobile"
              rules={[
                {
                  required: true,
                  message: '手机号不能为空'
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误'
                }
              ]}
            >
              <Input placeholder="请输入你的手机号" autoComplete="off" />
            </Form.Item>

            <Form.Item name="code" rules={[
              { required: true, message: '验证码不能为空' },
              { pattern: /^\d{6}$/, message: '验证码格式错误' }
            ]}>
              <Input placeholder="请输入验证码" autoComplete="off" />
            </Form.Item>

            <Form.Item name="agree" rules={[
              {
                // 自定义校验规则
                validator: (rule, value) => value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意用户协议'))
              }
            ]} valuePropName="checked">
              <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={this.state.loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  onFinish = async ({ mobile, code }) => {
    this.setState({ loading: true })
    try {
      const res = await login(mobile, code)
      // 登录成功，保存token
      localStorage.setItem('token', res.data.token)
      // 跳转到首页
      this.props.navigate('/home')   // 通过 props 使用
      // 提示消息
      message.success('登录成功')
    } catch (error) {
      message.error(error.response.data.message)
      this.setState({ loading: false })
    }
  }
}

export default withRouter(Login)
