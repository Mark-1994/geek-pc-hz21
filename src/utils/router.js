// 用于非组件环境（如 axios 拦截器）进行路由跳转
let navigateRef = null

// 在 App 内部的子组件里注册
export const setNavigate = (fn) => {
  navigateRef = fn
}

/**
 * 跳转
 * @param {string} path 目标路径
 * @param {object} options 例如 { replace: true } 不留历史记录
 */
export const navigateTo = (path, options) => {
  if (navigateRef) {
    navigateRef(path, options)
  } else {
    // navigate 还没注册好时兜底（会整页刷新）
    window.location.href = path
  }
}
