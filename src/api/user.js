
const request = require('@/utils/request.js')


const userURL = '/api/user'

module.exports ={

    /**
     * 账号登录
     * @param name  用户名
     * @param pwd   密码
     * @returns {request}  axios 请求
     */
    login(name,pwd){
        return request({
            method:"post",
            url:userURL+'/login',
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
            url:userURL+'/register',
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
            url:userURL+'/quit',
        })
    },

    /**
     * 检测用户名是否可用
     * @param name
     */
    check(name){
        return request({
            method:"get",
            url:userURL+`/check/${name}`,
        })
    },

    //检测是否登录
    checkLogin(){
        return request({
            method:"get",
            url:userURL+`/login/check`,
        })
    },

    getUserByNmae(name){
        return request({
            method:"get",
            url:userURL+`/get/${name}`,
        })
    }


}






