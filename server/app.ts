//express_demo.js 文件


import db from './mongodb';

const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');

const router = require('./router')
const app = new express();

app.all("*",function(req,res,next){

    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","http://localhost:8080");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //允许的header类型
    res.header('Access-Control-Allow-Credentials',true);
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
})


/**
 * ==========中间件的使用============
 */

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('session'));
app.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: true
}));





//==============路由初始化============
router(app)

/**
 * ==============启动数据库==============
 */
let connect = db.connect()

connect.on('success', async mongoose => {
    console.log("数据库连接成功")
    /**
     * ==============启动服务器==============
     */
    const server = app.listen(3011, () => {
        let host = server.address().address
        let port = server.address().port
        console.log(`funy-blog start up !  应用实例，访问地址为 http://${host}:${port}`)

    })
})

export default app