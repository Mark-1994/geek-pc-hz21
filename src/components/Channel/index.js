import React, { Component } from 'react'
import { Select } from 'antd'
import { getChannels } from 'api/channel'

export default class Channel extends Component {
  state = {
    channels: []
  }
  componentDidMount() {
    this.getChannelList()
  }
  getChannelList = async () => {
    const res = await getChannels()
    this.setState({
      channels: res.data.channels
    })
  }
  render() {
    return (
      <Select
        style={{ width: 200 }}
        placeholder="请选择文章频道"
        fieldNames={{ label: 'name', value: 'id' }}
        options={this.state.channels}
        onChange={this.props.onChange}
        value={this.props.value}
      />
    )
  }
}
