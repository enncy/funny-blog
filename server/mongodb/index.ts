import * as mongoose from "mongoose";
const config = require('../config')
mongoose.set('useCreateIndex', true)

const url = `mongodb://${config.db.domain}:${config.db.port}/${config.db.database}`

console.log("数据库连接中:"+url)
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log('连接数据库成功');
}).catch(async (err) => {
    console.error(err)
    console.error('连接数据库失败: ' + err);
    await  mongoose.disconnect();
})

let db = mongoose.connection
db.on('close', async  function () {
    console.log('数据库断开');
});

module.exports = db