//express_demo.js 文件

import userRouter from "./controller/user";
import emailRouter from "./controller/email";
import db from './mongodb';

const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = new express();




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


// 允许跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else next();
});

/**
 * ==============路由初始化============
 */
app.use('/user', userRouter)
app.use('/email', emailRouter)

/**
 * ==============启动数据库==============
 */
let connect = db.connect()

connect.on('success', async mongoose => {
    console.log("数据库连接成功")





    startUp()
})


/**
 * ==============启动服务器==============
 */
function startUp() {
    const server = app.listen(3011, () => {

        let host = server.address().address
        let port = server.address().port

        console.log(`funy-blog start up !  应用实例，访问地址为 http://${host}:${port}`)

    })
}


export default app