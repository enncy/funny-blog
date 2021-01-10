//express_demo.js 文件
const express = require('express');
const app = express();



const server = app.listen(3011, ()=> {

    let host = server.address().address
    let port = server.address().port

    console.log(` funy-blog start up !  应用实例，访问地址为 http://${host}:${port}`)

})