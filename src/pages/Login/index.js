import React, { Component } from 'react'
import { Button, Calendar } from 'antd'

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
}
export default class Login extends Component {
  render() {
    return (
      <div>
        <Button type="primary">Primary Button</Button>
        <Button color="danger" variant="solid">
            Solid
          </Button>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        登录组件
      </div>
    )
  }
}
