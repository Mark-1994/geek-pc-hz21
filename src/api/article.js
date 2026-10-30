// 封装和文章相关的接口
import request from 'utils/request'

/**
 * 获取文章列表数据
 * @param {*} params 
 * @returns 
 */
export const getArticles = (params) => request.get('/mp/articles', { params })

/**
 * 删除文章
 * @param {*} id 
 * @returns 
 */
export const deleteArticle = (id) => request.delete(`/mp/articles/${id}`)
