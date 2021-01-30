/**
 * 主要管理项目的 api 接口 , 通过封装好的 axios 请求 request 来发送
 * @author  klskeleton
 * @date  2021/1/7 : 23:54
 */


const request  = require('@/utils/request.js')

const otherURL  = '/api/other'

module.exports = {
    apiTest(){
        return request({
            methods:'get',
            url:'https://www.baidu.com/',
        })
    },
    //网易云热评
    getCloudMusicHotComments(){
        return request({
            methods:'post',
            url:otherURL+'/cloud/music/comments',
        })
    }
}







