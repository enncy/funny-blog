
const request  = require('@/utils/request.js')



module.exports = {

    /**
     * 账号登录
     * @param name  用户名
     * @param pwd   密码
     * @returns {request}  axios 请求
     */
    login(name,pwd){
        return request({
            method:"post",
            url:'/user/login',
            data:{
                name,
                pwd
            }
        })
    },

    /**
     * 账号注册
     * @param name      用户名
     * @param pwd       密码
     * @param email     邮箱
     * @param code      验证码
     * @returns {request}  axios 请求
     */
    register(name,pwd,email,code){
        return request({
            method:"post",
            url:'/user/register',
            data:{
                name,
                pwd,
                email,
                code
            }
        })
    },

    //退出账号
    quit(){
        return request({
            method:"get",
            url:'/user/quit',
        })
    }


}






