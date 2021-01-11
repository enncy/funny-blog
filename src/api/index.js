/**
 * 主要管理项目的 api 接口 , 通过封装好的 axios 请求 request 来发送
 * @author  klskeleton
 * @date  2021/1/7 : 23:54
 */


const request  = require('@/utils/request.js')

module.exports = {
    apiTest(){
        return request({
            methods:'get',
            url:'https://www.baidu.com/',
        })
    }
}







