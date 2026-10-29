// 封装和频道相关的接口
import request from 'utils/request'

/**
 * 
 * @returns 获取频道数据
 */
export const getChannels = () => request.get('/channels')
