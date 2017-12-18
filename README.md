# 编辑部项目

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
#### 目录结构：
```
|——src
    ├── assets  # 静态文件目录
    │
    ├── components
    │   ├── menu  # 菜单类组件目录
    │   ├── plugin  # 工具类组件目录
    │   ├── release  # 编辑类组件目录
    │   └── editor.vue  # 发布页面
        └── admin.vue  # 账号管理页面
        └── publish.vue # 我的发布页面 
    |—— router
        |——index.js  # 路由配置
    |—— store # 数据管理目录
    |—— App.vue
    |——  main.js # 入口文件
   
```

