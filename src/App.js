import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Layout from 'pages/Layout'
import Login from 'pages/Login'
import Home from 'pages/Home'
import ArticleList from 'pages/ArticleList'
import ArticlePublish from 'pages/ArticlePublish'
import AuthRoute from 'components/AuthRoute'
import { setNavigate } from 'utils/router'

// 必须放在 <Router> 内部，否则 useNavigate 拿不到 Router 的 context
function RegisterNavigate() {
  const navigate = useNavigate()

  useEffect(() => {
    setNavigate(navigate)
  }, [navigate])

  return null
}

function App() {
  return (
    <Router>
      <RegisterNavigate />
      <div className="App">
        {/* 配置路由的规则 */}
        <Routes>
          {/* 一级路由，下面挂二级路由 */}
          <Route path="/home" element={<AuthRoute><Layout /></AuthRoute>}>
            {/* index = 访问 /home 时默认显示 */}
            <Route index element={<Home />}></Route>
            {/* 注意写 "list" 不写 "/list"，会自动拼接成 /home/list */}
            <Route path="list" element={<ArticleList />}></Route>
            <Route path="publish" element={<ArticlePublish key="add" />}></Route>
            {/* 修改页面路径，添加 :id */}
            <Route path="publish/:id" element={<ArticlePublish key="edit" />}></Route>
          </Route>
          {/* 一级路由：登录页 */}
          <Route path="/login" element={<Login />}></Route>
          {/* 根路径重定向 */}
          <Route path="/" element={<Navigate to="/home" />}></Route>
          {/* 配置一个404组件 */}
          <Route path="*" element={<div>404 页面不存在</div>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
