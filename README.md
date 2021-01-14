# funy-blog
趣博客——开源的博客网站

在线演示地址：http://funy.klweb.top

## quickly start

```javascript

//下载项目
git clone git@github.com:klskeleton/funy-blog.git
//安装依赖
npm install
//启动项目
npm run dev
//启动服务器
npm run server
//打包项目
npm run build


```

## 技术栈

前端：  vue + ant design vue

后端:  nodejs + express + mongodb

## 项目结构

- dist          项目打包路径
- public        vue cli4 标准资源目录
- server        后端业务代码
    - config     后端配置文件
    - controller     接口
    - mongodb        数据库模块
    - router         路由模块
    - service        业务模块
    - session        session模块
    - utils          工具模块
    app.ts          服务器启动入口
    
- src           前端代码
    - api           接口模块
    - config        配置模块
    - router        路由模块
    - store         vuex 模块
    - utils         工具模块
    - views         视图模块
        - blog          博客文章展示页
        - components    公共模块
        - home          个人首页
        - index         网站首页
        - login         登录
        - register      注册
        - user          用户页
        App.vue         前端页面主入口
    
- email.config.js       邮箱发送配置文件 (私有)
