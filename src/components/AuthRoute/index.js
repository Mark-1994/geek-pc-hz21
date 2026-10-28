import { Navigate, useLocation } from 'react-router-dom'
import { hasToken } from 'utils/storage'

/**
 * 路由鉴权：有 token 放行，没有就跳登录页
 * 用法：<Route path="/home" element={<AuthRoute><Layout /></AuthRoute>} />
 */
const AuthRoute = ({ children }) => {
  const location = useLocation()

  if (!hasToken()) {
    // replace：不留历史记录，浏览器后退不会又回到这个地址
    // state.from：记住"本来想去哪"，登录成功后跳回去
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    )
  }

  // 有 token，正常渲染
  return children
}

export default AuthRoute
