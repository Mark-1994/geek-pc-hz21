# geek-pc-hz21

基于 React 的**极客园 PC 端后台管理系统**，实现登录鉴权、文章列表筛选、文章发布与编辑等功能。

- **在线预览**：https://mark-1994.github.io/geek-pc-hz21/
- **接口文档**：https://geek.itheima.net/api-pc.html
- **接口基础地址**：`https://geek.itheima.net/v1_0`

## 功能清单

| 模块 | 说明 |
| --- | --- |
| 登录 | 手机号 + 验证码登录，勾选协议校验，登录成功后保存 token 到 localStorage |
| 路由鉴权 | `AuthRoute` 守卫，无 token 自动跳转登录页并记录来源地址，登录后跳回原页面 |
| 请求拦截 | axios 请求拦截器自动携带 `Authorization: Bearer <token>`，401 时清除 token 并踢回登录页 |
| 后台布局 | Header（展示当前用户名、退出登录）+ Sider 菜单 + `Outlet` 二级路由出口，菜单随路由高亮 |
| 数据概览 | `/home` 默认页 |
| 内容管理 | 文章列表，支持按状态 / 频道 / 发布日期区间筛选，分页、删除（二次确认）、跳转编辑 |
| 发布文章 | 新增与编辑共用页面，含标题、频道、封面（单图 / 三图 / 无图，图片上传 + 预览）、富文本正文、发布 / 存入草稿 |

## 技术栈

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| React | 19.3.1 | 视图框架，页面以类组件为主 |
| react-router-dom | 7.18.4 | 路由，使用 `HashRouter` + `React.lazy` 懒加载 |
| antd | 6.6.7 | UI 组件库 |
| @ant-design/icons | - | 图标（随 antd 安装，未单独写入 package.json，建议显式安装） |
| axios | 1.20.0 | HTTP 请求 |
| react-quill-new | 3.8.3 | 富文本编辑器（文章正文） |
| sass | 1.106.1 | 样式，页面级样式使用 CSS Modules |
| react-scripts | 5.0.1 | Create React App 构建工具 |

## 快速开始

环境要求：Node.js >= 14（推荐 16 或 18）+ npm。

```bash
# 安装依赖
npm install

# 启动开发服务器，默认 http://localhost:3000
npm start

# 生产构建，产物输出到 build 目录
npm run build

# 运行测试
npm test
```

### 登录测试账号

登录页已预填，直接点击登录即可。

| 手机号 | 验证码 |
| --- | --- |
| 13911111111 | 246810 |

## 目录结构

```
src/
├── api/                    # 接口请求封装
│   ├── article.js          #   文章：列表 / 详情 / 新增 / 修改 / 删除
│   ├── channel.js          #   文章频道
│   ├── constants.js        #   常量（文章状态枚举 ArticleStatus）
│   └── user.js             #   登录、用户信息
├── assets/                 # 图片等静态资源
├── components/
│   ├── AuthRoute/          #   路由鉴权守卫组件
│   └── Channel/            #   频道下拉选择组件
├── pages/
│   ├── Layout/             #   后台布局（Header + Sider + Outlet）
│   ├── Login/              #   登录页
│   ├── Home/               #   数据概览
│   ├── ArticleList/        #   内容管理（文章列表）
│   └── ArticlePublish/     #   发布 / 编辑文章
├── utils/
│   ├── request.js          #   axios 实例、baseURL 与拦截器
│   ├── router.js           #   非组件环境下的路由跳转
│   └── storage.js          #   token 的 localStorage 存取
├── App.js                  # 路由表
├── index.js                # 入口
└── index.css               # 全局样式
```

`jsconfig.json` 配置了 `baseUrl: "src"`，因此可以直接从 `src` 下开始写绝对导入，如 `import request from 'utils/request'`。

## 路由说明

路由模式为 **HashRouter**，URL 形如 `https://mark-1994.github.io/geek-pc-hz21/#/home`。

| 路径 | 页面 | 是否需要登录 |
| --- | --- | --- |
| `/` | 重定向到 `/home` | - |
| `/login` | 登录页 | 否 |
| `/home` | 后台布局 + 数据概览 | 是 |
| `/home/list` | 后台布局 + 内容管理 | 是 |
| `/home/publish` | 后台布局 + 发布文章（新增） | 是 |
| `/home/publish/:id` | 后台布局 + 发布文章（编辑） | 是 |
| `*` | 404 | - |

页面组件通过 `React.lazy` + `Suspense` 懒加载，首屏只加载登录所需代码；新增与编辑页用不同的 `key` 区分，避免复用同一组件实例导致表单数据残留。

### 非组件中跳转路由

`useNavigate` 只能在组件内使用。axios 拦截器等非组件环境请用 `utils/router.js`（`App.js` 中已通过 `RegisterNavigate` 注册）：

```js
import { navigateTo } from 'utils/router'

navigateTo('/login', { replace: true })
```

## 部署

项目已配置 `homepage` 字段指向 GitHub Pages：

```json
"homepage": "https://mark-1994.github.io/geek-pc-hz21"
```

```bash
npm run build
```

将 `build` 目录内容发布到 `gh-pages` 分支即可。因为使用 HashRouter，GitHub Pages 这类静态托管**不需要**额外的 history 回退配置，刷新子页面也不会 404。

## 注意事项

- 接口基础地址配置在 `src/utils/request.js` 的 `baseURL`，当前为 `https://geek.itheima.net/v1_0`（https）。图片上传复用该地址：`${baseURL}/upload`。
- 接口请求统一不带 `/api` 前缀，若自行配置本地代理，需要同步修改 `src/api/*.js` 里的 url 前缀，避免路径重复。
- 由于页面托管在 https 下，浏览器会拦截 http 混合内容，本地开发若改回 `http://` 基地址可能出现请求被 block 的情况。
- axios 响应拦截器**必须** `return Promise.reject(error)`，否则错误会被吞掉，外层 `try/catch` 捕获不到。
- `@ant-design/icons` 目前依赖 antd 的传递依赖被解析；若执行 `npm install @ant-design/icons` 显式安装可避免依赖升级后报 `Module not found`。
